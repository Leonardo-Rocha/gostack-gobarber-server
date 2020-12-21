# FROM node:14-alpine

# # Create app directory
# WORKDIR /usr/src/app
# COPY package.json ./
# COPY yarn.lock ./

# RUN yarn

# # Bundle app source
# COPY . .

# EXPOSE 3333
# EXPOSE 5432

# CMD yarn dev:server
