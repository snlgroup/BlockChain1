var RewardPoints = artifacts.require('RewardPoints');
var { expectThrow, expectEvent } = require('./helpers.js');

    let getCandidate = async (id) => {
        let candidate = await contract.candidates.call(id);
        let name = candidate[0];
        let votes = parseInt(candidate[1]); // convert from BN to int
        return {name: name, votes: votes};
    }

contract('RewardPoints contract Tests', async (accounts) => {
    let owner = accounts[0];
    let admin1 = accounts[1];
    let admin2 = accounts[2];
    let merchant1 = accounts[3];
    let merchant2 = accounts[4];
    let operator1 = accounts[5];
    let operator2 = accounts[6];
    let user1 = accounts[7];
    let user2 = accounts[8];
    let contract;

    //In order to call the merchant and user structures from the ReqardPoints contract I made the structures public. 
    //Once testing was complete they were made private again
    let getMerchant = async (ida) => {
        let merchant = await contract.merchants.call(ida);
        let idm = merchant[0];
        let addr = merchant[1];
        let isApproved = merchant[2]; 
        let isOperator = merchant[3];
        return {id: idm, addr: addr, isApproved: isApproved, isOperator: isOperator };
    }

    let getUser = async (idb) => {
        let user = await contract.users.call(idb);
        let idu = user[0];
        let addru = user[1];
        let isApprovedu = user[2];
        let totalEarnedPoints = parseInt(user[3]); // convert from BN to int
        let totalReedemedPoints = parseInt(user[4]); // convert from BN to int
        let merchantToEarnedPts = parseInt(user[5]);  // convert from BN to int
        let merchantToRedeemedPts = parseInt(user[6]);  // convert from BN to int
        return {id: idu, addr: addru, isApproved: isApprovedu, totalEarnedPoints: totalEarnedPoints, totalReedemedPoints: totalReedemedPoints, merchantToEarnedPts: merchantToEarnedPts, merchantToRedeemedPts: merchantToRedeemedPts };
    }

    beforeEach(async () => {
        contract = await RewardPoints.deployed();
    })


    describe('addAdmin() tests', () => {

        it('owner can add admins', async () => {
          await contract.addAdmin(admin1, { from: owner });
        })

        it('owner can add admins', async () => {
            await contract.addAdmin(admin2, { from: owner });
        })
  
        it('non owner can not add admins', async () => {
            let tx = contract.addAdmin("admin2", { from: admin1 });
            await expectThrow(tx);
        })
    })



    describe('addMerchant() tests', () => {

        it('owner can add merchant', async () => {
          await contract.addMerchant(merchant1, { from: owner });
        })

        it('non owner & non admins can not add merchants', async () => {
            let ty = contract.addMerchant(merchant2, { from: operator1 });
            await expectThrow(ty);
        })

        it('admin can add merchant', async () => {
            await contract.addMerchant(merchant2, { from: admin1});
        })

        it('merchant info check', async() => {
            let merchant = await getMerchant(1);
            assert.equal(merchant.addr, accounts[3]);
            assert.equal(merchant.isApproved, true);
        })
    })

    describe('addUser() tests', () => {

        it('owner can add user', async () => {
          await contract.addUser(user1, { from: owner });
        })

        it('non owner & non admins can not add users', async () => {
            let tz = contract.addUser(user2, { from: merchant1 });
            await expectThrow(tz);
        })

        it('admin can add user', async () => {
            await contract.addUser(user2, { from: admin1});
        })

        it('user info check', async() => {
            let user = await getUser(1);
            assert.equal(user.addru, accounts[7]);
            assert.equal(user.isApprovedu, true);
            assert.equal(user.totalEarnedPoints, 0);
            assert.equal(user.totalReedemedPoints, 0);
        })

    })

    describe('addOperator() tests', () => {

        it('merchant can add operator', async () => {
          await contract.addOperator(operator1, { from: merchant1 });
        })

        it('non merchant can not add operator', async () => {
            let ta = contract.addOperator(operator2, { from: admin1 });
            await expectThrow(ta);
        })

        it('non merchant can not add operator', async () => {
            let tb = contract.addOperator(operator2, { from: owner });
            await expectThrow(tb);
        })

        it('non merchant can not add operator', async () => {
            let tc = contract.addOperator(operator2, { from: user1 });
            await expectThrow(tc);
        })
                
        it('merchant2 can add operator2', async () => {
            await contract.addOperator(operator2, { from: merchant2 });
        })
    })

    describe('banMerchant() tests', () => {

        it('non admin can not ban merchant', async () => {
          let td = contract.banMerchant(1, { from: merchant2 });
          await expectThrow(td);
        })
      
        it('owner can ban merchant', async () => {
            await contract.banMerchant(1, { from: owner });
        })

        it('admin can ban merchant', async () => {
            await contract.banMerchant(2, { from: admin1 });
        })
    })

    describe('approveMerchant() tests', () => {

        it('non owner can not approve merchant', async () => {
          let te = contract.approveMerchant(1, { from: merchant2 });
          await expectThrow(te);
        })
      
        it('owner can ban merchant', async () => {
            await contract.approveMerchant(1, { from: owner });
        })

        it('admin can ban merchant', async () => {
            await contract.approveMerchant(2, { from: admin1 });
        })
    })


    describe('banUser() tests', () => {

        it('non admin can not ban user', async () => {
          let tf = contract.banUser(user1, { from: merchant2 });
          await expectThrow(tf);
        })
      
        it('owner can ban merchant', async () => {
            await contract.banUser(user1, { from: owner });
        })

        it('admin can ban merchant', async () => {
            await contract.banUser(user2, { from: admin1 });
        })
    })

    describe('approveUser() tests', () => {

        it('non owner can not approve merchant', async () => {
          let tg = contract.approveUser(user1, { from: merchant2 });
          await expectThrow(tg);
        })
      
        it('owner can ban merchant', async () => {
            await contract.approveUser(user1, { from: owner });
        })

        it('admin can ban merchant', async () => {
            await contract.approveUser(user2, { from: admin1 });
        })
    })


    describe('removeOperator() tests', () => {
     
        it('non relevant merchant can not remove operator', async () => {
            let ti = contract.removeOperator(operator1, { from: owner });
            await expectThrow(ti);
        })

        it('relevant merchant can remove operator', async () => {
            let tr = await contract.removeOperator(operator2, { from: merchant2 });
            await expectEvent(tr, "RemovedOperator");
        })

        it('non merchant can not remove operator', async () => {
            let th = contract.removeOperator(operator1, { from: admin1 });
            await expectThrow(th);
        })

        
    })



    describe('transferMerchantOwnership() tests', () => {

        it('non owner can not transfer mechant owenership', async () => {
          let tj = contract.transferMerchantOwnership(accounts[9], { from: owner });
          await expectThrow(tj);
        })
      
        it('merchant can transfer mechant owenership', async () => {
            let ts = await contract.transferMerchantOwnership(accounts[9], { from: merchant2 });
            await expectEvent(ts, "TransferredMerchantOwnership");
        })

        it('user info check', async() => {
            let merchant = await getMerchant(2);
            assert.equal(merchant.addr, accounts[9]);
        })
    })

    describe('rewardUser() tests', () => {

        it('non merchants or non operators cannot award points', async () => {
          let tk = contract.rewardUser(user1, 100, { from: owner });
          await expectThrow(tk);
        })

        it('only merchants can award points', async () => {
            let tl = contract.rewardUser(user1, 100, {from: merchant1});
            await expectEvent(tl, "RewardedUser");
        })

        it('only authorized operators can award points', async () => {
            let tm = contract.rewardUser(user2, 150, {from: operator1});
            await expectEvent(tm, "RewardedUser");
        })

        it('user total points should be updated', async() => {
            let user = await getUser(1);
            assert.equal(user.totalEarnedPoints, 100);
        })

        it('user merchant points should be updated', async() => {
            let user = await getUser(2);
            assert.equal(user.merchantToEarnedPts[1], 150);
        })

    })

    describe('redeemPoints() tests', () => {

        it('non user cannot redeem points', async () => {
          let tn = contract.redeemPoints(1, 40, { from: owner });
          await expectThrow(tn);
        })

        
        it('user can redeem points', async () => {
            let tp = contract.redeemPoints(1, 40, {from: user1});
            await expectEvent(tp, "RedeemedPoints");
        })

        it('user total points should be updated', async() => {
            let user = await getUser(1);
            assert.equal(user.totalEarnedPoints, 60);
        })

        it('user merchant points should be updated', async() => {
            let user = await getUser(1);
            assert.equal(user.merchantToEarnedPts[1], 60);
        })

    })


    describe('removeAdmin() tests', () => {

        it('owner can add admins', async () => {
          await contract.removeAdmin(admin1, { from: owner });
        })

        it('non owner can not add admins', async () => {
            let tq = contract.removeAdmin(admin2, { from: admin1 });
            await expectThrow(tq);
        })
    })

  })