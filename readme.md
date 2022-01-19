# Create React Web or/and Native library

![AppVeyor](https://img.shields.io/appveyor/build/mr-ristic/create-rnw-library)
![npm](https://img.shields.io/npm/v/create-rnw-library)

CLI which allows creating libraries for web and React Native applications.

Code sharing is important, thus React Native and Web.

The Cli will create template project for your library with typescript, storybook, jest and linters out of the box.

This bootsraped library can be used both in React and React Native projects, ideally for libraries that need to share code between apps (eg ui-kit).

## Install

In order to run node must be v14 or higher

```bash
npm i -g create-rnw-library
```

## Create new module

Run the following command in the desired destination:

```bash
create-rnw-library
```

Answer to the prompts and your module is ready, with the selected template, installed dependencies nad git initiated.

## Development

When working with your moudle created from the template, storybook is already installed and can be used form the start:

```bash
yarn storybook
```

Or if you want to see how to import it in the other apps you can in the root of your module:

```javascirpt
yarn build
```

and in the new tab:

```bash
cd example;
yarn start
```

## License

MIT © [Marko Ristic](https://github.com/mr-ristic)
