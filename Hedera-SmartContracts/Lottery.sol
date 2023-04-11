// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./NFTCreator.sol";

contract LotteryContract is NFTCreator {

    struct Winner {
        address nftAdress;
        address addresRecivePrize;
        string email;
        string socialMedia;
        bool receivedPrize;
        bool startRecivingPrice;
    }


    modifier restrictedCreator(){
        require(msg.sender==creator);
        _;
    }

    modifier restrictedMod(){
        require(msg.sender==admin);
        _;
    }

    modifier typeMoneyLottery(){
        require(lotteryType==LotteryTypes.MONEY,"this type of contract cant execute this func");
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
    uint public initialAmount;
    uint public amount;
    enum LotteryTypes{MONEY,PRIZES}
    LotteryTypes public lotteryType;
    

    //lottery tecnical data mainly managed by smart contract
    string lotteryStatus; //"ongoing","finished"
    uint public participationsAmount;
    address public tokenNFT;
    address[] public mintedNFT;
    mapping(address=>address) public eachUserTickets;
    Winner[] public winnersNFT;//???mapping instead
    string[] public prizes;
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
        address givenAdmin
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
        }else if(lotteryTypeVal==1){
            lotteryType = LotteryTypes.PRIZES;
        }else{
            lotteryType = LotteryTypes.MONEY;
        }
        

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
        //initial amount
        initialAmount = initialAmount + amountWithoutFees;
        //contract amount
        amount = amount + amountWithoutFees;
    }

    function joinLottery() public payable{
        //CHECK IF USER PAYED THE AMOUNT TO JOIN

        //MINT AN NFT AS LOTTERY TICKET

        //SEND THE NFT TO THE USER
    }

    function chooseWinner() public{
        //CHOOSE THE WINNER NFT
        lotteryStatus = "finished";
    }

    // function getParticipants() public view returns(address[]){
    //     //WHO IS PARTICIPATING
    // }


    //-----------IDEA-----------
    function isWinner() public {
        //CHECK WHAT NFT THE OWNER HAVE

        //DOES THEM MATCH WITH ONES OF THE ARRAY?

        //RETURN BOOLEAN
    }
    function receivePrize() public {
        //CHECK WHAT NFT THE OWNER HAVE

        //ADD OWNER ADDRESS nf winner --> participant info

        //SEND THE PRIZE AMOUNT OF MONEY TO THE WINNER ADDRESS IF THATS THE TYPE OF LOTTERY
    }

    function winnerAddContactInfo() public typePrizesLottery{

    }


    function getContractBalance() public view returns(uint){
        return amount;
    }

    
    
}