[![Build Status](https://semaphoreci.com/api/v1/projects/af26ac01-8b32-4ab5-b17e-a77b5cdfc7a3/2536034/badge.svg)](https://semaphoreci.com/laguro/laguro-web-prod)

## FAQ

### When to use local development?
- Use this if you want to see your code changes reflected in the UI quickly. This will create a bundle for the current route you are visiting. Let's say you are visiting the search page route, it will create a bundle for that on the fly. The downside is that if you visit a different route, it will take a bit of time to prepare the bundle for that route.

### When to use production build?
- Use this if you want to test the whole app quickly without having to wait for the server to create a bundle on every route change. This will create a bundle for all the pages and put it inside the `.next` folder. The downside is that you won't see your code changes reflected in the UI.
- Use this when doing performance audits

### Why do I want to connect to staging APIs?
- If your computer cannot handle running docker locally, you can connect to stage APIs by creating a custom env file. See "How to run local development using custom env" or "How to run local production build using custom env"

## How to run without docker:

### How to run local development:
1. `npm run dev`

### How to run local development using custom env:
1. Create a file called `._env` with your custom configuration
2. `npm run dev:custom`

### How to run local production build:
1. `npm run build:server`
2. `npm run start:server`

### How to run local production build using custom env:
1. Create a file called `._env` with your custom configuration
2. `npm run build:custom`
3. `npm run start:custom`

## How to run with docker:

### How to run local production build in docker:
1. `npm run build:env`
2. `npm run start:env`
