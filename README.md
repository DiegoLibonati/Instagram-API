# Instagram API

## Getting Started

1. Clone the repository with `git clone "repository link"`
2. Execute: `npm install` or `yarn install` in the terminal
3. Execute: `docker-compose build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose up --force-recreate` in the terminal

NOTE: You have to be standing in the folder containing the: `docker-compose.yml` and you need to install `Docker Desktop` if you are in Windows.

## Description

This API is developed with the intention of being able to access the instagram API: `https://graph.instagram.com` in a fast, efficient and well structured way.

## Technologies used

1. Node JS
2. Typescript
3. Redis
4. Docker

## Libraries used

#### Dependencies

```
"@types/express": "^4.17.21"
"@types/jest": "^29.5.14"
"@types/node": "^20.10.5"
"@types/supertest": "^6.0.2"
"dotenv": "^16.3.1"
"express": "^4.18.2"
"redis": "^4.6.13"
```

#### devDependencies

```
"jest": "^29.7.0"
"nodemon": "^3.0.2"
"supertest": "^7.0.0"
"ts-jest": "^29.2.5"
"ts-node": "^10.9.2"
"typescript": "^5.3.3"
"msw": "^2.6.0"
```

## Portfolio link

[https://diegolibonati.com.ar/#/project/Instagram-API](https://diegolibonati.com.ar/#/project/Instagram-API)

## Testing

1. Join to the correct path of the clone
2. Execute: `yarn test` or `npm test`

## Env Keys

The `PORT` key refers to the port to be used by the backend, by default it uses `5000`.

```
PORT="5000"
```

The `API_VERSION` key refers to the current API version. In case of modification, modify also the API version.

```
API_VERSION="0.0.1"
```

The `INSTAGRAM_API` key refers to the `BASE URL` used by instagram to access the `Instagram Graph` endpoints. 

The `INSTAGRAM_API_VERSION` key refers to which version of the instagram API we are going to consume.

The `INSTAGRAM_SECRET_CLIENT` and `INSTAGRAM_USER_ACCESS_TOKEN` keys refer to keys that we will use to be able to consume this Instagram API. Both are obtained by creating an Instagram Application and giving permissions through the link: `developers.facebook.com`. The access token is the user's own which we use and authorize to test.
We can use internet guides to obtain both keys.

Here are some quick steps to obtain them:

1. Go to Meta for Developers
2. Create an App
3. Add a New Product
4. Adding an Instagram Tester
5. Activate the Tester
6. Generate Access Token

IMPORTANT: In this API we do not use the `INSTAGRAM_SECRET_CLIENT` key but it is good to get it and have it just in case.

```
INSTAGRAM_API="https://graph.instagram.com"
INSTAGRAM_API_VERSION="v19.0"
INSTAGRAM_SECRET_CLIENT="YOUR_SECRET_CLIENT"
INSTAGRAM_USER_ACCESS_TOKEN="YOUR_ACCESS_TOKEN"
```

The `REDIS_HOST` and `REDIS_PORT` keys are specific to the database we use, in this case Redis.

```
REDIS_HOST="host.docker.internal"
REDIS_PORT="6379"
```

## Endpoints

Currently we have an auth endpoint, in which we use the access token to generate our `idUser`. Then we will be able to access the `instagramRoutes.ts` endpoints thanks to having previously generated the `idUser`.

That is to say, first we will execute the endpoint: `/v1/auth/user_id` this `idUser` will be saved in Redis. Once this `idUser` is obtained we will be able to consume the `instagramRoutes.ts` endpoints.

### Auth Route

- **Endpoint Name**: Get User ID
- **Endpoint Route**: /v1/auth/user_id
- **Endpoint Fn**: This endpoint returns the `idUser` in order to consume the `Instagram Graph API` endpoints. This endpoint will return the `idUser` of the access token generated in our APP.

### Instagram Route

- **Endpoint Name**: Alive
- **Endpoint Route**: /v1/instagram/alive
- **Endpoint Fn**: This endpoint returns the current version of my API, along with additional information such as the author.

-----

- **Endpoint Name**: Get User Profile
- **Endpoint Route**: /v1/instagram/user/profile
- **Endpoint Fn**: This endpoint returns information about the profile based on the `idUser` previously generated. It will return the following fields: id, username, account_type, media_count
