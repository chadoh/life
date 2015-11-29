import React from 'react';
import placeholderImg from '../images/video-placeholder.jpg';
import Nav from './Nav';
import { FREE_EVENTS } from '../config';

export default class Home extends React.Component {
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
    return (
      <div>
        <div className="container-wide">
          <Nav/>
        </div>
        <div id="top" className="hero sunset-cliffs">
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
          <div className="trailing">
            <img src="/images/spoon-of-diamonds.png" className="logo" alt="logo: a spoonful of diamonds" />
          </div>
        </div>
        <div className="bg-dark" id="pricing">
          <div className="container">
            <h2 className="brand">Your life is not for sale</h2>
            <p>
              A life calendar is a fantastic way to remember and plan your
              life. It ends up holding all sorts of personal information.
              We <em>could</em> sell that personal information to advertisers,
              and deliver targeted ads to you.
            </p>
            <p>But we hate that.</p>
            <p>So we're hoping to find a better way.</p>
            <p>
              We'll let you get started with your life calendar for free. You
              can start visualizing and planning your life, and
              add {FREE_EVENTS} events on our dime.
            </p>
            <p>
              After that, we believe you'll find it valuable enough to pay a
              small amount for it.
            </p>
            <p>Your options:</p>
            <dl>
              <dt className="brand">Annual</dt>
              <dd>$10 per year. Three fancy coffee drinks cost more!</dd>

              <dt className="brand">Lifetime</dt>
              <dd>$50, one time. No need to worry about future payments.</dd>
            </dl>
          </div>
        </div>
        <div className="bg-light">
          <div className="container">
            <h2 className="brand">Credits</h2>
            <p>Entire.Life would not exist without these awesome people:</p>
            <ul id="draft_check_box_list_0">
              <li>Tim Urban at <a href="http://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a>, who came up with the whole idea in the first place</li>
              <li><a href="http://brittanyforks.com/life/">Brittany Forks</a>, who came up with the idea to use an emoji for each event, and who largely inspired the design of Entire.Life</li>
              <li><a href="http://busterbenson.com/">Buster Benson</a>, for being the first person I know of to digitize such a Life In Weeks calendar</li>
            </ul>
            <p>We all want to see you make the most of your diamonds.</p>
            <h1 className="brand"><a href="#top">Go for it →</a></h1>
          </div>
        </div>
      </div>
    )
  }
}
