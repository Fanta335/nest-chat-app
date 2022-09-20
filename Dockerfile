FROM node:16.17.0-slim
RUN npm i -g @nestjs/cli
WORKDIR /api
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "run", "build:start:prod"]
