# Booksapp Application

A website for Book details.
The objective of this website/project is to provide a social platform to everyone to know about books,novels and documentaries and their reviews.User can save his books in the library and can he post his views on a book in tweet page.User can like and comment on any tweet. 

---

# Project Authors

#### Check Us Out

👤 **Samardhh Reddy**

- Github: [@Samardhh-Padala-au8](https://github.com/Samardhh-Padala-au8)

👤 **Ankit Kumar Verma**

- Github: [@ankit-verma-au8](https://github.com/ankit-verma-au8)

---

## Requirements

For development, you will only need Node.js and a node global package installed in your environement.

---

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

```
    $ node -v
    v12.16.2

    $ npm -v
    6.14.4
```
---

## Project Installation
  **After installing node, this project will need many NPM Packages, so just run the following command to install all the dependencies.**
```
$ git clone Here(https://github.com/attainu/fullstack-project-ankit-verma-au8.git)
$ cd frontend
```   
**Run npm install at app root**
```
$ npm i
```
**Then install the React App Dependencies within the /client folder -**
```
$ npm i 
```
---

## Configuration for the App

Open `fullstack-project-ankit-verma-au8` then create and **.env** file in the root and edit it with your credentials. You will need:

- MONGODB_CLOUD_URI=`Your Database Address`
- JWT_KEY=`your secret key`
- PASSCODE=`KEY`
- NODE_ENV=`production`
- CLOUDINARY_NAME=`your creditinals`
- CLOUDINARY_API_KEY=`your creditinals`
- CLOUDINARY_API_SECRET = `your creditinals`
- PUSHER_API_ID = `your Id`
- PUSHER_API_KEY = `your key`
- PUSHER_SECRET = `your creditinals`
- PUSHER_CLUSTER = `your creditinals`
---

## Running The Project

```sh
    $ npm run dev
```

## Full Project Website Link Hosted On Heroku -

- #### Visit Here [Booksapp]()

## Project BackEnd Hosted On Heroku -

- #### Visit Here [BackEnd Hosted By Samardhh and ankit]()



## BackEnd NPM Packages Used -

- ##### `bcryptjs` - We are using bcrypt.js module to hash password of the user. It’s an npm module that you can find it out here at [bcryptjs](https://www.npmjs.com/package/bcryptjs).


- ##### `body-parser` - It’s a Node.js body parsing middleware for accessing data. You can find it out here - [body-parser](https://www.npmjs.com/package/body-parser).


- ##### `concurrently` - It is used to run multiple commands concurrently. Check it out here - [concurrently](https://www.npmjs.com/package/concurrently).


- ##### `cors` - It is used as a middleware in Node.JS. Check it out here - [cors](https://www.npmjs.com/package/cors). 


- ##### `dotenv` - It is used to load environment variables from a .env file into process.env. You can find it out here - [dotenv](https://www.npmjs.com/package/dotenv).


- ##### `express` - It's the web framework for Node.js that we used to structure our web application. You can find more details here [express](https://www.npmjs.com/package/express).

- ##### `express-session` - It's for the storage of the cookies. Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side. For more details check here - [express-session](https://www.npmjs.com/package/express-session).


- ##### `jsonwebtoken` - We used to create access tokens for our application. For more details check here - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken). 


- ##### `mongoose` - We used Mongoose because it provides a schema-based solution to model our application data with MongoDB. Which has many features to use example - validation of user's data. For more details check here - [mongoose](https://www.npmjs.com/package/mongoose).

---


## FrontEnd NPM Packages Used -

- ##### `React` -  For the full frontend we used react with CRA. Check it out here [React](https://www.npmjs.com/package/react).

- ##### `axios` - Promise based HTTP client for the browser. For more details check here - [axios](https://www.npmjs.com/package/axios).

- ##### `redux-thunk` - Middleware for redux. For more details - [redux-thunk](https://www.npmjs.com/package/redux-thunk).

---


## Project Screenshots

- ##### Home Page
 ![](/booksappimages/home.png) 

- ##### Register Page
 ![](/booksappimages/register.png) 

- ##### Login Page
 ![](/booksappimages/login.png) 

 - ##### Forgot Password
 ![](/booksappimages/forgot.png)

- ##### Posts page
 ![](/booksappimages/tweetpage.png) 

- ##### Profile Page
 ![](/booksappimages/profile.png) 

- ##### Edit Profile Page
 ![](/booksappimages/editprofile.png) 

- ##### View library Page
 ![](/booksappimages/library.png)

- ##### Add a book to library page
 ![](/booksappimages/bookssearch.png) 

- ##### Social Page (Where User Can see remaining users profile and library)
 ![](/booksappimages/social.png)

 - ##### Users Library
 ![](/booksappimages/sociallibrary.png)

 - ##### Users Profile
 ![](/booksappimages/socialprofile.png)

 - ##### Book detail Page
 ![](/booksappimages/booksdetail.png)


 

 ## 📝 License

Copyright © 2021 [Samardhh Reddy](https://github.com/Samardhh-Padala-au8) & [Ankit Kumar Verma](https://github.com/ankit-verma-au8).

---