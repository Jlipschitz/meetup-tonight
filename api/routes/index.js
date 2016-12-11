import axios from 'axios';
import cheerio from 'cheerio';
import mongoose from 'mongoose';
import { get } from 'lodash';
const GroupImage = mongoose.model('GroupImage');

// fall back to meetup logo url
const fallbackImageUrl = 'http://img2.meetupstatic.com/img/286374644891845767035/logo/meetup-logo-script-1200x630.png';


export default router => {
  let imageUrlMap = {};
  GroupImage.find().then(groupImageArr => groupImageArr.forEach(groupImage => {
    imageUrlMap[groupImage._id] = groupImage.imageUrl;
  }))


  // Get initial app data
  router.get('/events/search/', (req, res, next) =>
    axios.get('https://api.meetup.com/find/events', {
      params: {
        key: '4fb2575d64774911197925566e13f',
        lat: 40.677,
        lon: -73.982
      }
    })
    .then(responseIhope =>
      Promise.all(responseIhope.data.map(event => {
        const groupId = get(event, 'group.id');
        if (!groupId) return event;
        if (imageUrlMap[groupId] !== undefined) {
          event.image = imageUrlMap[groupId];
          return event;
        }

        const groupUrlName = get(event, 'group.urlname');
        const urlToHit = groupUrlName ? `http://www.meetup.com/${event.group.urlname}/` : event.link;
        return new Promise(resolve => {
          axios.get(urlToHit)
            .then(pageRes => {
              if (typeof pageRes.data === 'string') {
                const $ = cheerio.load(pageRes.data);
                const imageUrl = $('[property="og:image"]').attr('content') || $('.doc-box img.photo').attr('src');
                new GroupImage({ _id: groupId, imageUrl }).save(); // save to DB for future inits, but don't wait for this to complete
                imageUrlMap[groupId] = imageUrl; // add to server's in-memory cache
                event.image = imageUrl; // add to event object for current client request
              } else {
                event.image = fallbackImageUrl;
              }
              resolve(event);
            })
            .catch(err => {
              event.image = fallbackImageUrl;
              resolve(event);
            })
        })
      }))
    )
    .then(dataWithImages => res.json(dataWithImages))
    .catch(errors => console.log(errors))
  );

  return router;
}
