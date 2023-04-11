// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Lottery.sol";

contract LotteryFactory {
    //lottery factory admin
    uint public percentageFees;
    address public adminAddr;
    address public creator;

    //created lotteries
    address[] public createdLoteries;
    
    // struct LotteryData{
    //     address addr;
    //     string name;
    //     string description;
    //     address creator'
    // }
    constructor(uint initialFeesValue){
        creator = msg.sender;
        adminAddr = msg.sender;
        require(initialFeesValue < 100);
        percentageFees = initialFeesValue;
    
    }

    function deployLotteryContract(uint miniumAmount, uint lotteryTypeVal, string memory name, string memory description,string memory linkCreator,uint feesCreator)
    public payable returns(address ,string memory,string memory,address)
    {
        require(feesCreator<=5);
        LotteryContract newLottery = new LotteryContract(
            msg.sender,
            miniumAmount,
            lotteryTypeVal,//0 money 1 prizes
            name,
            description,
            linkCreator,
            percentageFees,
            feesCreator,
            adminAddr
        );
        address addr = address(newLottery);
        createdLoteries.push(addr);
        return (address(addr),name,description,msg.sender);
    }

    function changeAdmin(address newAdmin)public {
        require(msg.sender==adminAddr);
        adminAddr = newAdmin;
    }

}