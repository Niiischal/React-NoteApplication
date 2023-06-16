const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
 
const app = express()
const port = 3000

// middleware
app.use(express.json())

// Available routes
app.use('/api/authentication', require('./routes/authentication'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})