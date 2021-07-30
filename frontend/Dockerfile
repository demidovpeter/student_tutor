# Stage 1 - the build process
FROM node:16-slim as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build


# Stage 2 Production
FROM node:16-slim

RUN apt-get update
#&& apt-get install npm

RUN npm install -g serve

# create directory for the app user
RUN mkdir -p /home/app

# create the app user
RUN addgroup -system app
RUN adduser  --system app
RUN adduser app app

# create the appropriate directories
ENV HOME=/home/app
ENV APP_HOME=/home/app/frontend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY --from=build-deps /usr/src/app/ $APP_HOME

# chown all the files to the app user
RUN chown -R app:app $APP_HOME

# change to the app user
USER app