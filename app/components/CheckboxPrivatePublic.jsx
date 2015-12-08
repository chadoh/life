import React from 'react'

const Checkbox = ({isPrivate, whenClicked}) => {
  return (
    <p>
      <span className="checkbox-private-public">
        <input className="checkbox-private-public" id="is_private"
          type="checkbox" checked={isPrivate} onChange={whenClicked}/>
        <label htmlFor="is_private"/>
      </span>
      &nbsp;Make my birthdate (and entire calendar)
      &nbsp;{isPrivate ? "private" : "public"}<br/>
      <small>
        A private life calendar is an awesome way to remember and plan
        your life. A public life calendar can be that, plus a great way
        to show other people who you are and foster more empathy in the
        world. Maybe. It's up to you.
      </small>
    </p>
  )
}

Checkbox.propTypes = {
  isPrivate: React.PropTypes.bool.isRequired,
  whenClicked: React.PropTypes.func,
}

Checkbox.defaultProps = {
  whenClicked: () => {},
}

export default Checkbox
