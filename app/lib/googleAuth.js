import LoginActions from '../actions/LoginActions'

let script = document.createElement('script');
script.setAttribute("type","text/javascript")
script.setAttribute("src", "https://apis.google.com/js/platform.js")
document.body.appendChild(script)

const waitForLoaded = setInterval(() => {
  if(window.gapi) {
    clearInterval(waitForLoaded)
    initClient()
  }
}, 30)

const initClient = () => {
  gapi.load('auth2', () => {
    gapi.auth2.init({
      client_id: '195265380701-61hrjl5crf1fvlmpp0l7br2lp27m55rg.apps.googleusercontent.com',
      scope: 'profile email',
      failure: onFailure,
    });
  });
}

const onFailure = (err) => {
  console.error('initClient failed', err)
}

export default {};
