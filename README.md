# Smart-brain-API
### [Live Version](https://smartbrain-ultimate.herokuapp.com/)
### [Frontend Codebase](https://github.com/bassamkdev/smart-brain-frontend)
***
### Overview
The API developed for smart brain app to handle user authentication, session management, and as a connection between frontend and [Clarifi API](https://www.clarifai.com/) to utilize their face detection technology in the app 
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
### Code highlights
- [server](https://github.com/bassamkdev/smart-brain-api/blob/master/server.js)
- [All handlers](https://github.com/bassamkdev/smart-brain-api/tree/master/controllers)
- [Session management](https://github.com/bassamkdev/smart-brain-api/blob/master/controllers/sessionHandler.js)
