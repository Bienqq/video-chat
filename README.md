# Video Chat
Application for video chatting with sharing files functionality

## How to run

### Node.js server

In /server directory run below commands:

```sh
npm install # Install required dependencies
npm run dev # In development mode using Nodemon
npm run start # In production mode
```

### React client app
In /client directory run below commands:

```sh
npm install # Install required dependencies
npm run start
```

Also create .env.local file with local React client app configuration

**Example:**

```
# React App port
PORT=8993

# Must be changed depending on the server IP
REACT_APP_PEERJS_HOST=localhost
REACT_APP_PEERJS_PORT=8991
REACT_APP_PEERJS_SECURE=false
REACT_APP_PEERJS_PATH="/video-chat-server/peerjs"

# Must be changed depending on the server IP
REACT_APP_BROKER_URL="localhost:8992"

```

# Authors

- Tomasz Bieniek 
- Kinga Humeniuk
- Judyta Szczęch
- Radosław Wojaczek

# Licence
MIT 
