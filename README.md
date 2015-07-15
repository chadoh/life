# Life

A service to quickly make an inspiring chart of your entire life, similar to [Brittany Fork's](http://brittanyforks.com/life/).

Built with [react-flux-jwt-authentication-sample](https://github.com/auth0/react-flux-jwt-authentication-sample) as a starting point.

## Development

Run `npm install` on this project and run `npm run watch` to start the app. Then just navigate to [http://localhost:3000](http://localhost:3000)

Optionally, you can run [life_api](https://github.com/chadoh/life_api) locally on port 5000, and change `src/config.js` to use it instead of the production env.

## Deployment

Right now, the files are manually uploaded to an S3 bucket. The plan is to make it render "isomorphically", which means it will need to be deployed on Heroku or some such.
