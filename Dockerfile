FROM node:12.16.1-alpine as base

RUN apk add --update --no-cache alpine-sdk python

WORKDIR /meli-bff/

COPY *.json  /meli-bff/
RUN yarn

COPY src /meli-bff/src/

EXPOSE 5000

FROM base as development

CMD yarn dev

FROM base as production

CMD yarn start