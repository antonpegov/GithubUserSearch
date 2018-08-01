# GITHUB USER SEARCH

Search Github users with pleasure

## Basic scripts

Use `yarn start` for dev server. Default dev port is `3000`.

Use `yarn run start:hmr` to run dev server in HMR mode.

Use `yarn run build` for production build.

Use `yarn run build:github` for production build to /docs folder and proper base href.

Default ports and option to use proxy backend for dev server can be changed in `constants.js` file.

To create AOT version, run `yarn run build:aot`. This will compile and build script.
Then you can use `yarn run prodserver` to see to serve files.

### Store Logger

Store-logger outputs ngrx actions to the console.
To set your development mode store logging preference, go to the constant.js file and edit the `STORE_DEV_TOOLS` constant.
Available options are `logger | none`
