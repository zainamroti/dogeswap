import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/config";
import "./scripts/hardhat-tasks";

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true,
        },
        testnet: {
            url: "https://rpc-testnet.dogechain.dog",
            chainId: 568,
            allowUnlimitedContractSize: true,
        },
    },
};

export default config;
