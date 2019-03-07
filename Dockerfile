FROM docker-all.repo.ebaotech.com/ebaocloud/web-base:0.0.20 as BUILD
ADD ./ /app/
RUN cp /root/.yarnrc /app/.yarnrc
WORKDIR /app
RUN yarn && yarn run test

FROM node:11.8.0-alpine
WORKDIR /app

COPY --from=BUILD /app/ /app/

CMD ["npm","run","start"]
