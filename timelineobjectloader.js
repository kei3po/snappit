import * as http from "http";
import * as clarinet from "clarinet";

const clarinetOptions = {
  trim: true,
  normalize: false
};

exports.loadTimelineObject = (url, resolve, reject) => {
  var response = {};

  var clarinetStream = clarinet.createStream(clarinetOptions);
  clarinetStream.on('error', (e) => {
    reject(e);
  });

  clarinetStream.on('key', (key) => {
    console.log(key);
  });

  clarinetStream.on('value', (value) => {
    console.log(value);
  });

  clarinetStream.on('end', () => {
    resolve(response);
  });

  var req = http.get(url, (res) => {
    res.setEncoding('utf8');
    res.pipe(clarinetStream);
  });

  req.on('error', (e) => {
    reject(e);
  });
};
