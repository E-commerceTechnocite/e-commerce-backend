### frontend builder
FROM node:14-slim as builder

RUN apt update && apt upgrade -y \
    && apt install unzip

WORKDIR /tmp

ADD https://github.com/E-commerceTechnocite/e-commerce-admin-client/archive/main.zip e-commerce-admin-client.zip

RUN unzip e-commerce-admin-client.zip -d /tmp

WORKDIR ./e-commerce-admin-client-main

RUN yarn && yarn vite build --outDir=/app --base=/admin && rm -rf /tmp

### application
FROM node:14-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock .

RUN yarn

COPY ./ ./

RUN yarn build

COPY --from=builder /app /usr/src/app/dist/admin

EXPOSE 3000

CMD ["yarn", "start:prod"]

