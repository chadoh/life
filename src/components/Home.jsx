import React from 'react'
import { Link } from 'react-router'
import LoginStore from '../stores/LoginStore'

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = { playing: false }

    this.videoElement = this.videoElement.bind(this)
    this.playVideo = this.playVideo.bind(this)
    this.showLock = this.showLock.bind(this)
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
                  <button onClick={this.showLock}><h3>&rarr; Claim my FREE life calendar now &larr;</h3></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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

  showLock(e) {
    e.preventDefault()
    LoginStore.getState().lock.show()
  }
}
