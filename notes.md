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

- **Flow**: component -> action -> reducers ->
  - action gets dispatched in `App.js`
  - getPosts action from folder `actions`
  - immediately goes to posts in folder `reducers`
  - handle the logic of FETCH_ALL

  - in `action`

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
