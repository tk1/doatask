FROM node:16.3-alpine3.13 As development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16.3-alpine3.13 as production

ENV NODE_ENV=production
ENV POSTGRES_ON_LOCALHOST=false

WORKDIR /app

COPY package*.json ./

# NODE_ENV is production, so npm installs no devDependencies
RUN npm install

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]