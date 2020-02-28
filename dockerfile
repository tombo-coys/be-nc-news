FROM node:10.15.0-alpine
LABEL maintainer="Tom Hawes"
ARG NPM_TOKEN
WORKDIR /app
COPY . .
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc 
RUN ["npm", "install"]
RUN rm -f .npmrc
EXPOSE 9091
CMD ["npm", "start"]