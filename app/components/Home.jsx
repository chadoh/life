import React from 'react';
import placeholderImg from '../images/video-placeholder.jpg';
import Nav from './Nav';

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false,
    }

    this.videoElement = this.videoElement.bind(this)
    this.playVideo = this.playVideo.bind(this)
  }

  render() {
    return (
      <div>
        <div className="container-wide">
          <Nav/>
        </div>
        <div className="hero sunset-cliffs">
          <div className="vertical-centering">
            <div className="hook-wrap">
              <div className="hook">
                <div className="video-container">
                  <div className='embed-container'>{this.videoElement()}</div>
                </div>
                {React.cloneElement(this.props.children, {className: 'hook-description'})}
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
      return <a href="#play-video" onClick={this.playVideo}><img src={placeholderImg} alt="play video"/></a>;
  }

  playVideo(e) {
    e.preventDefault();
    this.setState({playing: true})
  }
}
