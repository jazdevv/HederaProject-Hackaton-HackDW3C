// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Lottery.sol";

contract FactoryContract {
    event eventAllContracts(string indexed val,address contractAddr,string name, address creator,uint typeContract);

    //lottery factory admin
    uint public percentageFees;
    address public adminAddr;
    address public creator;

    //created lotteries
    address[] public createdLoteries;
    //contracts of created Lotteries of every User
    mapping(address=>address[]) userContracts;
    

    constructor(){
        creator = msg.sender;
        adminAddr = msg.sender;
        percentageFees = 5;
    
    }

    function deployLotteryContract(uint miniumAmount, uint lotteryTypeVal, string memory name, string memory description,string memory linkCreator,
                                    uint feesCreator,string[] memory _prizesRaffle,uint[] memory _prizesLottery)
    public payable returns(address)
    {
        if(lotteryTypeVal==0){
            require(feesCreator<=5);
        }else if(lotteryTypeVal==1){
            require(feesCreator==95);
        }else{
            require(feesCreator<=5);

        }
        
        LotteryContract newLottery = new LotteryContract(
            msg.sender,
            miniumAmount,
            lotteryTypeVal,//0 money 1 prizes
            name,
            description,
            linkCreator,
            percentageFees,
            feesCreator,
            adminAddr,
            _prizesRaffle,
            _prizesLottery
        );
        address addr = address(newLottery);
        userContracts[msg.sender].push(addr);
        createdLoteries.push(addr);
        emit eventAllContracts("contracts",addr,name,msg.sender,lotteryTypeVal);
        return address(addr);
    }

    function getUserContracts(address _user)public view returns(address[] memory messageOut){
        
        return userContracts[_user];
    }

    function getContracts()public view returns(address[] memory messageOut){
        return createdLoteries;
    }
}