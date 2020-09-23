# Wishlist API ![master](https://github.com/fernandoguedes/wishlist-api/workflows/ci/badge.svg?branch=master)

## Install dependencies

```
npm i
```

## Run locally

### With docker

```
docker-compose up
```

This command up API and MongoDB, accessible via `http://localhost:3000`

### Without docker

```
npm start
```

PS: Is necessary up a MongoDB and set `MONGO_URL` env var, or `docker-compose up mongo`

## Documentation

The documentation is acessible via `/documentation` path (`http://localhost:3000/documentation`) or (https://wishlist-api-u3gnsltg3a-uc.a.run.app/documentation/index.html)

## Tests

```docker-compose up mongo
npm t
```

## Technologies 

- Docker
- Node.js
- MongoDB
- Fastify
- Swagger
- Jest