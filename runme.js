var restify = require('restify')
var apistatus = require('apistatus')
var server = restify.createServer()

server.use(restify.queryParser())
server.get('/', function (req, res, next) {

  var url = req.params.url

  if (!url) {
    res.send(400, {error: "missing target url"})
    next()
    return
  }

  apistatus(url, function(status){
    res.send(status)
    next()
  })

})

server.get('/ping', function (req, res, next) {
  res.send("pong")
  next()
})

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})
