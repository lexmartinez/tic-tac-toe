# tic-tac-toe
:space_invader: An Angular implementation of Tic Tac Toe for two players (online) using Pusher : [#100DaysOfCode](http://100daysofcode.com/)

## Build Setup

``` bash
# install dependencies
$ npm install

# development server at localhost:4200
$ npm start

# bundle app
$ npm run build

```

> To emit events to pusher we need to use a simple **NodeJS** server, in order to run it use the command `npm run server`.

## Environment
For pusher connection following environment variables must be configured into `.env` file located at project root (with your own values)

```bash
PUSHER_APP_ID=545346574
PUSHER_APP_KEY=867564392204459023343
PUSHER_APP_SECRET=b434mnm45n3j28fad
PUSHER_APP_CLUSTER=us2
```````

## Screenshots

![](https://github.com/lexmartinez/tic-tac-toe/raw/master/src/assets/screenshot-1.png) 

## License

This project is licensed under MIT License - see the [LICENSE.md](https://github.com/lexmartinez/tic-tac-toe/blob/master/LICENSE.md) file for details

> This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.2. To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

