# Invitédex

Little guests list using a Pokédex style and 1G / 2G sprites from [Spriters resource](https://www.spriters-resource.com/game_boy_gbc/pokemonredblue/).

## Requirements
To use this project, make sure you are using the following:

- PHP >= 7.3
- Node >= 16
- Composer
- Notion account and an API access (https://developers.notion.com)

## Install & launch
> :warning: This project does not provide any form of authentication. If you want one, you can use NGINX / Apache basic or implement it yourself using [Laravel Breeze](https://laravel.com/docs/9.x/starter-kits) or anything else.

- Copy `.env.example` to `.env`
- Launch `composer install`
- Launch `php artisan key:generate`
- Launch `npm run dev`
- Launch `php artisan serve`
- Access app using  `http://127.0.0.1:8000`

## Notion structure
To make it work, you need to use the following structure to your Notion database (list view):

- <Text> description
- <Text> sprite
- <Text> coordinates
- <Text> relation
- <Number> order

> :warning: The coordinates field is for sprite section. Ex, for a guest with Major Bob 1G sprite, the value is 0,2

## Disclaimer
This application doesn't collect information from users because, by default, their is not database or user. The cookies are just framework internals and can't be used to track anyone.