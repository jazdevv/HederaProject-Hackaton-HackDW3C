const { ContractCreateFlow, Client, FileCreateTransaction,ContractCreateTransaction,ContractFunctionParameters,ContractCallQuery,Hbar,ContractExecuteTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

async function deployFactoryContract() {
    //deploy to testnet
    const client = Client.forTestnet();
    //configure client
    client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);

    // Part 2 - Store the smart contract’s bytecode on Hedera
    //.json lo ha cogido del compilador de remix --> artifacts --> factory.json

    let helloHedera = require("./LotteryFactory.json");
    const bytecode = helloHedera.data.bytecode.object;
    const contractCreate =  new ContractCreateFlow()
    .setGas(1000000)
    .setBytecode(bytecode)
    .setConstructorParameters(new ContractFunctionParameters().addUint256(5))
    
    //Sign the transaction with the client operator key and submit to a Hedera network
    const txResponse = contractCreate.execute(client);

    //Get the receipt of the transaction
    const receipt = (await txResponse).getReceipt(client);
    
    //Get the new contract ID
    const newContractId = (await receipt).contractId;
            
    console.log("The new contract ID is " +newContractId);
    //SDK Version: v2.11.0-beta.1

}
deployFactoryContract();