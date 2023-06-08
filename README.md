## Getting Started

if you dont use nodenv, use node version 18.15.0.

# install dependencies

```bash
npm i
```

# set up your env:

- if you are in dev mode, create a file at root level named '.env.development' or if you are not planning for deployment or the build version '.env'.

```
API_KEY=<YOUR API KEY>
API_PROXY=https://pro-api.coinmarketcap.com/
BASE_URL=http://localhost:3000/
```

- for production mode, create a file at root level named '.env.production' or if you are not planning for development mode, '.env'.

```
API_KEY=<YOUR API KEY>
API_PROXY=https://pro-api.coinmarketcap.com/
BASE_URL=<YOUR PROD URL>
```

# DEV

run the development server:

```bash
npm run dev
```

# PROD

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
