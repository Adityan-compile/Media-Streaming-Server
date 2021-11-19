FROM ubuntu

RUN \
    apt-get update && \
    apt-get install -y \
    nginx \
    nodejs \ 
    npm && \
    ufw allow 'Nginx HTTP' && \
    ufw enable

RUN \
    npm install --production && \
    npm run build

EXPOSE 80

COPY build /var/www/html/