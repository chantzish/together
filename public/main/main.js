
import GoogleMaps from './google-maps.js';
import ActivityRepository from './activities-repository.js';
import EventsHandler from './events-handler.js';

let googleMaps = new GoogleMaps();
let activityRepository = new ActivityRepository(googleMaps);
let eventsHandler = new EventsHandler(googleMaps, activityRepository);
eventsHandler.getAllActivities();
eventsHandler.searchActivities();





