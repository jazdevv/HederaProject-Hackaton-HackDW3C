import { ContractExecuteTransaction,ContractFunctionParameters,ContractId } from '@hashgraph/sdk'

class ContractFactory {
    #hashconnect;
    #topic;
    #accountId;
    #network;
    #factoryContractId;

    constructor(_hashconnect,_saveData,_factorycontract){
        
        this.#hashconnect = _hashconnect;
        this.#topic = _saveData.topic;
        this.#accountId = _saveData.pairedAccounts[0];
        this.#network = 'testnet';
        this.#factoryContractId = ContractId.fromString(_factorycontract);
        console.log(this.#factoryContractId)
    }

    async createLottery( miniumAmount,  name,  description, linkCreator, feesCreator, prizes){
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
            )
        return await this.#transactionExecute(transaction);
    }

    async #transactionExecute(transaction){
        console.log(this.#network,this.#topic,this.#accountId)
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