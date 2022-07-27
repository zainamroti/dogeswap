import { ChainId, Token } from "@dogeswap/sdk-core";

export type ChainTokens<T extends string = string> = { [chainId in ChainId]: Token<T> };
export type ChainContracts = { [chainId in ChainId]: string };

interface InfrastructureAddress {
    factory: string;
    router: string;
    multicall: string;
    ensRegistrar: string;
}

export const addresses = {
    [ChainId.MAINNET]: {
        infrastructure: {
            factory: "0x0000000000000000000000000000000000000000",
            router: "0x0000000000000000000000000000000000000000",
            multicall: "0x0000000000000000000000000000000000000000",
            ensRegistrar: "0x0000000000000000000000000000000000000000",
        } as InfrastructureAddress,
        tokens: {
            wdc: "0x0000000000000000000000000000000000000000",
        },
    },
    [ChainId.TESTNET]: {
        infrastructure: {
            factory: "0x0000000000000000000000000000000000000000",
            router: "0x0000000000000000000000000000000000000000",
            multicall: "0x0000000000000000000000000000000000000000",
            ensRegistrar: "0x0000000000000000000000000000000000000000",
        } as InfrastructureAddress,
        tokens: {
            wdc: "0x0000000000000000000000000000000000000000",
        },
    },
    [ChainId.LOCALNET]: {
        infrastructure: {
            factory: "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1",
            router: "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44",
            multicall: "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f",
            ensRegistrar: "0x0000000000000000000000000000000000000000",
        } as InfrastructureAddress,
        tokens: {
            dst: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            usdt: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
            usdc: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
            dai: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
            wdc: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        },
    },
};

export const getAddress = (address: keyof InfrastructureAddress, chainId: ChainId | undefined) => {
    return chainId == undefined ? undefined : addresses[chainId]?.infrastructure?.[address];
};
