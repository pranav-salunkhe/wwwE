# Event Management System
A Fullstack Event Management web application.

# Video Demonstration

[<img src="/client/src/assets/Video_Demo.png" width="75%">](https://www.youtube.com/watch?v=88mw3UF_dNc "Features Demo")

# How to set up the project
+ Make a folder for the project:<br>
  ```
  mkdir <folder-name>
  cd <folder-name>
  ```
+ Clone the repository in the newly created folder:<br>
  ```
  git clone <url-of-repository>
  cd IRIS_Rec23_211IT059_MERN
  ```
+ Install the server dependencies:<br>
  ```
  cd server
  npm i
  ```
+ Install the client dependencies:<br>
  ```
  cd client
  npm i
  ```
+ Make an account on MongoDB Atlas

+ Create a database for the project and set password

+ Add your IP address in the whitelist of Atlas by navigating to ```Network Access -> Edit -> Allow from anywhere```
> NOTE: You might face `IP address not in whitelist` error even after doing the above step, its highly probable that your WIFI doesn't have 8.8.8.8 in its DNS, to avoid that try to use your mobile data.


# How to run the project
# 1. MongoDB Setup:
+ Get the ```connection string``` from Atlas's connect option: ```Overview -> connect -> Drivers -> Select Node.js```
+ Paste the ```connection string``` in ```line 19``` of ```server/src/index.js```:
  ```
  mongoose.connect(
    `mongodb+srv://${process.env.USN}:${process.env.PSWD}@yourDB.example.mongodb.net/yourDB?retryWrites=true&w=majority`
  );
  ```
  
# 2. Google Cloud Console Setup:
+ Create a project on ```google cloud console``` and enable the ```Calendar API``` for the project.
+ Generate ```OAuth``` credentials (client_id, client_secret). (You may be prompted to fill the OAuth Consent Screen).
+ Generate ```API key```
+ While creating the project, mention the ```url``` to which you want the website to redirect to once the authorization is completed. This ```url``` is   to be mentioned in the ```Authorized Redirect URIs``` section. 
+ Mention ```http://localhost:<port_number>```(of frontend as well as backend) or just mention ```http://localhost``` in the ```Authorized Javascript Origins``` section.
+ Create a ```.env``` file at the root directory of project or server and client folders, and store your created credentials as follows:<br>
  > server: .env
  ```
  USN=yourusername
  PSWD=yourpassword
  CLIENT_ID=yourclientid
  CLIENT_SECRET=yourclientsecret
  REDIRECT_URL=yourredirecturl // for this project: http://localhost:<portnumber>/user/get_url/calender
  API_KEY=yourapikey
  ```
   > client: .env
   ```NOTE: Vite requires the prefix 'VITE_' to recognise env variables```
  ```
  VITE_API_KEY=yourapikey
  VITE_CAL_ID=yourcalendarid //you can get this from your Google Calendar: Settings for my Calendar -> Integrate Calendar
  ```
+ You need to make your calendar public in order to make the `<Fullcalendar />` element to work: `Settings for my Calendar -> Access permissions for events`
# 3. Finally, run the project!
+ Run the server:<br>
  ```
  cd server
  npm start
  ```
+ Run the client (frontend):<br>
  ```
  cd client
  npm run dev
  ```

# List of implemented features
# 1. Authentication, Authorization:
+ Tech Used: MongoDB, Mongoose, jwt
```
- The users can access the features of the app only if they are logged in.
- I've used username, email, password based login functionality. The user needs to create a unique username and use their NITK edu mail.
- Admins/Convenors can create events.
- Any student of NITK can see all the events, they don't need to be part of a club.
```
# 2. Authorization flow, Roles: 
+ Tech Used: MongoDB, Mongoose, jwt
```
- If the user is not a convenor, they can simply view the events and save them.
- If a user is a convenor, along with above functionalities they are directed to '/admin' path which has the functionalities of creating events.
```
# 3. Calendar:
+ Tech Used: Calendar API, OAuth, React FullCalendar
```
- The user can change the view of the calendar: 
  View by Month
  View by Week
  View by Day
- The user is first asked for authentication and permission to access calendar data.
- The user can add any event into their Google Calendar.
- The web app also facilitates an in-app calendar.
- The user can add any club's saved event in the Calendar
```
# 4. Responsive:
+ Tech Used: TailwindCSS
```
- The web app is responsive i.e. it is compatible with majority of the screen sizes.
```
# List of non implemented/planned features
```
- Allowing only NITK Students to sign-up.
- [PLANNED]Instead of Custom Registration and Login, I'm thinking of using Resgiter/Login via Google itself.
- Clubs to which user belongs/Club Members isn't implemented.
```

# List of known bugs
1. The `createEvent` form doesn't submit the post request for creating event, although the API for the same works completely well on Postman/Insomnia.
2. The event's button doesn't become 'disabled' once it is added to calendar. Although I've added the apt jQuery code for it.
3. There's some conversion errors between RFC3339 to Local Time Zone Due to which I wasn't able to extract the time from the event. As a temporary fix, the user would be reminded of the event on the day it is supposed to occur.

# References
1. Documentations: <br></br>
  https://developers.google.com/calendar/api/guides/create-events <br></br>
  https://vitejs.dev/guide/env-and-mode.html <br></br>
  https://tailwindcss.com/ <br></br>
  https://fullcalendar.io/ <br></br>
2. Stackoverflow: <br></br> https://stackoverflow.com/ <br></br>
2. YoutTube


# Screenshots
<img width="1437" alt="ss1" src="https://user-images.githubusercontent.com/73712941/235392412-a5b9fdf8-bd9d-4cf7-9cbc-89cfdf2af3cf.png">
<img width="1424" alt="ss2" src="https://user-images.githubusercontent.com/73712941/235392467-9d1fd03e-24cc-4f70-a7e8-66d15cc09c08.png">
<img width="1418" alt="Screenshot 2023-05-01 at 7 49 12 AM" src="https://user-images.githubusercontent.com/73712941/235392497-68b8e836-ed13-416b-ab82-9e2e4b2230bb.png">
<img width="1412" alt="Screenshot 2023-05-01 at 7 49 34 AM" src="https://user-images.githubusercontent.com/73712941/235392515-62576a1c-114a-4300-ab1c-c6ba7cb08ff8.png">
<img width="1413" alt="Screenshot 2023-05-01 at 7 49 50 AM" src="https://user-images.githubusercontent.com/73712941/235392531-f1e9f1cc-41d5-42b3-adc3-23cf89a01952.png">
<img width="1416" alt="Screenshot 2023-05-01 at 7 50 00 AM" src="https://user-images.githubusercontent.com/73712941/235392535-db8cdacf-49b1-4cf3-acde-9554e8bfa39f.png">

# Tech Stack
+ MERN + TailwindCSS + jQuery
