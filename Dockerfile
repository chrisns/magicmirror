FROM node:15.14.0 as builder
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install
RUN node_modules/.bin/napa

COPY e2e e2e
COPY src src
COPY *.json *.js ./

RUN node_modules/.bin/ng test --single-run --browsers PhantomJS --reporters dots
RUN node_modules/.bin/ng build

RUN rm /app/dist/*.map

FROM nginx:1.19.10-alpine

LABEL org.opencontainers.image.source https://github.com/chrisns/magicmirror

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html
COPY config.json.tpl /config.json.tpl

CMD envsubst < /config.json.tpl > /var/cache/nginx/config.json && exec nginx -g 'daemon off;'

USER nginx
VOLUME /var/cache/nginx
HEALTHCHECK CMD wget -q localhost:8080 -O /dev/null || exit 1
