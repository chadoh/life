import React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.playVideo = this.playVideo.bind(this)
  }
  render() {
    return (
      <div>
        <div className="hero sunset-cliffs">
          <div className="vertical-centering">
            <div>
              <div className="hook">
                <div className="video-container">
                  <div ref="video" className='embed-container'><a href="#play-video" onClick={this.playVideo}><img src="/images/video-placeholder.jpg" alt="play video"/></a></div>
                </div>
                <div className="hook-description">
                  <h1 className="brand">Take control of your life</h1>
                  <p><small>for only $10 a year</small></p>
                  <Link to="signup" className="button">Claim your FREE life calendar now &rarr;</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  playVideo(e) {
    e.preventDefault();
    const player = React.findDOMNode(this.refs.video)
    player.innerHTML = "<iframe src='https://player.vimeo.com/video/132391869?autoplay=1' frameborder='0' allowfullscreen></iframe>"
  }
}
