#!/bin/sh

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install
yarn run start:dev
