var connect = require('connect');

var server = connect(connect.favicon());

var fs = require('fs');

var jade = require('jade');

var stylus = require('stylus');
var blueprint = require(__dirname + '/../../stylus-blueprint/lib');

var stylusServer = function(req, res, next) {
  var path = req.params['style'];
  fs.readFile(path+".styl", 'utf8', function(err, contents) {
    if(err) return next(err);
    console.log("stylus path %s", blueprint);
    stylus(contents)
      .set('filename', path)
      .set('paths', [blueprint])
      .render(function(err, css) {
        if(err) return next(err);
        res.writeHead(200, {'content-type':'text/css'})
        res.end(css);
      })
  })
}


server.use(connect.router(function(app) {
  app.get("/:style.css", stylusServer)
  app.get("/:page.html", function(req, res, next) {
    jade.renderFile(__dirname + "/" + req.params['page'] + ".jade", function(err, htm) {
      if(err) return next(err);
      res.writeHead(200, {'content-type':'text/html'});
      res.end(htm);
    })
  })
}))

server.use(connect.static(__dirname))

server.use(function(req, res) {
  res.writeHead(200, {'content-type':'text/html'});
  var html = [];
  html.push('<html><head><link rel="stylesheet" href="first.css" type="text/css" /></head><body>')
  html.push('<div>Hi there</div>')
  html.push('</body></html>')
  res.end(html.join(''));
}).listen(3001);
