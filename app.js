import * as snappytv from "./snappytv";

const url = 'http://www.snappytv.com/partner_api/v1/timeline/search/events.json?partner_id=79&channel=ONCNNSVB';

snappytv.getTimelineURLs(url,
  (res) => {
    res.forEach((item) => {
      item = item + ".json";
      snappytv.getVODDownloads(item, (downloads) => {
        if (downloads.length > 0) {
          downloads.forEach((item => {
            console.log(JSON.stringify(item, null, 4));
          }));
        }
      }, (err) => {console.log(err);});
    });
  },
  (err) => {console.log(err);});
