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

# Authentic details

Please create or set up the Database authentic details in the .env.{env} file.

1. MONGODB_USERNAME
2. MONGODB_PASSWORD

# Environment
1. development
2. production
3. test

# Test
Please run `npm run test` to use jest to run a unit test.

# Limitation

1. Security
   1. Add the authentication to protect the ticket detail
2. Real-time update
   1. using Restful API may not notice the winner immediately
      1. using Websocket or push notifications
3. Fairness in generating random numbers 
   1. using Math.random and crypto.getRandomValues both are not true random number
      1. Prevent using Math.random to ensure more fairness
         1. Reason: using 'seed', people can predict the random number by the pattern 











