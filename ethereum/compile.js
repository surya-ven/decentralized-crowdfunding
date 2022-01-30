if (process.env.NODE_ENV !== "production") require("dotenv").config();

// compile code will go here
const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

// Remove existing build
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// Change contract here
const CONTRACT = `${process.env.CONTRACT_NAME}`;

const CONTRACT_SOL = `${CONTRACT}.sol`;

// Read contract
const contractPath = path.resolve(__dirname, "contracts", CONTRACT_SOL);
const source = fs.readFileSync(contractPath, "utf8");

// Build contract

const input = {
    language: "Solidity",
    sources: {
        // source will go here
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            }
        }
    }
};

// Insert source into input
input.sources[CONTRACT_SOL] = { content: source };

// Compile contract
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[CONTRACT_SOL];

// Ensure build directory exists otherwise create it
fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, `${contract}.json`),
        output[contract]
    );
}

// console.log(JSON.stringify(JSON.parse(solc.compile(JSON.stringify(input))).contracts[CONTRACT_SOL][CONTRACT].abi));

// module.exports = JSON.parse(solc.compile(JSON.stringify(input)))
//                     .contracts[CONTRACT_SOL][CONTRACT];