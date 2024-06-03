class Cheque {
    constructor(){
        this.bankAccount = "",
        this.chequeNumber  = ""
    }
    constructor(bankAccount, chequeNumber){
        this.bankAccount = bankAccount,
        this.chequeNumber = chequeNumber
    }
    getBankAccount(){
        return this.bankAccount;
    } 
    getChequeNumber(){
        return this.chequeNumber
    }
    setBankAccount(bankAccount){
        this.bankAccount = bankAccount
    }
    setChequeNumber(chequeNumber){
        this.chequeNumber = chequeNumber
    }
}