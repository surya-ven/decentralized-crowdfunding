# Decentralised Crowdfunding Platform
Decentralized crowdfunding platform made using Solidity, NextJS, React, and TailwindCSS.

### Note:
Code was generated as part of the Ethereum and Solidity course by Steven Grider on Udemy.

Changes: the course was quite dated, therefore, I've used the most recent versions of modules and adopted the code to match, made the components more modular, used Tailwind CSS, and functional components.

It is not optimised for production and thus won't contain instructions for deployment. 

## Installing the project in dev mode:
1. Update your env variables, INFURA_URL (infura provider url), PNEUMONIC (your pneumonic for metamask), NODE_ENV=development, and CONTRACT_NAME (the name of your contract without the .sol suffix)
2. Run `node ethereum/compile` from the root directory - this will create a build folder within the ethereum folder
3. Run `node ethereum/deploy` from the root directory and copy the contract address from the terminal
4. Within ethereum/campaignFactory.js, replace the string "ENTER CONTRACT ADDRESS HERE" with your deployed contract address
5. Within ethereum/web3.js, replace the string "ENTER YOUR INFURA PROVIDER URL HERE" with the same infuar provider url as the INFURA_URL .env variable
Note: .env variables weren't used for these variables to speed up development
6. Run `npm run dev` and you should see the project appear in a localhost port indicated by the Nextjs terminal


