const http = require("http");
const port = process.env.PORT || 5000;
const useragent = require("express-useragent");
const geoip = require("geoip-lite");

const server = http.createServer((req, res) => {

  const source = req.headers["user-agent"],
    ua = useragent.parse(source);
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  const geo = geoip.lookup(ip);

  res.statusCode = 200;
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ck-user</title>
        </head>
        <body>
          <div>
            <p>ip:${ip}<p>
            <p>country:${geo?.country}<p>
            <p>city:${geo?.city}<p>
            <p>os:${ua?.os}<p>
            <p>platform:${ua?.platform}<p>
            <p>browser:${ua?.browser}<p>
            <p>source:${ua?.source}<p>
          </div>
        </body>
      </html>
  `);
});

server.listen(port);
