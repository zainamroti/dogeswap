import { AddressZero } from "@ethersproject/constants";
import chai, { expect } from "chai";
import { createFixtureLoader, MockProvider, solidity } from "ethereum-waffle";
import { BigNumber, Contract } from "ethers";

import { factoryFixture } from "./shared/fixtures";
import { getCreate2Address } from "./shared/utilities";

import DogeSwapV2Pair from "../artifacts/contracts/DogeSwapV2Pair.sol/DogeSwapV2Pair.json";

chai.use(solidity);

const TEST_ADDRESSES: [string, string] = [
    "0x1000000000000000000000000000000000000000",
    "0x2000000000000000000000000000000000000000",
];

describe("DogeSwapV2Factory", () => {
    const provider = new MockProvider({
        ganacheOptions: {
            hardfork: "istanbul",
            mnemonic: "horn horn horn horn horn horn horn horn horn horn horn horn",
            gasLimit: 9999999,
        },
    });
    const [wallet, other] = provider.getWallets();
    const loadFixture = createFixtureLoader([wallet, other], provider);

    let factory: Contract;
    beforeEach(async () => {
        const fixture = await loadFixture(factoryFixture);
        factory = fixture.factory;
    });

    it("feeTo, feeToSetter, allPairsLength", async () => {
        expect(await factory.feeTo()).to.eq(AddressZero);
        expect(await factory.feeToSetter()).to.eq(wallet.address);
        expect(await factory.allPairsLength()).to.eq(0);
    });

    async function createPair(tokens: [string, string]) {
        const bytecode = DogeSwapV2Pair.bytecode;
        const create2Address = getCreate2Address(factory.address, tokens, bytecode);
        await expect(factory.createPair(...tokens))
            .to.emit(factory, "PairCreated")
            .withArgs(TEST_ADDRESSES[0], TEST_ADDRESSES[1], create2Address, BigNumber.from(1));

        await expect(factory.createPair(...tokens)).to.be.reverted; // DogeSwapV2: PAIR_EXISTS
        await expect(factory.createPair(...tokens.slice().reverse())).to.be.reverted; // DogeSwapV2: PAIR_EXISTS
        expect(await factory.getPair(...tokens)).to.eq(create2Address);
        expect(await factory.getPair(...tokens.slice().reverse())).to.eq(create2Address);
        expect(await factory.allPairs(0)).to.eq(create2Address);
        expect(await factory.allPairsLength()).to.eq(1);

        const pair = new Contract(create2Address, JSON.stringify(DogeSwapV2Pair.abi), provider);
        expect(await pair.factory()).to.eq(factory.address);
        expect(await pair.token0()).to.eq(TEST_ADDRESSES[0]);
        expect(await pair.token1()).to.eq(TEST_ADDRESSES[1]);
    }

    it("createPair", async () => {
        await createPair(TEST_ADDRESSES);
    });

    it("createPair:reverse", async () => {
        await createPair(TEST_ADDRESSES.slice().reverse() as [string, string]);
    });

    it("createPair:gas", async () => {
        const tx = await factory.createPair(...TEST_ADDRESSES);
        const receipt = await tx.wait();
        expect(receipt.gasUsed).to.eq(2005247);
    });

    it("setFeeTo", async () => {
        await expect(factory.connect(other).setFeeTo(other.address)).to.be.revertedWith("DogeSwapV2: FORBIDDEN");
        await factory.setFeeTo(wallet.address);
        expect(await factory.feeTo()).to.eq(wallet.address);
    });

    it("setFeeToSetter", async () => {
        await expect(factory.connect(other).setFeeToSetter(other.address)).to.be.revertedWith("DogeSwapV2: FORBIDDEN");
        await factory.setFeeToSetter(other.address);
        expect(await factory.feeToSetter()).to.eq(other.address);
        await expect(factory.setFeeToSetter(wallet.address)).to.be.revertedWith("DogeSwapV2: FORBIDDEN");
    });
});
