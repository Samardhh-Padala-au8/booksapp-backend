const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const helmet = require('helmet')
const hpp = require('hpp')
require('dotenv').config()
const userRouter = require('./routes/userRouter')
const libraryRouter = require('./routes/libraryRouter')
const postRouter = require('./routes/postRouter')
const likeRouter = require('./routes/likeRouter')
const commentRouter = require('./routes/commentRouter')
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }))


app.use(hpp())
app.use(helmet())

app.get('/', (req, res)=>{
    res.status(200).send("Health check")
})


app.use('/user', userRouter)
app.use('/library', libraryRouter)
app.use('/post',postRouter)
app.use('/like', likeRouter )
app.use('/comment', commentRouter)

app.use(function (req, res) {
    // our custom JSON 404 middleware. Since it's placed last
    // it will be the last middleware called, if all others
    // invoke next() and do not respond.
    res.status(404).json({ success: false, message: "This API endpoint does not exist!" });
  });

  app.use(function (err, req, res, next) {
    // middleware with an arity of 4 are considered
    // error handling middleware. When you next(err)
    // it will be passed through the defined middleware in order,
    // but ONLY those with an arity of 4 will catch this error.
    const mode = process.env.NODE_ENV;
    if (mode === "development") {
      console.log(err);
      res.status(err.status || 500).send(err.stack);
    }
    if (mode === "production") {
      res.status(err.status || 500).json({ success: false, message: "Internal Server Error! Try later." });
    }
  });



  module.exports = app