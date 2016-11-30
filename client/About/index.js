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
      <div>
      <header>
        <div className="container-fluid">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
            <a className="navbar-brand" href="index.html"><div>Meetup Tonight</div></a>
              <ul className="nav navbar-nav nav-left">
                <li><a href="about.html">ABOUT</a></li>
                <li><a href="about.html">BLOG</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">SIGN IN / SIGN UP</a></li>
              </ul>
            </div>
          </nav>
        </div>
     </header>

     <section id="about">
       <div className="container-fluid">
         <div className="col-md-7">
           <div className="map-section">
             <h1>ABOUT</h1>
             <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8669471581866!2d-73.98606968518341!3d40.742953143659406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a79dd9d771%3A0xbf3a4b0fba33d68!2s401+Park+Ave+S%2C+New+York%2C+NY+10016%2C+USA!5e0!3m2!1sen!2sbd!4v1480393285145"
                  width="100%"
                  height="370"
                  frameborder="0"
                  style={{
                    border: 0
                  }}
                  allowfullscreen
                />
             </div>
           </div>
         </div>
           <div className="col-md-5">
             <div className="about-info">
                <p>
                  The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
                  The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
                </p>
                <div className="team">
                  <h1>THE TEAM</h1>
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
            </div>
          </div>
        </section>
      </div>
    );
  }
}
