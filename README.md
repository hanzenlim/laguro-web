[![Build Status](https://semaphoreci.com/api/v1/projects/a3855047-87c5-431b-9b73-d0e9f2e6506a/2034783/badge.svg)](https://semaphoreci.com/laguro/laguro)

# How to run local dev
1. Run `npm i` in `/laguro` folder
2. Run `npm i` in `/laguro/client` folder
3. Run webpack dev server `npm run dev`

# Notes
- If you run an into an issue where you have multiple copies of `react` or `styled-components` getting loaded, run these following commands inside the client folder:
```
react
rm -r ./node_modules/\@laguro/basic-components/node_modules/react;

styled-components
rm -r ./node_modules/\@laguro/basic-components/node_modules/styled-components;
```
