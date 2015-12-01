import React from 'react'
import Event from './Event'

export default ({events, slug, weekno, authed, onEdit}) => {
  return <ul className="events">
    {!events ? "No recorded events" : events.map(event => {
      return <Event
        key={event.get('date') + event.get('id')}
        slug={slug}
        weekno={weekno}
        event={event}
        authed={authed}
        onEdit={onEdit ? onEdit.bind(this, event) : null}
      />
    })}
  </ul>
}
