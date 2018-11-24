
# Homework Assignment #1

 This is the first of several homework assignments from the priple's NodeJs Master Class.
 
 ## Prerequisite 
   - npm / [NodeJS][node]
  
 ## Download / Installation
 
 - Clone the repository
 - Create a `https` directory in the root directory 
 - Change the current directory in the new created `https` directory (`cd https`)
 - In the `https` directory run the following command to create the `key.pem` and `cert.pem` files: `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`

## Starting
 - to start the Server run `node index.js` in the terminal. 
 - The server will be listening on port `3000` for http and `3001` for https
 - To run the server in `production mode` run  `NODE_ENV=staging node index.js`
 -  The server will be listening on port`5000` for http and `5001` for https for production
 
 ## Available Routes
 | Endpoint  | Code  |  Description |
 | ---- | ---- |  ---- |  
 | `/ping`  | 200 |  Route to test the application  | 
 | `/hello` | 200 |  The Route will return a `Hello World!` message |    
 |  (on error) | 404 |  The Route will return a `Route not found` message |    
  
[node]: https://nodejs.org/en/