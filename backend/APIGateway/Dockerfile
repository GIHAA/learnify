FROM node:16
WORKDIR /usr/src/app/backend/APIGateway
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8000

CMD ["npm", "start"]