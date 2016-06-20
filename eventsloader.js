import * as http from "http";
import * as clarinet from "clarinet";

const clarinetOptions = {
  trim: true,
  normalize: false
};

exports.loadEvents = (url, resolve, reject) => {
  var eventUrls = [];
  var parseValue = false;

  var clarinetStream = clarinet.createStream(clarinetOptions);
  clarinetStream.on('error', (e) => {
    reject(e);
  });

  clarinetStream.on('key', (key) => {
    if (key == "timeline_api_url") {
      parseValue = true;
    }
  });

  clarinetStream.on('value', (value) => {
    if (parseValue) {
      eventUrls.push(value);
    }
    parseValue = false;
  });

  clarinetStream.on('end', () => {
    resolve(eventUrls);
  });

  var req = http.get(url, (res) => {
    res.setEncoding('utf8');
    res.pipe(clarinetStream);
  });

  req.on('error', (e) => {
    reject(e);
  });
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
