import * as http from "http";
import oboe from "oboe";
import * as clarinet from "clarinet";

const clarinetOptions = {
  trim: true,
  normalize: false
};

exports.getTimelineURLs = (url, resolve, reject) => {
  var timelineURLs = [];
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
      timelineURLs.push(value);
    }
    parseValue = false;
  });

  clarinetStream.on('end', () => {
    resolve(timelineURLs);
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
  var req = http.get(url, (res) => {
    res.setEncoding('utf8');
    oboe(res).done((timelineObject) => {
      resolve(timelineObject);
    }).fail(reject);
  });

  req.on('error', (e) => {
    reject(e);
  });
};

exports.getVODDownloads = (url, resolve, reject) => {
  var req = http.get(url, (res) => {
    res.setEncoding('utf8');
    oboe(res).done((timelineObject) => {
      var downloads = [];
      timelineObject.tracks["0"].forEach((item => {
        if (item.type == "snap" && item.downloads && item.downloads.length > 0) {
          item.downloads.forEach((download) => {
            downloads.push(download)
          });
        }
      }));
      resolve(downloads);
    }).fail(reject);
  });

  req.on('error', (e) => {
    reject(e);
  });
};
