const http = require("http");
const port = process.env.PORT || 5000;
const useragent = require("express-useragent");
const geoip = require("geoip-lite")

const server = http.createServer((req, res) => {
  // const clientIp = reqIp.getClientIp(req);
  // console.log("clientIp", clientIp);

  const source = req.headers["user-agent"],
    ua = useragent.parse(source);
  console.log("ua", ua);
  console.log(req.socket.remoteAddress);
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  const geo = geoip.lookup(ip);
  console.log("geo", geo);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`
    ip:${ip}\n
    country:${geo.country}\n
    city:${geo.city}\n
    region:${geo.region}\n
    os:${ua.os},\n
    platform:${ua.platform},\n
    browser:${ua.browser},\n
    source:${ua.source},\n
  `);
});

server.listen(port);
