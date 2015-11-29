import React from 'react'
import placeholderImg from '../images/video-placeholder.jpg';

export default class IntroVideo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false,
    }

    this.videoElement = this.videoElement.bind(this)
    this.playVideo = this.playVideo.bind(this)
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

  render() {
    return(
      <div className="video-container">
        <div className='embed-container'>{this.videoElement()}</div>
      </div>
    )
  }
}
