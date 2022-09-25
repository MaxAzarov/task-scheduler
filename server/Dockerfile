FROM node:16-alpine

RUN npm install --location=global --force yarn

WORKDIR /app


# COPY package.json ./
# COPY tsconfig.json ./
# COPY yarn.lock ./
COPY . .

RUN yarn \
&& yarn build \
&& yarn cache clean --force


ENV NODE_ENV=production

EXPOSE 5000

CMD ["yarn","start"]