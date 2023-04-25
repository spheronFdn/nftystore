<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/spheronFdn/nftystore/blob/main/.github/spheron-logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/spheronFdn/nftystore/blob/main/.github/spheron-logo.svg">
    <img alt="Spheron" src="https://github.com/spheronFdn/nftystore/blob/main/.github/spheron-logo.svg" width="250">
  </picture>
</p>

<h2 align="center">Nftystore</h2>

<p align="center">
  🚀 Upload your NFT collection assets faster via Spheron multi-chain upload!
</p>

<p align="center">
  <a href="https://github.com/spheronFdn/nftystore/blob/main/LICENSE" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=green" />
  </a>
  <a href="https://discord.com/invite/ahxuCtm" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/static/v1?label=community&message=discord&color=blue" />
  </a>
  <a href="https://twitter.com/SpheronFdn" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40SpheronFdn" />
  </a>
</p>

## Installation
### Frontend
You can follow these steps to setup the frontend:

**Using NPM**
- Clone this repo: `https://github.com/spheronFdn/nftystore.git`
- Go inside the `frontend` directory
- Run `npm i` to install dependencies
- Start Nftystore
  ```
  npm start
  ```
  
**Using Yarn**
- Clone this repo: `https://github.com/spheronFdn/nftystore.git`
- Go inside the `frontend` directory
- Run `yarn` to install dependencies
- Start Nftystore
  ```
  yarn start
  ```

You can access the frontend at: [http://localhost:3000](http://localhost:3000)

---

### Server
You can follow these steps to setup the server:

**Using NPM**
- Clone this repo: `https://github.com/spheronFdn/nftystore.git`
- Go inside the `server` directory
- Run `npm i` to install dependencies
- Create a .env file in the server directory with the following configuration:
  ```
  HOSTING_API_HOST_ADDRESS=https://api-v2.spheron.network
  API_TOKEN=xxxx
  UI_URL=http://localhost:3000
  ```
- Start the server
  ```
  npm run dev
  ```
  
**Using Yarn**
- Clone this repo: `https://github.com/spheronFdn/nftystore.git`
- Go inside the `server` directory
- Run `yarn` to install dependencies
- Create a .env file in the server directory with the following configuration:
  ```
  HOSTING_API_HOST_ADDRESS=https://api-v2.spheron.network
  API_TOKEN=xxxx
  UI_URL=http://localhost:3000
  ```
- Start the server
  ```
  yarn dev
  ```
  
 You can access the server at: [http://localhost:8088](http://localhost:8088)

## Contribution
We encourage you to read the [contribution guidelines](https://github.com/spheronFdn/nftystore/blob/main/.github/contribution-guidelines.md) to learn about our development process and how to propose bug fixes and improvements before submitting a pull request.

The Spheron community extends beyond issues and pull requests! You can support Spheron [in many other ways](https://github.com/spheronFdn/nftystore/blob/main/.github/support.md) as well.

## Community
For help, discussions or any other queries: [Join us on Discord](https://discord.com/invite/ahxuCtm)
