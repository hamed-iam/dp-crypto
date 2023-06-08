# DP QUEST

## Getting Started

### Perquisites

- [Node.js](https://nodejs.org/en/)
  if you dont use nodenv, use node version 18.15.0, if you do, dont worry about it.

### install dependencies

```bash
npm i
```

### set up your env

Note: This repo does not include the api key from coinmarketcap as including it in repo is not a good approach, so if you want to test it, either contact me for the key or use your own.

- if you are in dev mode, create a file at root level named '.env.development' or if you are not planning for deployment or the build version '.env'.

```env
API_KEY=<YOUR API KEY>
API_PROXY=https://pro-api.coinmarketcap.com/
BASE_URL=http://localhost:3000/
```

- for production mode, create a file at root level named '.env.production' or if you are not planning for development mode, '.env'.

```env
API_KEY=<YOUR API KEY>
API_PROXY=https://pro-api.coinmarketcap.com/
BASE_URL=<YOUR PROD URL>
```

### DEV

run the development server:

```bash
npm run dev
```

### PROD

build:

```bash
npm run build
```

then:

run the production:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
