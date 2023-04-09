// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


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
        uint fees,
        address givenAdmin
    )
    {
        
        creator = creatorAdd;
        miniumAmountParticipate = miniumAmount;
        LotteryName = name;
        LotteryDescription = description;
        percentageFees = fees;
        admin = givenAdmin;

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
    
}