FROM node:14-alpine

WORKDIR /server
COPY package.json package-lock.json ormconfig.json ./
RUN npm install
COPY . .

# Get envsubst dependency
RUN apk add --no-cache gettext

CMD ["/bin/sh",  "-c",  "exec npm run start"]
