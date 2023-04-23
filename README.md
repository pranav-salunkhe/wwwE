# IRIS_Rec23_211IT059_MERN
Task - II of IRIS Web Team Rec

# Video Demonstration

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

# How to run the project

+ Get the ```connection string``` from Atlas's connect option: ```Overview -> connect -> Drivers -> Select Node.js```
+ Paste the ```connection string``` in ```line 19``` of ```server/src/index.js```:
  ```
  mongoose.connect(
    `mongodb+srv://${process.env.USN}:${process.env.PSWD}@yourDB.example.mongodb.net/yourDB?retryWrites=true&w=majority`
  );
  ```
+ Create a ```.env``` file at the root directory of project and store your username and password as follows:<br>
  > .env
  ```
  USN=yourusername
  PSWD=yourpassword
  ```
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
1. Authentication, Authorization:
```
- The users can access the features of the app only if they are logged in.
- I've used username, email, password based login functionality. The user needs to create a unique username and use their NITK edu mail.
- Admins/Convenors can create events.
- Any student of NITK can see all the events, they don't need to be part of a club.
```
2. Authorization flow, Roles: 
```
- If the user is not a convenor, they can simply view the events and save them.
- If a user is a convenor, along with above functionalities they are directed to '/admin' path which has the functionalities of creating events.
```
# List of non implemented/planned features

# List of known bugs
1. The `createEvent` form doesn't submit the post request for creating event, although the API for the same works completely well on Postman/Insomnia.

# References
1. Builder.io YT Tutorials

# Screenshots

# Tech Stack
+ MERN + TailwindCSS + jQuery
