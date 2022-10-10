const Clock_contract = artifacts.require("./Clock.sol");
const ClockURI_contract = artifacts.require("./ClockURI.sol");
const assert = require('assert');
const { default: BigNumber } = require('bignumber.js');

contract("BB", accounts => {

  var BN = web3.utils.BN;
  beforeEach(async() =>{
    Clock = await Clock_contract.deployed();
    ClockURI = await ClockURI_contract.deployed();
    await web3.eth.accounts.wallet.create(1)
  });
  
  it("... should deploy with less than 4.7 mil gas", async () => {
    let ClockInstance = await Clock_contract.new();
    let ClockURIInstance = await ClockURI_contract.new();
    let receipt = await web3.eth.getTransactionReceipt(ClockInstance.transactionHash);
    console.log(receipt.gasUsed);
    assert(receipt.gasUsed <= 5000000, "Gas was more than 5 mil");
  });


  it("... should deploy with less than 4.7 mil gas", async () => {
    let ClockInstance = await Clock_contract.new();
    let ClockURIInstance = await ClockSVG_contract.new();
    let receiptClock = await web3.eth.getTransactionReceipt(ClockInstance.transactionHash);
    let receiptClockURIInstance = await web3.eth.getTransactionReceipt(ClockURIInstance.transactionHash);
    console.log(`Clock gas deployement cost: ${receiptClock.gasUsed}`)
    console.log(`Clock URI gas deployement cost: ${receiptClockURIInstance.gasUsed}`)
    console.log(`Total deployement cost: ${receiptClock.gasUsed + receiptClockURIInstance.gasUsed}`)
    console.log(`Price @10Gwei: ${(receiptClock.gasUsed + receiptClockURIInstance.gasUsed)*10*10**9/(10**18)} ETH`)
    console.log(`Price @20Gwei: ${(receiptClock.gasUsed + receiptClockURIInstance.gasUsed)*20*10**9/(10**18)} ETH`)
    console.log(`Price @30Gwei: ${(receiptClock.gasUsed + receiptClockURIInstance.gasUsed)*30*10**9/(10**18)} ETH`)
    // assert(receipt.gasUsed <= 5000000, "Gas was more than 5 mil");
  });

  // it("... should mint some moonbirds", async () =>{
  //   assert(await MoonbirdTest.publicMint(9987, {from: accounts[4]}), "Could not mint a moonbird");
  // })

  // it("... should set moonbird address", async () =>{
  //   assert(await BirdBlotter.setMoonbirdAddress(MoonbirdTest.address, {from: accounts[0]}), "Could not set moonbird address");
  // })

  // it("... should not mint when not activated", async () =>{
  //   await assert.rejects(BirdBlotter.publicMint(9987, accounts[4], {from: accounts[4], value: 50000000000000000}), "Could mint more NFTs that allowed by the batch")
  //   assert(await BirdBlotter.toggleMintState(), "Could not open the drop");
  //   await assert.rejects(BirdBlotter.publicMint(9987,  accounts[3], {from: accounts[3], value: 50000000000000000}), "Could mint more NFTs that allowed by the batch")
  //   assert(await BirdBlotter.publicMint(9987, accounts[4], {from: accounts[4], value: 50000000000000000}), "Could mint more NFTs that allowed by the batch")
  // })

  // // it("... should mint only 1000 NFTs", async () =>{
  // //   for(i=1; i <= 1000; i++){
  // //     assert(await BirdBlotter.publicMint(i, {value: 50000000000000000}), "Could not mint a bird");
  // //   }
  // //   await assert.rejects(BirdBlotter.publicMint(1001, {value: 50000000000000000}), "Could mint more NFTs that allowed by the batch")
  // // })

  // // it("... should mint more NFTs after increasing the supply", async () =>{
  // //   assert(await BirdBlotter.increateSupply(), "Could not increase supply");
  // //   assert(await BirdBlotter.publicMint(1001, {value: 50000000000000000}), "Could not mint a bird");
  // // })

  // // it("... should mint more NFTs after increasing the supply", async () =>{
  // //   assert(await BirdBlotter.toggleAllMintsAllowedState(), "Could not increase supply");
  // //   assert(await BirdBlotter.publicMint(1001, {value: 50000000000000000}), "Could not mint a bird");
  // // })

  // // it("... should not mint the same NFT twice", async () =>{
  // //   await assert.rejects(BirdBlotter.publicMint(1001, {from: accounts[1], value: 50000000000000000}), "Could mint more NFTs that allowed by the batch")
  // // })

  // it("... should add Admins, including a contract", async () =>{
  //   assert(await BirdBlotter.approveAdmin(accounts[1], {from: accounts[0]}));
  // });
  
  // it("... should allow to perform tasks when admin", async () =>{
  //   assert(await BirdBlotter.adminMint(1170, accounts[2], {from: accounts[1]}), "Could not airdrop a bird");
  //   assert(await BirdBlotter.increateSupply(), {from: accounts[1]}, "Could not increase the supply");
  //   assert(await BirdBlotter.setURI('https://arweave.net/8Tbqd2a7lTiqK694CACfg5QPlu222W_k2xbQ4HfpTzI/'), {from: accounts[1]}, "Could not set URIs")
  //   assert(await BirdBlotter.toggleMintState(), {from: accounts[1]}, "Could not toggle the mint state");
  //   assert(await BirdBlotter.setRoyalties(accounts[1], 10), {from: accounts[1]}, "Could not setRoyalties")
  // })

  // it("... should allow the owner to redeem a blotter", async () =>{
  //   await assert.rejects(BirdBlotter.redeemBlotter(1170, {from: accounts[3]}), "Could redeem someoone else's blotter");
  //   assert(await BirdBlotter.redeemBlotter(1170, {from: accounts[2]}), "Could redeem its own blotter");
  // });

  // it("... should have a working URI", async () =>{
  //   let uri = await BirdBlotter.tokenURI(1170)
  //   // assert.rejects(await BirdBlotter.tokenURI(1170));
  //   console.log(uri);
  // });


  
});
