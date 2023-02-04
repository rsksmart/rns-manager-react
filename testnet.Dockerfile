FROM node:10

WORKDIR /app
COPY . ./

RUN npm run2> /dev/null
RUN npm runbuild:testnet

RUN npm runglobal add serve
EXPOSE 5001
CMD [ "serve", "-s", "build", "-l", "5001"]
