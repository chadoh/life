let API_URL, STRIPE_PUBLISHABLE_KEY;

if(false) {
  API_URL = 'http://localhost:5000/'
  STRIPE_PUBLISHABLE_KEY = 'pk_4QXgq0EuigTEkoZF72kdekSBUF6gs'
} else {
  API_URL = 'https://entire-life.herokuapp.com/'
  STRIPE_PUBLISHABLE_KEY = 'pk_n6D1XV27lIqhZyg1sjLeE0HjyPo7X'
}

export default {
  API_URL, STRIPE_PUBLISHABLE_KEY
}
