// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./NFTCreator.sol";

contract LotteryContract is NFTCreator {

    event eventcontractData(string indexed val,address creator,string  lotteryName,string  lotteryDescription,uint miniumAmountParticipate,
                                            uint amount,uint participationsAmount,string  status);


    struct Winner {
        address nftAdress;
        int NFTserialNumber;
        address addresRecivePrize;
        string email;
        string socialMedia;
        bool receivedPrize; 
        bool winner; //true
    }


    modifier restrictedCreator(){
        require(msg.sender==creator);
        _;
    }

    modifier restrictedMod(){
        require(msg.sender==admin);
        _;
    }


    modifier typePrizesLottery(){
        require(lotteryType==LotteryTypes.PRIZES,"this type of contract cant execute this func");
        _;
    }
    
    //lottery admin information
    address public admin; //Have the function of send money to the owner if the winners have not set the receivedPrize
    address public creator;
    

    //lottery public information set by constructor
    string public LotteryName;
    string public LotteryDescription;
    string public linkCreator;
    uint public miniumAmountParticipate;//if there is a minium to participate
    uint public percentageFees; 
    uint public percentageFeesCreator;
    uint public feesAmount; //count fees
    uint public feesAmountCreator;
    uint public amount;
    enum LotteryTypes{MONEY,PRIZES}
    LotteryTypes public lotteryType;
    

    //lottery tecnical data mainly managed by smart contract
    string lotteryStatus; //"ongoing","finished"
    uint public participationsAmount;
    address public tokenNFT;
    address[] public mintedNFT;
    mapping(address => Winner) public DataWinnersNFT;//contains data of each winners NFT
    address[] public WinnersNft; //Array that contains the different winners
    string[] public prizesRaffle;
    uint[] public prizesLottery;
    bool availableTakeFees;
    

    constructor(
        address creatorAdd,
        uint miniumAmount,
        uint lotteryTypeVal,//if statement cannot compare strings, hardcode from frontend to send int instead of lotteryType 
        string memory name,
        string memory description,
        string memory link,
        uint fees,
        uint feesCreator,
        address givenAdmin,
        string[] memory _prizesRaffle,
        uint[] memory _prizesLottery
    )
    {
        
        creator = creatorAdd;
        miniumAmountParticipate = miniumAmount;
        LotteryName = name;
        LotteryDescription = description;
        linkCreator = link;
        percentageFees = fees;
        percentageFeesCreator = feesCreator;
        admin = givenAdmin;
        lotteryStatus = "ongoing";


        //define lottery type
        if(lotteryTypeVal==0){
            lotteryType = LotteryTypes.MONEY;
            prizesLottery = _prizesLottery;
        }else if(lotteryTypeVal==1){
            lotteryType = LotteryTypes.PRIZES;
            prizesRaffle = _prizesRaffle;
        }else{
            lotteryType = LotteryTypes.MONEY;
            prizesLottery = _prizesLottery;
        }
        
        emit eventcontractData("contractdata",creatorAdd,name,description,miniumAmount,0,0,"ongoing");
        
    }

    function takeFees(uint sendedAmount) private returns(uint){
        //take administration fees
        feesAmount = feesAmount + ((sendedAmount * percentageFees)/100); //take % of sendedAmount
        //take fees for the creator;
        feesAmountCreator = feesAmountCreator + ((sendedAmount * percentageFeesCreator)/100);//take % of sendedAmount
        //amount without fees
        uint amountWithoutFees = sendedAmount - ((sendedAmount * percentageFees)/100) - ((sendedAmount * percentageFeesCreator)/100); 

        return amountWithoutFees;
    } 

    function sendFeesToAdmins(address payable sendTo) public restrictedMod{
        sendTo.transfer(feesAmount);
    }

    function sendFeesToCreator(address payable sendTo) public restrictedCreator{
        require(availableTakeFees);
        sendTo.transfer(feesAmountCreator);
    }
    
    function adminMoveFeesToCreator(uint amountTransfer,address payable sendTo) public restrictedMod {
        sendTo.transfer(amountTransfer);
    }

    function addInitialAmount()public payable restrictedCreator{
        uint amountWithoutFees = takeFees(msg.value);
        
        amount = amount + amountWithoutFees;
    }

    // function getContractData()public view returns(address _creator,string memory _lotteryName,string memory _lotteryDescription,uint _miniumAmountParticipate,
    //                                         uint _amount,uint _participationsAmount,string memory _status,string[] memory _prizesRaffle, 
    //                                         uint[] memory _prizesLottery,address[] memory _winnersNFT){
       
    //     return (creator,LotteryName,LotteryDescription,miniumAmountParticipate,amount,participationsAmount,lotteryStatus,prizesRaffle,prizesLottery,WinnersNft);
    // }

    function joinLottery() public payable{
        //CHECK IF USER PAYED THE AMOUNT TO JOIN

        //MINT AN NFT AS LOTTERY TICKET

        //SEND THE NFT TO THE USER
    }

    function chooseWinner() public{
        //CHOOSE THE WINNER NFT
        lotteryStatus = "finished";
    }

    function winnerAddContactInfo(address addressNFT,int serialNumberNFT) public typePrizesLottery{
        //CHECK IF HE IS THE OWNER OF THE NFT HE IS ASKING TO CLAIM

        //ADD CONTACT INFO
    }

    function getPrizesRaffle() public view returns(string[] memory ){
        return prizesRaffle;
    }
    function getPrizesLottery() public view returns(uint[] memory ){
        return prizesLottery;
    }

    
    
}