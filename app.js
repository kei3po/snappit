import * as http from "http";
import * as clarinet from "clarinet";
import * as snappytv from "./snappytv";

var url = 'http://www.snappytv.com/partner_api/v1/timeline/search/events.json?partner_id=79&channel=ONCNNSVB';

snappytv.loadEvents(url,
  (res) => {
    res.forEach((item) => {
      item = item + ".json";
      console.log(item);
      snappytv.loadTimelineObject(item, (res) => {}, (err) => {console.log(err);});
    });
  },
  (err) => {console.log(err);});
