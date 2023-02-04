FROM node:10

WORKDIR /app
COPY . ./

RUN npm i 2> /dev/null
RUN npm run build:mainnet

RUN npm runglobal add serve
EXPOSE 5000
CMD [ "serve", "-s", "build", "-l", "5000"]
