FROM php:8.0-fpm-alpine

RUN apk update && apk upgrade

# Install extensions
RUN apk add --no-cache --update curl-dev icu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pdo_mysql intl;

RUN mkdir -p /opt/int && chmod -R 777 /opt/int;
USER www-data

WORKDIR /opt/app
