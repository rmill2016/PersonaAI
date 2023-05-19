# React Chrome Extension Template: Side Panel

A simple [React](https://reactjs.org/) implementation of a Chrome Extension Template for a foldable side panel. Using [Parcel](https://parceljs.org/), [TailwindCSS](https://tailwindcss.com/) and [TypeScript](https://www.typescriptlang.org/) for development. Optimized to fit most of the modern webpage and save setting to chrome storage.

---

## Development

```bash
# clone the repo
git clone https://github.com/rmill2016/PersonaAI/tree/master/leadpersona-extension && cd leadpersona-extension

# install needed package
yarn
# add logo under /public/manifest.json
# for local test
yarn start
# then open localhost:1234

# build the extension
yarn build

# lint extension
yarn lint

# build tailwindCSS files
yarn style:watch
```

---

## Installation

- After build process, open Chrome or any chromium based browser
- Go to manage extension page
- Toggle `Developer mode`
- Choose Load unpacked option for `/publish` folder or unzip latest [release](https://github.com/rmill2016/PersonaAI/releases) file.

---

## Credits

Credit to Vincecao for the amazing chrome extension template!
