FROM node:16
WORKDIR /usr/src/app/backend/PaymentService
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 6000

CMD ["npm", "start"]