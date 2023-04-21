// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract LotteryContract {

    event eventcontractData(string indexed val,address creator,string  lotteryName,string  lotteryDescription,uint miniumAmountParticipate,
                                            uint amount,uint participationsAmount,string  status,uint[] prizesLottery,string[] prizesRaffle,uint confirmedReceives,address[]winnersArray);

    // event eventPrizes(uint[] prizesLottery,string[] prizesRaffle);

    struct Winner {
        address addresRecivePrize;
        string email;
        string socialMedia;
        string prizeRaf;
        uint prizeLot;
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


    
    //lottery admin information
    address public admin; //Have the function of send money to the owner if the winners have not set the receivedPrize
    address public creator;
    

    //lottery public information set by constructor
    string public LotteryName;
    string public LotteryDescription;
    string public linkCreator;
    uint public miniumAmountParticipate;//if there is a minium to participate
    uint public percentageFees; //5% 
    uint public percentageFeesCreator;//5% MAX FOR LOTTERIES AND 95% FOR RAFFLE
    uint public feesAmount; //count fees
    uint public feesAmountCreator;
    uint public amount;
    enum LotteryTypes{MONEY,PRIZES}
    LotteryTypes public lotteryType;
    

    //lottery tecnical data mainly managed by smart contract
    string lotteryStatus; //"ongoing","finished"
    uint public participationsAmount;
    address[] public participations;
    mapping(address => Winner) public DataWinners;//contains data of each winners NFT
    address[] public winnersArray;
    string[] public prizesRaffle;
    uint[] public prizesLottery;
    uint confirmedReceives;
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
        prizesRaffle = _prizesRaffle;
        prizesLottery = _prizesLottery;

        //define lottery type
        if(lotteryTypeVal==0){
            lotteryType = LotteryTypes.MONEY;
            
        }else if(lotteryTypeVal==1){
            lotteryType = LotteryTypes.PRIZES;
            
        }else{
            lotteryType = LotteryTypes.MONEY;
            prizesLottery = _prizesLottery;
        }

        // emit eventPrizes();
        emit eventcontractData("contractdata",creatorAdd,name,description,miniumAmount,0,0,"ongoing",_prizesLottery,_prizesRaffle,0,winnersArray);
        
        
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

    function sendFeesToAdmins(address payable sendTo) external restrictedMod{
        sendTo.transfer(feesAmount);
    }

    function sendFeesToCreator() external restrictedCreator{
        require(availableTakeFees);
        payable(creator).transfer(feesAmountCreator);

    }
    

    function addInitialAmount()public payable restrictedCreator{
        
        uint amountWithoutFees = takeFees(msg.value);
        
        amount = amount + amountWithoutFees;

        //EMIT EVENT TO REFRESH THE DATA
        emit eventcontractData("contractdata",creator,LotteryName,LotteryDescription,miniumAmountParticipate,amount,participationsAmount,lotteryStatus,prizesLottery,prizesRaffle,confirmedReceives,winnersArray);
    }

    function joinLottery() public payable{
        //CHECK IF USER PAYED THE AMOUNT TO JOIN
        require(msg.value > miniumAmountParticipate);
        //TAKE FEES AND ADD AMOUNT TO TOTAL AMOUNT
        uint valueWithoutFees = takeFees(msg.value);
        amount = amount + valueWithoutFees;
        //ADD PARTICIPATION TO THE PARTICIPANT
        participations.push(msg.sender);
        //INCREASE PARTICIPATIONS AMOUNT
        participationsAmount = participationsAmount + 1;
        //EMIT EVENT TO REFRESH THE DATA
        emit eventcontractData("contractdata",creator,LotteryName,LotteryDescription,miniumAmountParticipate,amount,participationsAmount,lotteryStatus,prizesLottery,prizesRaffle,confirmedReceives,winnersArray);

    }

    function chooseWinner() public{
        //SET LOTTERY STATUS AS FINISHED
        lotteryStatus = "finished";

        //CHOOSE THE WINNERS
        //loop prizes y por cada una
        if(lotteryType == LotteryTypes.MONEY){
            for (uint i=0;i < prizesLottery.length;i++ ){
                //get random number
                uint _index = random() % participations.length;
                //get winner by index
                address winneraddr = participations[_index+i];
                //push winner to winners array
                winnersArray.push(winneraddr);
                //add struct to winners data mapping
                DataWinners[winneraddr] = Winner(winneraddr,"","","",prizesLottery[i],false,true);
                //payprizes
                payable(winneraddr).transfer(prizesLottery[i] * amount /100);
                //send fees to creator
                payable(creator).transfer(feesAmountCreator);
                //confirm prizes receive
                confirmedReceives = prizesLottery.length;
                availableTakeFees = true;
            }    
        }else{
            for (uint i=0;i < prizesRaffle.length;i++ ){
                //get random number
                uint _index = random() % participations.length;
                //get winner by index
                address winneraddr = participations[_index+i];
                //push winner to winners array
                winnersArray.push(winneraddr);
                //add struct to winners data mapping
                DataWinners[winneraddr] = Winner(winneraddr,"","",prizesRaffle[i],0,false,true);
                
            } 
        }
        emit eventcontractData("contractdata",creator,LotteryName,LotteryDescription,miniumAmountParticipate,amount,participationsAmount,lotteryStatus,prizesLottery,prizesRaffle,confirmedReceives,winnersArray);

    }

    function random() public view returns (uint) {
        return uint(keccak256(abi.encode(block.difficulty, block.timestamp, participations)));
    }

    function winnerAddContactInfo(string memory _email,string memory _socialMedia) public {
        //CHECK IF HE IS WINNER
        require(DataWinners[msg.sender].winner == true);
        //ADD CONTACT INFO
        DataWinners[msg.sender].email = _email;
        DataWinners[msg.sender].socialMedia = _socialMedia;
        
    }

    function receivedPrizepool() public {
        DataWinners[msg.sender].receivedPrize = true;
        require(DataWinners[msg.sender].receivedPrize = false);
        confirmedReceives = confirmedReceives + 1;
        if(confirmedReceives>prizesRaffle.length){
            availableTakeFees = true;
        }
    }

    
    
}