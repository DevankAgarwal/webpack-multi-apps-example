# Getting Started

## Dependencies

What you need to run this app:
* `node`, `npm` and `yarn`
* Ensure you're running Node (`v5.10.x`+) and NPM (`2.14.x`+)

## Installing

* `fork` this repo
* `clone` your fork
* `yarn` to install all dependencies

## Adding a new app

* Create folder for new app in /src, say {new-app}
* Create a file index.js, which will act as the entry point for the application
* Add the reference of this new project's file in paths.json
```
{new-app}: {
    "entry": "./src/{new-app}/index.js"
}
```
* Add {new-app} against app key in paths.json also so that this new app now act as default app for developement serving and building production app

## Running the app

After you have installed all dependencies you can now run the app with:
```bash
yarn start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:8080`.

## Developing

### Build files

* single run: `yarn build`
* build files and watch: `yarn start`

### Adding dependencies
* development dependencies: `yarn add <dep> -D`
* production dependencies: `yarn add <dep>`

## Testing

#### 1. Unit Tests

* single run: `yarn test`
* live mode (TDD style): `yarn test-watch`
