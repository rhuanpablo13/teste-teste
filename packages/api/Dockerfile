FROM node:16

WORKDIR /api

COPY . .

#RUN npm install

RUN yarn install

#EXPOSE 8080

#CMD [ "node", "index.js" ]

CMD [ "yarn", "dev" ]