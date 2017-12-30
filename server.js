require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors())
const Pusher = require('pusher')

let user = 'X';

app.get('/', (req, res) => {
  if (user !== 'N') {
      res.send({user, key: process.env.PUSHER_APP_KEY, cluster: process.env.PUSHER_APP_CLUSTER});
      if (user === 'O') {
        user = 'N';
      } else {
        user = 'O';
      }
  } else {
      res.sendStatus(500)
  }
})

app.post('/', (req, res) => {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true
  });
  pusher.trigger('tic-tac-toe', 'move-event', req.body)
  res.sendStatus(200)
})

app.delete('/', (req, res) => {
  user = 'X';
  pusher.trigger('tic-tac-toe', 'reset-event', {})
  res.sendStatus(200)
})

app.listen(process.env.PORT || 8081)
