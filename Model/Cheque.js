class Cheque {
    
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

    getMode() {
        return {
            type: "Cheque",
            bankAccount: this.bankAccount,
            chequeNumber: this.chequeNumber
        }
    }
}

export default Cheque;