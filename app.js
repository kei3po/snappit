import * as http from "http";
import * as clarinet from "clarinet";
import * as eventsloader from "./eventsloader";
import * as timelineObjectLoader from "./timelineobjectloader";

var url = 'http://www.snappytv.com/partner_api/v1/timeline/search/events.json?partner_id=79&channel=ONCNNSVB';

eventsloader.loadEvents(url,
  (res) => {
    res.forEach((item) => {
      timelineObjectLoader.loadTimelineObject(item, (res) => {}, (err) => {console.log(err);});
    });
  },
  (err) => {console.log(err);});
