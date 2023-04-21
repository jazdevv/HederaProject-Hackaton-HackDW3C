import { ContractExecuteTransaction,ContractFunctionParameters,ContractId,ContractCallQuery,Client,Hbar,AccountId } from '@hashgraph/sdk'
import Web3 from 'web3'
import axios from 'axios';
const abiFile = require('../smartContractData/abi.json');
const abiFileLotteryRaffle = require('../smartContractData/LotteryRafflesAbi.json')

class ContractFactory {
    #hashconnect;
    #topic;
    #accountId;
    #network;
    #factoryContractId;
    #abi;
    #abiLotteryRaffle;

    constructor(_hashconnect,_saveData,_factorycontract){
        
        this.#hashconnect = _hashconnect;
        this.#topic = _saveData.topic;
        this.#accountId = _saveData.pairedAccounts[0];
        this.#network = 'testnet';
        this.#factoryContractId = ContractId.fromString(_factorycontract);
        this.#abi = abiFile.abi;
        this.#abiLotteryRaffle = abiFileLotteryRaffle.abi
    }

    async createLottery( miniumAmount,  name,  description, linkCreator, feesCreator, prizes){
        console.log('adding prizes',prizes)
        const transaction = new ContractExecuteTransaction()
            .setContractId(this.#factoryContractId)
            .setGas(1000000)
            .setFunction("deployLotteryContract", new ContractFunctionParameters()
                .addUint256(miniumAmount)
                .addUint256(0)//0 equals lottery in the smart contract
                .addString(name)
                .addString(description)
                .addString(linkCreator)
                .addUint256(feesCreator)
                .addStringArray(['no'])
                .addUint256Array(prizes)

            )
        return await this.#transactionExecute(transaction);
    }

    async createRaffle( miniumAmount,  name,  description, linkCreator,  prizes){
        const transaction = new ContractExecuteTransaction()
            .setContractId(this.#factoryContractId)
            .setGas(1000000)
            .setFunction("deployLotteryContract", new ContractFunctionParameters()
                .addUint256(miniumAmount)
                .addUint256(1)//1 equals raffle in the smart contract
                .addString(name)
                .addString(description)
                .addString(linkCreator)
                .addUint256(95)//in the raffle the host gets 95% of the raffle money, the rest are fees
                .addStringArray(prizes)
                .addUint256Array([0])
            )
        return await this.#transactionExecute(transaction);
    }

    async addParticipation(contractId,amount){
        const contractid = ContractId.fromSolidityAddress(contractId)
        let send_amount;
        if(amount == 0){
            send_amount = 0.001
        }else{
            send_amount = amount
        }
        const transaction = new ContractExecuteTransaction()
            .setContractId(contractid)
            .setGas(1000000)
            .setPayableAmount(send_amount)
            .setFunction("joinLottery")
        return await this.#transactionExecute(transaction);
    }

    async getContracts(){

        //web3 instance
        const web3 = new Web3();
        //create client, hashpack signer dont works with ContractCallQuery(), Solve with mirror nodes in future
        const client = Client.forTestnet().setOperator('0.0.4011011','302e020100300506032b6570042204208d9ddfcb9c80cb6f2181c07b44ebed3bfdadb051eadc80b3f94fcf65d629be5e');
        //function Name
        let fcnName = 'getContracts';
        console.log(this.#factoryContractId)
        const transaction = new ContractCallQuery()
            .setContractId(this.#factoryContractId)
            .setGas('100000')
            .setFunction('getContracts')

        //NOT WORKING WITH SIGNER    
        // const provider = this.#hashconnect.getProvider(this.#network,this.#topic,this.#accountId);
        // const signer = this.#hashconnect.getSigner(provider);
        const res = await transaction.execute(client);
        console.log(res)
        const contracts = this.decodeFunctionResult(fcnName,res.bytes,web3,this.#abi);
        return contracts.messageOut
    }

    async getUserContracts(){

        //web3 instance
        const web3 = new Web3();
        //create client, hashpack signer dont works with ContractCallQuery(), Solve with mirror nodes in future
        const client = Client.forTestnet().setOperator('0.0.4011011','302e020100300506032b6570042204208d9ddfcb9c80cb6f2181c07b44ebed3bfdadb051eadc80b3f94fcf65d629be5e');
        //function Name
        let fcnName = 'getContracts';
        const response = await axios.get(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${this.#accountId}`)
        console.log(response.data)
        
        const transaction = new ContractCallQuery()
            .setContractId(this.#factoryContractId)
            .setGas('100000')
            .setFunction('getUserContracts',new ContractFunctionParameters()
                .addAddress(response.data.evm_address))

        //NOT WORKING WITH SIGNER    
        // const provider = this.#hashconnect.getProvider(this.#network,this.#topic,this.#accountId);
        // const signer = this.#hashconnect.getSigner(provider);
        const res = await transaction.execute(client);
        console.log(res)
        
        const contracts = this.decodeFunctionResult('getUserContracts',res.bytes,web3,this.#abi);

        return contracts.messageOut
    }


    encodeFunctionCall(functionName, parameters,web3) {
        const functionAbi = this.#abi.find(func => (func.name === functionName && func.type === "function"));
        const encodedParametersHex = web3.eth.abi.encodeFunctionCall(functionAbi, parameters).slice(2);
        return Buffer.from(encodedParametersHex, 'hex');
    }

    decodeFunctionResult(functionName, resultAsBytes,web3,abi) {
        
        const functionAbi = abi.find(func => func.name === functionName);
        const functionParameters = functionAbi.outputs;
        const resultHex = '0x'.concat(Buffer.from(resultAsBytes).toString('hex'));
        const result = web3.eth.abi.decodeParameters(functionParameters, resultHex);
        return result;
    }

    async #transactionExecute(transaction){
        const provider = this.#hashconnect.getProvider(this.#network,this.#topic,this.#accountId);
        const signer = this.#hashconnect.getSigner(provider);
        transaction.freezeWithSigner(signer);
        const res = await transaction.executeWithSigner(signer);
        if(res!=undefined){
            return res   
        }else{
            return 'error'
        }
        
    }

    
}

export default ContractFactory;