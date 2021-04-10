# Delivery Simulator - Frontend Application

## Description

Repository built using Typescript + ReactJS + Docker + Websockets

## Before Running

**Important**: [`Make sure that the Backend application is already running in the background`](../backend/README.md)

Install all the dependencies

```bash
yarn
```

Make sure you have all the environment variables configured in your developer environment:

| Name                     |     | Description                   |     | Default Value         |
| ------------------------ | --- | ----------------------------- | --- | --------------------- |
| REACT_APP_API_URL        |     | Backend application url       |     | http://localhost:3000 |
| REACT_APP_GOOGLE_API_KEY |     | Google API authentication key |     |                       |

## Running The Application

Start ReactJS server using Docker

##### Docker containers

```sh
docker-compose up -d
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
