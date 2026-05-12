# Use the base image with Node.js
FROM node:22.13.1-alpine
RUN apk add --update --no-cache bash openssh-client git
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
# Copy the current directory into the Docker image
COPY . /resources-api

# Set working directory for future use
WORKDIR /resources-api

RUN npm install -g pnpm@10.33.2
# Install the dependencies from package.json
RUN pnpm install --frozen-lockfile
RUN pnpm lint
RUN pnpm lint:fix
RUN chmod +x appStartUp.sh

CMD [ "./appStartUp.sh" ]
