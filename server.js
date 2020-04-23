const http = require('http');
const url = require('url');

let subscribers = Object.create(null);

const messages = [];

function onSubscribe(req, res) {
  let id;

  req.on('data', function (data) {
    id = JSON.parse(data).id;

    if (!id || !subscribers[id]) {
      id = +new Date();
      subscribers[id] = res;
      res.end(JSON.stringify({
        messages,
        id
      }));
    } else {
      subscribers[id] = res;
    }
  });

  req.on('close', function () {
    delete subscribers[id];
  });
}

function publish(messages) {
  for (const id in subscribers) {
    const res = subscribers[id];
    res.end(JSON.stringify({
      messages,
      id
    }));
  }
}

function accept(req, res) {
  const urlParsed = url.parse(req.url, true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD');

  if (urlParsed.pathname === '/' && req.method === 'GET') {
    res.end('Hello world');
    return;
  }

  // new client wants messages
  if (urlParsed.pathname === '/subscribe' && req.method === 'POST') {
    onSubscribe(req, res);
    return;
  }

  // sending a message
  if (urlParsed.pathname === '/publish' && req.method === 'POST') {
    // accept POST
    req.setEncoding('utf8');
    req.on('data', function (data) {
      messages.push(JSON.parse(data));
    }).on('end', function () {
      publish(messages);
      res.end(JSON.stringify({
        ok: true
      }));
    });

    return;
  }

}

http.createServer(accept).listen(8080);
console.log('Server running on port 8080');
