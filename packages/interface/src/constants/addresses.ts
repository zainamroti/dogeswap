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
            factory: "0xA44372D280E1959662541782Aefa7f8972BC85B8",
            router: "0x4967c8614B929D4d8040C65e072B9BCc422f1EF9",
            multicall: "0x63f1ae4757661390DE9E75c26962c5cC31C4D5F1",
            ensRegistrar: "0x0000000000000000000000000000000000000000",
        } as InfrastructureAddress,
        tokens: {
            wdc: "0xf6FCb597701f5207122Da5902AD5Fec6a2Cb6608",
            usdt: "0x5b5E34d03b1533877E23F68622f642ECb721B918",
            usdc: "0x1D0DD931c0101ba58bDB312e5416C5f8330c194D",
        },
    },
    [ChainId.LOCALNET]: {
        infrastructure: {
            factory: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
            router: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
            multicall: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
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
