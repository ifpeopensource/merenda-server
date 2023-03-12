FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Read the environment variables
ARG DATABASE_URL

ARG JWT_SECRET

ARG EMAIL_SERVICE
ARG EMAIL_USER
ARG EMAIL_PASS
ARG EMAIL_HOST
ARG EMAIL_PORT

ARG DEFAULT_ADMIN_EMAIL
ARG DEFAULT_ADMIN_PASSWORD

ARG WEBAPP_HOST=http://localhost:5173

# Set Environment Variables
ENV DATABASE_URL=$DATABASE_URL

ENV JWT_SECRET=$JWT_SECRET

ENV EMAIL_SERVICE=$EMAIL_SERVICE
ENV EMAIL_USER=$EMAIL_USER
ENV EMAIL_PASS=$EMAIL_PASS
ENV EMAIL_HOST=$EMAIL_HOST
ENV EMAIL_PORT=$EMAIL_PORT
ENV EMAIL_SERVICE=$EMAIL_SERVICE

ENV DEFAULT_ADMIN_EMAIL=$DEFAULT_ADMIN_EMAIL
ENV DEFAULT_ADMIN_PASSWORD=$DEFAULT_ADMIN_PASSWORD

ENV WEBAPP_HOST=$WEBAPP_HOST

# Copy the prisma folder to avoid generating the client on every build
COPY prisma ./prisma

# Install dependencies
RUN apk update && apk add --no-cache \
  build-base \
  g++ \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  bash \
  imagemagick

RUN npm ci

# Disable Prisma ERD generation
ENV DISABLE_ERD=true
# Generate prisma client
RUN npm run prisma:generate:no-erd

# Copy the rest of the source code
COPY . .

# Expose server port
EXPOSE 3000

# Start the server and migrate the database
CMD [ "npm", "run", "start:migrate:prod" ]
