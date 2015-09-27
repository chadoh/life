import React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="hero sunset-cliffs">
          <div className="vertical-centering">
            <div>
              <h1 className="brand">
                <small>Your</small><br />
                Precious Spoonful<br />
                <small>of</small> Diamonds
              </h1>
            </div>
          </div>
          <div className="trailing">
            <img src="/images/spoon-of-diamonds.png" className="logo" alt="logo: a spoonful of diamonds" />
          </div>
        </div>
        <div className="bg-dark">
          <div className="container">
            <h2 id="life-is-short!" className="brand">Life is short!</h2>
            <p>But it always feels so long. </p>
            <p>Let's look at it. The blog <a href="http://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a> does this in a great visual way.</p>
            <p>It starts by looking at a long human life in years:</p>
            <p className="life-calendar-image centered shrink">
              <img src="/images/life-in-years.png" alt="a 10x10 grid, the top left s when you're born, each row is a decade, the bottom right is when you turn 100"/>
            </p>
            <p>Yeah, that looks pretty short!</p>
            <p>But it also doesn't feel very tangible. </p>
            <p>I think that's because a year itself doesn't feel very tangible. We're all surprised when the next New Year's Eve rolls around, but we also suck at keeping our New Year's Resolutions. Years are short enough to surprise us but too long to motivate us.</p>
          </div>
        </div>
        <div className="bg-light">
          <div className="container">
            <h2 id="something-more-tangible" className="brand">Something more tangible</h2>
            <p>How about months?</p>
            <p className="life-calendar-image">
              <img src="https://draftin.com:443/images/32522?token=EwJlv84mCLtd99b7VexV6fl8pBgTFAc3KaJq_bj6YneoOd87Y4YzvdzCChWzT1Vt0EA_xPY2fbaxyVVAkIyhVZA" alt="a 36x33 grid, each row of 36 representing three years"/>
            </p>
            <p>It's wild to think that I probably won't have that many months in my life. Months definitely feel like more of a human timescale than years.</p>
          </div>
        </div>
        <div className="bg-dark">
          <div className="container">
            <h2 id="but-months-are-still-too-long" className="brand">But months are still too long</h2>
            <p>You've probably heard that habits are formed or broken within a month. If you're anything like me, though, you can never stick with things for an entire month. </p>
            <p>Which makes me think that months aren't quite a human rhythm, either. </p>
            <p>Like years, we're surprised every time a new month arrives. "September already??"</p>
            <p>But also like years, they're too long to really motivate us.</p>
          </div>
        </div>
        <div className="bg-light" style={{position: 'relative'}}>
          <div className="container">
            <h2 id="how-about-weeks?" className="brand">How about weeks?</h2>
            <p><a href="http://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a> breaks it down one step further. Here's a whole 100-year life in weeks:</p>
            <p>
              <img src="https://draftin.com:443/images/32526?token=t0EYPy0xRmvK8KBSkW6WeF7tMjjqe_UXnAXTFGpKWM-jHjIx0kznMZLqvnPCOy8Wab8-3pBEZh4N0d-Zwn1cZcs" alt="a 52x100 grid, each row representing one year"/>
            </p>
            <p>That is a lot of dots.</p>
            <p>But also not as many as I'd like! I'd prefer to pretend that my weeks will never end. That they're an unlimited resource.</p>
            <p>But they're not! </p>
            <p>They're finite. Totally countable. If you scroll through this page quickly, you might miss the whole thing.</p>
            <p><a href="http://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a> points out that if you had a diamond for each of those dots—a diamond for every week of your life—they would just about fill one tablespoon. That's it! One precious spoonful of diamonds.</p>
          </div>
          <div className="trailing">
            <img src="/images/spoon-of-diamonds.png" className="logo" alt="logo: a spoonful of diamonds" />
          </div>
        </div>
        <div className="bg-dark">
          <div className="container">
            <h2 id="remember-that-you'll-die" className="brand">Remember that you'll die</h2>
            <p>We don't like to think about it, but ignoring reality doesn't change anything.</p>
            <p>And if you treat your limited, precious weeks like they're inexhaustible, it's easy for each week to start to blur into the next.</p>
            <p>What are good ways to use your diamonds? I love how <a href="http://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a> says it. Good ways to use your diamonds are:</p>
            <blockquote>
              <p>
                1) Enjoying the diamond<br/>
                2) Building something to make your future diamonds or the diamonds of others more enjoyable</p>
              <p>In other words, you have this small spoonful of diamonds and you really want to create a life in which they’re making you happy. And if a diamond is not making you happy, it should only be because you’re using it to make other diamonds go down better—either your own in the future or those of others. In the ideal situation, you’re well balanced between #1 and #2 and you’re often able to accomplish both simultaneously (like those times when you love your job).</p>
              <p>Of course, if a diamond is enjoyable but by enjoying it you’re screwing your future diamonds (an <a href="http://waitbutwhy.com/2013/10/why-procrastinators-procrastinate.html">Instant Gratification Monkey</a> specialty), that’s not so good. Likewise, if you’re using diamond after diamond to build something for your future, but it’s not making you happy and seems like a long-term thing with no end in sight, that’s not great either.</p>
              <p>But the worst possible way to use a diamond is by accomplishing neither #1 nor #2 above. Sometimes “neither” happens when you’re in either the wrong career or the wrong relationship, and it’s often a symptom of either a shortage of courage, self-discipline, or creativity. Sometimes “neither” happens because of a debilitating problem.</p>
              <p>We’ve all had Neither Weeks and they don’t feel good. And when a long string of Neither Weeks happens, you become depressed, frustrated, hopeless, and a bunch of other upsetting adjectives. It’s inevitable to have Neither Weeks, and sometimes they’re important—it’s often a really bad Neither Week that leads you to a life-changing epiphany—but trying to minimize your Neither Weeks is a worthy goal.</p>
              <p>It can all be summed up like this:</p>
              <p><img src="https://draftin.com:443/images/32534?token=iZX4FBR_Ipx4nQ5u3uD9-ZA6pYNsZXgc-Ic5OdkZfC3avA2BZGihXC2QmLzOncUWyn2h7Fcj52oNQqToP8Dvojk" alt="The Contents of your week: a Venn diagram. Two main bubbles, &quot;enjoyment&quot; and &quot;improving your future or the lives of others&quot;—the ideal is the space where they overlap. Enjoyment at the expense of enjoyment in the future is not great. Also, improving your future or the lives of others when you don't enjoy your week, and when that seems to be the norm, also isn't great. But a third circle that falls entirely out of the other two: Failure. Neither enjoyment nor building something important for your future or others."/> </p>
            </blockquote>
          </div>
        </div>
        <div className="bg-light">
          <div className="container">
            <h2 id="new-week's-resolutions" className="brand">New Week's Resolutions</h2>
            <p>Unlike a year or month, a week is a very human rhythm. It's a tempo we can really feel. I never get surprised by the arrival of a new week! And when I set goals for a week, I actually feel motivated to act on them.</p><p>So <a href="https://entire.life/chadoh">I made myself a ✨<strong>life calendar</strong>✨</a>. And I made one for you, too! You can <a href="https://entire.life/signup">get started with it right now</a>.</p><p>Regularly reflecting on how my diamonds are turning out helps ground me. It helps orient my life and encourages me to live with intention, rather than just letting the weeks slip by and ending up in the "NeitherLand" that <a href="http://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a> warns against.</p><p>If you want to make the most of your diamonds, you need to acknowledge that you're running out of them. Look at your calendar, take a deep breath, and reflect. Where have you been? What plot arcs have landed you in your current situation?</p><p>And then set a goal. What do you want to accomplish in the next week? It's a gift, a chance to start over. A brand new shiny diamond.</p>
            <h1 className="brand"><a href="https://entire.life/signup">Make the most of it →</a></h1>
          </div>
        </div>
        <div className="bg-dark">
          <div className="container">
            <h2 id="with-great-thanks-to" className="brand">With great thanks to</h2>
            <p>Entire.Life owes much to the following:</p>
            <ul id="draft_check_box_list_0">
              <li>Tim Urban at <a href="http://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a>, who came up with the whole idea in the first place</li>
              <li><a href="http://brittanyforks.com/life/">Brittany Forks</a>, who came up with the idea to use an emoji for each event, and who largely inspired the design of Entire.Life</li>
              <li><a href="http://busterbenson.com/">Buster Benson</a>, for being the first person I know of to digitize such a Life In Weeks calendar</li>
            </ul>
            <p>We all want to see you make the most of your diamonds.</p>
            <h1 className="brand"><a href="https://entire.life/signup">Go for it →</a></h1>
          </div>
        </div>
      </div>
    )
  }
}
