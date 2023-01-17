const { ethers } = require("hardhat")

async function main() {
    // Upgrade!
    // Not "the hardhat-deploy way"
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    const transparentProxy = await ethers.getContract("Box_Proxy")

    const proxyBox = await ethers.getContractAt("Box", transparentProxy.address)
    const version1 = await proxyBox.version()
    console.log(`Version before the upgrade: ${version1.toString()}`)

    const boxV2 = await ethers.getContract("BoxV2")
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address)
    await upgradeTx.wait(1)

    const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address)
    const version2 = await proxyBoxV2.version()
    console.log(`Version after the upgrade: ${version2.toString()}`)
    console.log("----------------------------------------------------")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
