import React from 'react'
import Event from './Event'
import UserStore from '../stores/UserStore'
import Immutable from 'immutable'

const eventsOrPlans = ({weekno}) => {
  const now = new Date()
  const start = UserStore.startOf(weekno)
  const end = UserStore.endOf(weekno)

  if(end < now) return 'recorded events';
  else if (start > now) return 'plans';
  else return 'events or plans';
}

const Events = ({events, slug, weekno, authed, onEdit}) => {
  return <ol className="events">
    {!events ? `No ${eventsOrPlans({weekno})}` : events.map(event => {
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

Events.propTypes = {
  events: (props, propName, componentName) => {
    if(props.events && !Immutable.List.isList(props.events))
      return new Error(`${componentName} expected prop 'events' to be an Immutable.List!`)
  },
  slug: React.PropTypes.string.isRequired,
  weekno: React.PropTypes.number.isRequired,
  authed: React.PropTypes.bool.isRequired,
  onEdit: React.PropTypes.func,
}

export default Events
