# GitHub Reporter

## Export GitHub issues to a configurable CSV

Log in with your GitHub account and click on a repo to export its issues to CSV.


## Run Locally/Contribute

 - Clone this respository
 - Make sure you're running at least Node 6.x and NPM 3.x
 - Easily run multiple node versions using [nvm](https://github.com/creationix/nvm/blob/master/README.markdown)
 - run `npm isntall`, or if you have [yarn](https://code.facebook.com/posts/1840075619545360) installed locally, run `yarn`

### Environment Variables

#### Required
 - `GH_CLIENT_ID`: GitHub Application Client ID. Obtained in GitHub settings -> Developer Settings -> OAuth applications
 - `GH_CLIENT_SECRET`: GitHub Application Client Secret. Obtained in GitHub settings -> Developer Settings -> OAuth applications
 - `GH_REDIRECT_URI`: GitHub Application Redirect URI. This is set in the application settings.
   - This should be in the format `{API_ROOT}/api/gh_callback`
   - E.g. `http://localhost:5005/api/gh_callback` or  
     `http://your-cool-dev-domain/api/gh_callback`
   - This URL must match the URL in the GitHub OAuth appilcation settings exactly. [More on that here.](https://developer.github.com/v3/oauth/#redirect-urls)

#### Optional
 - `CLIENT_ROOT`: Should only be needed in development. Defaults to `''` (empty string)
   - Set to `http://localhost:3000` for development.
   - This could really just be set based on the NODE_ENV and eliminated.
 - `REACT_APP_API_URL`: Root URL of the API. Defaults to `''` (empty string)
   - Set to http://localhost:5005 for development.
 - `APP_NAME`: Used to set the `User-Agent` on GitHub API calls. Defaults to `'Github-Reporter'`.
 - `DB_URI`: Connection string for a MongoDB database.
   - Defaults to `'localhost/ghrDB'`.
   - `mongod` or the equivalent needs to be running to use a local database
   - Database connection is configured with [mongoose](http://mongoosejs.com/)
 - `NODE_ENV`: set to `production` to run production server on port 80


### API

 - Run `npm run server` to start the API server 
 - Server will listen on port 5005
 - The production build of the front-end will be running at `localhost:5005`


### User Interface

 - To run the front-end development server:
   - Run `npm start`
   - A new browser window will open to `localhost:3000`
 - API calls will proxy to `localhost:5005`
  - This enables you to run your development frontend and development server concurrently on different ports
  - In production, API requests will be local (`'/'`)
 - Bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)
