import LoginOut from './repository-users.js';
import EventsHandler from './events-handler-signin.js';


let loginOut = new LoginOut ();
let eventsHandler = new EventsHandler(loginOut);
eventsHandler.registerAddUser();
function closeWindow()
{
    alert('That window is already closed. Open the window first and try again!');
   if(false == loginWindow.closed)
   {
    loginWindow.close ();
   }
   else
   {
      alert('That window is already closed. Open the window first and try again!');
   }
}


