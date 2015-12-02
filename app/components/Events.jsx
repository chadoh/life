import React from 'react'
import Event from './Event'
import UserStore from '../stores/UserStore'

const eventsOrGoals = ({weekno}) => {
  const now = new Date()
  const start = UserStore.startOf(weekno)
  const end = UserStore.endOf(weekno)

  if(end < now) return 'recorded events';
  else if (start > now) return 'goals';
  else return 'events or goals';
}

export default ({events, slug, weekno, authed, onEdit}) => {
  return <ol className="events">
    {!events ? `No ${eventsOrGoals({weekno})}` : events.map(event => {
      return <Event
        key={event.get('date') + event.get('id')}
        slug={slug}
        weekno={weekno}
        event={event}
        authed={authed}
        onEdit={onEdit ? onEdit.bind(this, event) : null}
      />
    })}
  </ol>
}
