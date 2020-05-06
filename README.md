# Smart-brain-API
### [Live Version](https://smartbrain-ultimate.herokuapp.com/)
### [Frontend Codebase](https://github.com/bassamkdev/smart-brain-frontend)
***
### Overview
The API developed for smart brain app to handle user authentication, session management, and as a connection between frontend and [Clarifi API](https://www.clarifai.com/) to utilize their face detection technology in the app 
### Technologies used
- Express.js
- PostgreSQL
- Node.js
- Redis
- Clarifi API
- aws Lambda Function
- aws S3 Bucket
- Docker compose
### Development highlights
- Utilized React.js Eco-system in the development of the app for development efficiency
- Developed a RESTful API using Express.js connected to a PostgreSQL database enabling users to register, sign-in and edit their profile information
- Containerized the app using Docker to make development processes easier
- Implemented authenticated routs and session management using JWT and Redis for caching to add an extra layer of security
- Integrated AWS S3 Bucket (as profile picture storage) with an AWS Lambda Function to control the process of uploading and retrieving photos away from the potential attackers, as well as avoiding to add more code to the web page
- deployed to Heroku Dynos to make the app more manageable and scalable
### Code highlights
- [server](https://github.com/bassamkdev/smart-brain-api/blob/master/server.js)
- [All handlers](https://github.com/bassamkdev/smart-brain-api/tree/master/controllers)
- [Session management](https://github.com/bassamkdev/smart-brain-api/blob/master/controllers/sessionHandler.js)
### Running the project locally
- *The API is containerized using __Docker-Compose__, so installing [Docker-compose](https://docs.docker.com/compose/install/) is required before going through following steps*
- *A clarifi API key is needed to use their services, create a `.env` file in route directory and copy `CLARIFI_API_KEY=your-api-key` into it*
1. Clone the project and `cd` into it
2. Run `docker-compose up -build`
3. You are good to go and can access API through `localhost:3000` and following routs:
  * `get (/)`
  * `post (/signin)`
  * `post (/register)`
  * `post (/signout)`
  * `get and post (/profile/:id)`
  * `put (/image)`
  * `post (/imageurl)`
