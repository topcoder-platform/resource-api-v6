# Use the base image with Node.js
FROM node:22.13.1-alpine
RUN apk add --update --no-cache openssh-client git
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
# Copy the current directory into the Docker image
COPY . /resources-api

# Set working directory for future use
WORKDIR /resources-api

RUN npm install pnpm -g
# Install the dependencies from package.json
RUN pnpm install
RUN pnpm lint
RUN pnpm lint:fix

CMD pnpm start
