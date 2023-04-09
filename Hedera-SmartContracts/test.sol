// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract LotteryFactory {
    //lottery factory admin
    uint public percentageFees;
    mapping(address=>bool) admins;
    address creator;

    //created lotteries
    address[] createdLoteries;
    

    constructor(uint initialFeesValue){
        creator = msg.sender;
        require(initialFeesValue < 100);
        percentageFees = initialFeesValue;
        admins[msg.sender] = true;
    }

    function deployLotteryContract(uint miniumAmount, uint lotteryTypeVal, string memory name, string memory description)public payable returns(address){
        LotteryContract newLottery = new LotteryContract(
            msg.sender,
            miniumAmount,
            lotteryTypeVal,//0 money 1 prizes
            name,
            description,
            percentageFees
        );
        createdLoteries.push(address(newLottery));
        return address(newLottery);
    }

    function isAdmin(address add)public returns(bool){
        return admins[add];
    }
}



contract LotteryContract {

    struct Winner {
        address  participantAddress;
        bool receivedPrize;
    }

    modifier restrictedCreator(){
        require(msg.sender==creator);
        _;
    }

    modifier restrictedMod(){

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
    address[] public moderators; //Have the function of send money to the owner if the winners have not set the receivedPrize
    address public creator;
    address public factoryScAddr;

    //lottery public information set by constructor
    string public LotteryName;
    string public LotteryDescription;
    uint public miniumAmountParticipate;//if there is a minium to participate
    uint public percentageFees; 
    uint public feesAmount; //count fees
    uint public Amount;
    enum LotteryTypes{MONEY,PRIZES}
    LotteryTypes public lotteryType;
    

    //lottery tecnical data mainly managed by smart contract
    address[] public mintedNFT;
    //PARTICIPANTS MAPPING WITH participant=>[tickets]
    //PARTICIPANTS MAPPING WITH winnernft=>{email, way to contact him}
    Winner[] public winnersNFT;//???mapping instead
    string[] public prizes;
    

    constructor(
        address creatorAdd,
        uint miniumAmount,
        uint lotteryTypeVal,//if statement cannot compare strings, hardcode from frontend to send int instead of lotteryType 
        string memory name,
        string memory description,
        uint fees
    )
    {
        factoryScAddr = msg.sender;
        creator = creatorAdd;
        miniumAmountParticipate = miniumAmount;
        LotteryName = name;
        LotteryDescription = description;
        percentageFees = fees;

        //define lottery type
        if(lotteryTypeVal==0){
            lotteryType = LotteryTypes.MONEY;
        }else if(lotteryTypeVal==1){
            lotteryType = LotteryTypes.PRIZES;
        }else{
            lotteryType = LotteryTypes.MONEY;
        }
        

    }

    function joinLottery() public payable{
        //CHECK IF USER PAYED THE AMOUNT TO JOIN

        //MINT AN NFT AS LOTTERY TICKET

        //SEND THE NFT TO THE USER
    }

    function chooseWinner() public{
        //CHOOSE THE WINNER NFT

    }

    // function getParticipants() public view returns(address[]){
    //     //WHO IS PARTICIPATING
    // }


    //-----------IDEA-----------
    function receivePrize() public {
        //CHECK THE NFT OWNER ADDRESS

        //ADD OWNER ADDRESS nf winner --> participant info

        //SEND THE PRIZE AMOUNT OF MONEY TO THE WINNER ADDRESS IF THATS THE TYPE OF LOTTERY
    }

    function winnerAddContactInfo() public typePrizesLottery{

    }

    function creatorWithdrawFunds() public {

    }

    function getContractBalance() public {

    }

    function adminMoveFunds() public {

    }

    function works() public typePrizesLottery view returns(address){
        return creator;
    }
    
}