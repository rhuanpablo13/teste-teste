FROM node:16

WORKDIR /web

COPY . .

#RUN npm install

RUN yarn install

# RUN npx prisma generate

#EXPOSE 8080

#CMD [ "node", "index.js" ]

# ENV NODE_OPTIONS=--max_old_space_size=2048

CMD [ "npm", "start" ]