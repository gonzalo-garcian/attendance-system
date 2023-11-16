FROM node:20
WORKDIR /usr/src/app
RUN apt-get update
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "build" ]