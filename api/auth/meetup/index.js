/*
  STILL IN TEST STAGES
*/

// passport
import passport from 'passport';
import {Strategy as MeetupStrategy} from 'passport-meetup-oauth2';

// utilities
import _ from 'lodash';
import setJwt from '../utils/setJwt';
import request from 'superagent';

// models
import mongoose from 'mongoose';
const User = mongoose.model('User');

const meetupCredentials = {
  clientID: process.env.MEETUP_CLIENT_ID,
  clientSecret: process.env.MEETUP_CLIENT_SECRET,
  callbackURL: process.env.MEETUP_CLIENT_CALLBACK,
  autoGenerateUsername: true
};

const verifyCallback = function(accessToken, refreshToken, profile, done) {
  console.log(`acess token -- ${accessToken}, \n refresh token -- ${refreshToken}`)
  request.get(`https://api.meetup.com/2/member/self/?access_token=${accessToken}`, (err, res) => {
    if(err) console.error(err)
    console.log(res.body.id)

    return User.findOne({
      meetup:{
        _id: res.body.id
      }
    })
    .then(user => console.log('found user', user) ||
      user && user.meetup._id ? Promise.resolve(user) : // no need to fill in info w/profile if user already has Google log-in
      _.merge(user || new User(), { // use Google profile to fill out user info if it does not already exist
        email: user && user.email || profile.emails[0].value,
        firstName: user && user.firstName || profile.name.givenName,
        lastName: user && user.lastName || profile.name.familyName,
        userPhoto: user && user.userPhoto || profile._json.image.url || profile._json.picture,
        meetup: {
          _id: profile.id,
          photo: profile._json.image && profile._json.image.url || profile._json.picture, // this object path seems to vary
          link: profile._json.url || profile._json.link // this object path seems to vary
        }
      }).save()
    )
    .then(user =>
      done(null, user))
    .catch(err =>
      console.error('Error creating user from Meetup authentication', err) || done(err, null));

  })
}

passport.use(new MeetupStrategy(meetupCredentials, verifyCallback));

// const passportAuth = passport.authenticate('meetup');

//, {
  // scope: [
  //   'https://www.googlea[com/auth/userinfo.profile',
  //   'https://www.meetup.com/auth/userinfo.email'
  // ]
//}

const passportAuthCb = passport.authenticate('meetup', {
  failureRedirect: '/',
  session: false
});

const passportAuthCbCb = (req, res) => {
  setJwt(req, res);

  res.redirect('/');
}

export default api => {
  api.get('/meetup', passport.authenticate('meetup', {
    failureRedirect: '/',
    session: false
  }), function(req, res){
    // The request will be redirected to Meetup for authentication, so this
    // function will not be called.
  });
  api.get('/meetup/callback', passport.authenticate('meetup', {
    failureRedirect: '/',
    session: false
  }), passportAuthCbCb);
};
