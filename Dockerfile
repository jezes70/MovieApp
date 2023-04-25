FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN npx tsc

RUN apk add --no-cache mongodb-tools

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ENV MONGODB_URI=mongodb+srv://jezes70:TBN8G3fIB5NIcXkM@cluster0.hm154wl.mongodb.net/test
ENV JWT_SECRET=zeeFlixapp

USER appuser

CMD ["node", "bin/www"]

EXPOSE 3011