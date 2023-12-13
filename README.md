# Lottery System

# Installation

Install node.js(v18.16.0)

Run `npm install` to install dependencies

# Pre-requisites

#### 1. MongoDb

Please set up the path into the configuration file

#### Path

1. `/config/{env}.json`

# Services

There are ONLY one services that need to be started:the Main Service.

1. `npm run start-{env}`
2. `npm run start-dev-atlas` (To run into online mongodb atals mode)

# Authentication details

Please create or set up the Database authentic details in the .env.{env} file.

1. MONGODB_USERNAME 
2. MONGODB_PASSWORD
3. MONGODB_DOMAIN (Only applicable for using MongoDB Atlas)

* Please ask me for the username,password and domain if you want to use mongoDb Atlas

## MongoDb (Local)
1. Please set a database `lottery_system`
2. Please set a collection `tickets`

# Environment
1. development
2. development-atlas
3. test

# Test
Please run `npm run test` to use jest to run a unit test.

# Api Spec
Please find  `api_spec.md` in the document folder

# Limitation

1. Enhancing Security
   1. Implement authentication measures to safeguard ticket details.
2. Real-Time Updates
   1. Utilize WebSockets or push notifications instead of Restful API to ensure immediate winner notifications.
3. Ensuring Fairness in Random Number Generation
   1. Acknowledge that Math.random and crypto.getRandomValues are not true random number generators.
   2. Avoid using Math.random to promote fairness.
      1. Justification: Predicting random number patterns is possible using 'seed' values.










