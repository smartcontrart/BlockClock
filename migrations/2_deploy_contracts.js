var Clock = artifacts.require("./Clock.sol");
var ClockURI = artifacts.require("./ClockURI.sol");
var ClockMint = artifacts.require("./ClockMint.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Clock);
  await deployer.deploy(ClockURI);
  await deployer.deploy(ClockMint);
};
