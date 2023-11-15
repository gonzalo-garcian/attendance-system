FROM node:20 AS react-build
WORKDIR /app
COPY ./client/package*.json ./
RUN npm install
COPY ./client/ .
RUN npm run build

FROM nginx:1.25.3
COPY --from=react-build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]