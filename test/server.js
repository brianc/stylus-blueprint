var fs = require('fs');

var stylus = require('stylus');
var blueprint = require(__dirname + '/../lib');
var connect = require('connect');
var jade = require('jade');


var router = connect.router(function(app) {

  var render = function(file, res, next) {
    jade.renderFile(__dirname + "/" + file + ".jade", function(err, htm) {
      if(err) return next(err);
      res.writeHead(200, {'content-type':'text/html'});
      res.end(htm);
    })
  };

  var stylusServer = function(req, res, next) {
    var path = req.params['style'];
    fs.readFile(__dirname + "/" + path + ".styl", 'utf8', function(err, contents) {
      if(err) return next(err);
      stylus(contents)
        .set('filename', path)
        .set('paths', [blueprint])
        .render(function(err, css) {
          if(err) return next(err);
          res.writeHead(200, {'content-type':'text/css'})
          res.end(css);
        })
    })
  };

  app.get("/:style.css", stylusServer)
  app.get("/:page.html", function(req, res, next) {
    var file = req.params['page'];
    render(file, res, next);
  })
  app.get('/', function(req, res, next) {
    render("index", res, next);
  })
})

var server = connect();
server.use(router)
server.use(connect.static(__dirname));
server.use(connect.favicon());
server.use(connect.errorHandler({showStack: true, dumpExceptions: true})).listen(3001);
console.log("Server listening on 3001");
