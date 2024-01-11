FROM node:16-alpine
WORKDIR /usr/app/client
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "host"]
