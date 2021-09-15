# Notes

## Full Stack MERN Project

- Original tutorial videos
### Create React application

```Shell
cd client
npx create-react-app ./

npm install react-redux axios moment react-file-base64 redux redux-thunk @material-ui/core
```

- axios for making API request
- moment working with time and date
- react-file-base64 convert images
- redux-thunk for asynchrnous actions

### Create express backend using Node.js and MongoDB

```Shell
// initialize empty package.json
cd server
npm init -y 
// packages
// body-parser enables us to send post request,
// cors enable cross origin request
npm install body-parser cors express mongoose nodemon
```

### Server-side Details

Add followings in the package.json to use
newest feature import in the index.js

```JSON
"type": "module"
"script": {"start" : "nodemon index.js}
```

It did not work quite well, so decided to use old `const xx = require('xx');`

**Separation of Routes and Controllers**
This prevents from routes being bloated up by the codes and
it helps to contain all the logics in the controllers.

**MongoDB**
    - make sure to hide all the info before deploying

### Redux

- Scalability
- you can use middlewares
- the state management gets decouple from React
- we can access the state from anywhere
- pay attention to the folder structure
- folder `actions` : what happened
- folder `reducers` : how to change the state
- index.js is where initialize redux
- You can fetch the data from redux using `useSelector`

```javascript
import {useSelector} from 'react-redux';
const posts = useSelector((state) => state.posts);

```

- **REDUX Flow**: component -> action -> reducers ->
  - starts from the form in component
  - action gets dispatched in `App.js`
  - getPosts action from folder `actions`
  - immediately goes to posts in folder `reducers`
  - handle the logic of FETCH_ALL called in `action`

### How to carry the post id

There are two ways: 1) using plain react and 2) using redux

1. Plain React

keep track of the current id of the post for edit, to do that, we have to go back up to Posts and to App because we have to share that state of current id with Form and Posts App is the only component where Form and Posts exist together

- update App to pass down post id
- update Posts to pass down post id
- update Post and Form to take in post id as parameter
- update function `handleSubmit` in `Form.js` to include dispatch updatePost
- update updatePost function in both `actions` and `api`
- go to `reducers`

### Adding Functionality

- Server-side
  - go to routes, and add path
  - go to controller, and add function
- Front-end
  - go to api, and implement api call
  - go to actions, and create action
  - go to reducers, implement function in posts
  - go to components > Posts > Post, and implement dispatch in redux
    - import `useDispatch` from redux
    - import `deletePost` action from actions
    - connect them to the onClick

- if you can repeat this process, the app is going to get very scalable


### Action constants

Compilation of constants used in action like `FETCH_ALL` or `UPDATE`,
the string variables that goes easily unrecognized even if they are mis-spelled..
This way, code is much less error-prone and scalable


### Deployment

- Backend server is deployed on heroku

  - https://family-book-app.herokuapp.com/posts
  - make sure you include .env when deploying on heroku (this is not for Github)
  - create Procfile that includes the start command

- Frontend UI is deployed on Netlify
  - https://family-book-app.netlify.app/
  - `npm run build`
  - drop the `build` folder to netlify


## MERN Auth
### JWT 

Install libraries for client

```Shell
npm install jwt-decode react-google-login
```

Install libraries for server

```Shell
npm install bcryptjs jsonwebtoken
```

### React Tips

- if you simply type `rafce` then it creates react arrow function component exports. Download extention ES7 React/Redux/GraphQL/React-Native snippets
- if you creating same thing again over and over like creating textfield, better to have separate `Input.js` so that you don't clutter `Auth.js`
- for password, there are two states that does not show password and show password
  - `useState` to keep track of that show password state
  - `setShowPassword` toggles to reflect turn ON/OFF
  - state and method to setState is very `react`

### Google Sign In

- https://console.cloud.google.com/apis/dashboard
- OAuth consent screen
- Credentials
  - attach one created in OAuth


### Implementing JWT

- Look where the action happens (e.g. `Navbar.js`)
  - Define initialState
  - Implement `handleChange` which changes upon any change in InputField
  - Implement `handleSubmit` that dispatch either signin or signup actions with two parameters (formData and history)
- Go to `actions/auth.js`
  - implement `signup`
  - implement `signin` (found out that we haven't implemented endpoints in backend for CREATE action)
- Go to BACKEND (server)
- update `index.js`
- go to `routes/users.js` and create routes for `signin` and `signup`
- go to `controller/user.js` to create logis for each function
- go to `models/user.js` to create schema for user

- If the token expires, show it in the Navbar that it expired

### Middleware

- When you want something to happen before the logic, use middleware
  - e.g. when you want to like post:
    - click the like button
    - auth middleware (next)
    - go to like controller

- middleware is located in routes
  - we need auth middleware before creating posts or update posts
- Go to controller for logics (e.g. like only once per user)
  - `controllers` > `post.js` > `likePost`
- Once this is done, go back to front end
- Go to api folder to create endpoints

### Debugging on web

- make use of `Console`
- Check `Application` for what are saved under `localStorage` and if the certain data remains there or disappears after some time
- Check `Network` for contents of `request` and `response`  
- You can debug frontend code in Console, and backend code in the shell
