import React from 'react';
import { Link } from 'react-router';
import LoginActions from '../actions/LoginActions';

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = { playing: false }

    this.videoElement = this.videoElement.bind(this)
    this.playVideo = this.playVideo.bind(this)

    window.onSignIn = this.onSignIn;
  }

  render() {
    return (
      <div>
        <div className="hero sunset-cliffs">
          <div className="vertical-centering">
            <div className="hook-wrap">
              <div className="hook">
                <div className="video-container">
                  <div className='embed-container'>{this.videoElement()}</div>
                </div>
                <div className="hook-description">
                  <h1 className="brand">Take control of your life</h1>
                  <p><small>for only $10 a year</small></p>
                  <Link to="signup" className="button">Claim your FREE life calendar now &rarr;</Link>
                  <div className="g-signin2" data-onsuccess="onSignIn"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onSignIn(googleUser) {
    LoginActions.onSignIn(googleUser)
  }

  videoElement() {
    if (this.state.playing)
      return <iframe src='https://player.vimeo.com/video/132391869?autoplay=1' frameBorder='0' webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>;
    else
      return <a href="#play-video" onClick={this.playVideo}><img src="/images/video-placeholder.jpg" alt="play video"/></a>;
  }

  playVideo(e) {
    e.preventDefault();
    this.setState({playing: true})
  }
}
