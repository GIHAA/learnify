FROM node:16
WORKDIR /usr/src/app/backend/UserService
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 7000

CMD ["npm", "start"]