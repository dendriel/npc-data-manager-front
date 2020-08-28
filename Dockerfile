FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install
# Use the line bellow for production deploy
# RUN npm ci --only=production

COPY . .

EXPOSE 9090

CMD [ "node", "server.js" ]