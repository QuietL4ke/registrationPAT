# RegistrationPAT

<b>Client-Server application for users registration</b>

## Local Project Setup

### Local Server Setup

```sh
cd server/
npm install
npm run dev
```

### Local Client Setup

```sh
cd client/
npm install
npm run dev
```
## Docker Project Setup

### Docker Server Setup
```sh
cd server/
docker build -t application-server .
docker run -p 3000:3000 application-server
```

### Docker Client Setup
```sh
cd client/
docker build -t application-client .
docker run -p 5173:5173 application-client
```
