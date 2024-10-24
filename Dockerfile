FROM node:lts-alpine3.19 AS builder

WORKDIR /app

COPY package*.json ./

RUN HUSKY=0 yarn install

COPY . .

RUN yarn build

FROM nginx:1.27.1-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]