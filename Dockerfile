FROM node:14-alpine3.14

WORKDIR /user/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/main.js"]