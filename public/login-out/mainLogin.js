import LoginOut from './repository-users.js';
import EventsHandler from './events-handler-signin.js';


let loginOut = new LoginOut ();
let eventsHandler = new EventsHandler(loginOut);
eventsHandler.registerAddUser();


