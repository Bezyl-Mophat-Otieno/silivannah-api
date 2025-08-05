FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
ENV NODE_ENV=production
RUN npm install

COPY . .

EXPOSE 8080

ENV PORT=8080

CMD ["npm", "start"]
