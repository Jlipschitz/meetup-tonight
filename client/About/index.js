// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component } from 'react';

// styling
import './index.css';
import sam from './characterPhotos/sam.png';
import jamie from './characterPhotos/jamie.png';
import jokarr from './characterPhotos/jokarr.png';
import allison from './characterPhotos/allison.png';
import roger from './characterPhotos/roger.png';

export default class About extends Component {

  render() {
    return (
     <section id="about">
       <div className="about-info">
          <p>
            The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
            The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
          </p>
          <div className="team">
            <div className="team-mumbers">
              <ul>
                <li>
                  <a href="https://github.com/sbakkila" target="_blank">
                    <img src={sam} alt="Sam Bakkila"/>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/allpwrfulroot" target="_blank">
                    <img src={allison} alt="Allison Kunz"/>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Jlipschitz?tab=followers" target="_blank">
                    <img src={jamie} alt="Jamie Lipschitz"/>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/jokarr" target="_blank">
                    <img src={jokarr} alt="Jokarr Morris"/>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/sirrodgepodge" target="_blank">
                    <img src={roger} alt="Roger Beaman"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="about-f">
          <h6 className="about-h6">&copy; 2016 Meetup Tonight.</h6>
        </div>
      </section>
    );
  }
}
