const path = require('path')
const express = require('express')

const apiRoutes = require('./routes/api')

const server = express()

// routes
server.use('/api/v1', apiRoutes)

// middleware
server.use(express.static(path.join(__dirname, '../public')))

// wildcard route
server.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = server
