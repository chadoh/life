import history from './history'

const steps = [{
  title: 'Welcome to the world!',
  text: 'This baby emoji represents the week you were born. Once this tour is over, you can mouse over it to see the date.',
  selector: '.year-wrap:first-child a:first-of-type',
  position: 'bottom',
}, {
  title: 'Your first year',
  text: 'Each row represents one year of your life. For this whole first row, you were 0 years old. Cute little you, just squirming & watching & learning.',
  selector: '.year-wrap:first-child .year',
  position: 'bottom',
}, {
  title: '100 trips around the sun!',
  text: "You can make it to 100 years old, right? It'll be awesome!",
  selector: '.year-wrap:last-child a:first-of-type',
  position: 'top',
}, {
  title: "You're here now",
  text: "Welcome! This is a good place to be.",
  selector: 'a.now',
  position: 'bottom',
}, {
  title: "What happened last week?",
  text: "Anything cool? Anything that will make ripples across your entire future? Probably! Click on a week to add events (and emojis) to your life calendar.",
  selector: 'a.previous',
  position: 'bottom',
}, {
  title: "New Week's Resolutions",
  text: "Why wait until a New Year when you'll soon get a perfectly good New Week? Go ahead and make a plan to do something great next week. We'll check in with you once it's passed.",
  selector: 'a.next',
  position: 'bottom',
}]

const tourCallbacks = {
  // "a.now": (slug, user) => {
  //   setTimeout(() => {
  //     history.pushState(null, `/${slug}/week/${user.get('current_week')}`)
  //   }, 500)
  // },
  // "a.previous": (slug, user) => {
  //   setTimeout(() => {
  //     history.pushState(null, `/${slug}/week/${user.get('current_week') - 1}`)
  //   }, 500)
  // },
  "a.next": (user) => {
    setTimeout(() => {
      history.pushState(null, `/${user.get('slug')}/week/${user.get('current_week') + 1}`)
    }, 500)
  },
}

export default steps;
export { tourCallbacks };
