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
  npm start
  ```

# List of implemented features

# List of non implemented/planned features

# List of known bugs

# References

# Screenshots

# Tech Stack
+ MERN + TailwindCSS
