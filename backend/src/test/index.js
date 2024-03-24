import { expect, it, describe, beforeAll } from "@jest/globals";
import { ethers } from "ethers";


describe("fetch", () => {
    const TEST_TIMEOUT = 30000
    // const fetch2test = fetch

    beforeAll(() => {
        const provider = ethers.getDefaultProvider("http://localhost:8080");
        const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
        let signer = new ethers.Wallet(privateKey, provider);
        fetch2test = Cartesify.createFetch({
            dappAddress: '0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C',
            endpoints: {
                graphQL: new URL("http://localhost:8080/graphql"),
                inspect: new URL("http://localhost:8080/inspect"),
            },
            provider,
            signer,
        })
    })

    
    it("should work with POST", async () => {
        const response = await fetch2test("http://127.0.0.1:8383/echo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ any: 'body' })
        })
        expect(response.ok).toBe(true)
        const json = await response.json();
        expect(json).toEqual({ myPost: { any: "body" } })
    }, TEST_TIMEOUT)
})