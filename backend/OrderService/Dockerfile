FROM node:16
WORKDIR /usr/src/app/backend/OrderService
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000

CMD ["npm", "start"]