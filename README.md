# TikTok Scraper

Project link - https://github.com/dzimiks/fon-social-media-data-analysis.  
Presentation link - https://docs.google.com/presentation/d/1udlogZIFjm2uxZfUTE2s1a0XM9NzzJ0RzUnpMPgmOhI/edit?usp=sharing.

## 1. Installation & Project Setup

You can download the project using git command: `git clone https://github.com/dzimiks/fon-social-media-data-analysis.git`. Then run `yarn install` inside the root of the project.

- [Node.js LTS](https://nodejs.org/en/download) - Download the Node.js source code or a pre-built installer for your platform, and start developing today.
- [npx](https://www.npmjs.com/package/npx) - `npm install -g npx`
- [yarn](https://yarnpkg.com/getting-started/install) - `npm install -g yarn`
- Create project: `npx create-react-app fon-social-media-data-analysis`
- Go to project directory: `cd fon-social-media-data-analysis`
- Run project: `yarn start`
- If directory `node_modules` is missing, try to run command `yarn install`

## 2. Install Dependencies

Run command: `yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome franc tiktok-scraper` to install dependencies.

- [fortawesome](https://github.com/FortAwesome/react-fontawesome) - Font Awesome 5 React component using SVG with JS.
- [franc](https://www.npmjs.com/package/franc) - Detect the language of text.
- [tiktok-scraper](https://www.npmjs.com/package/tiktok-scraper) - Scrape and download useful information from TikTok.

## 3. Create Basic Scraper Script

Inside the directory **scripts** create a file `scraper.js`. You can run it with a command: `node scraper.js`.
