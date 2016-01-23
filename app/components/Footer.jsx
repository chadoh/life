import React from 'react'
import {Link} from 'react-router'

export default () => {
  return (
    <div className="bg-light">
      <div className="container row">
        <div className="col-sm-2">
          <h5 className="brand">About</h5>
          <small>
            <Link to="/team">Team</Link><br/>
            {/* <a href="#">Press</a><br/> */}
            <Link to="/contact">Contact</Link>
          </small>
        </div>
        <div className="col-sm-2">
          <h5 className="brand">Connect</h5>
          <small>
            <a href="https://www.instagram.com/yourentirelife/">Instagram</a><br/>
            <a href="https://twitter.com/yourentirelife">Twitter</a><br/>
            <a href="https://www.facebook.com/yourentirelife">Facebook</a><br/>
          </small>
        </div>
        <div className="col-sm-8">
          <h5 className="brand">Gratitude</h5>
          <small>
            Entire.Life thanks Tim Urban at&nbsp;
            <a href="http://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a>,&nbsp;
            for inventing the idea of the life calendar, and&nbsp;
            <a href="http://brittanyforks.com/life/">Brittany Forks</a>, who
            first put emojis on one.
          </small>
        </div>
      </div>
    </div>
  )
}
