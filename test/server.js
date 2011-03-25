var connect = require('connect');

var stylus = require('stylus');
var server = connect()

server.use(stylus.middleware({
  src: __dirname,
  compile: function(str, path) {
    console.log("hit");
    return stylus(str)
      .import(__dirname + '/../lib')
      .set('filename', path)
      .set('warn', true);
  }
}))

server.use(connect.static(__dirname));

server.use(function(req, res, next) {
  res.writeHead(200, {'content-type':'text/html'});
  var html = [];
  html.push("<html><head><link rel='stylesheet' type='text/css' href='demo.css' /></head><body>");
  html.push("</body></html>");
  res.end(html.join(''));
})

server.listen(9000);
