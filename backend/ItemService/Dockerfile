FROM node:16
WORKDIR /usr/src/app/backend/ItemService
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4000

CMD ["npm", "start"]