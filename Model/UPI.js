class UPI {
    

    constructor(bankAccount) {
        this.bankAccount = bankAccount;
    }

    getBankAccount() {
        return this.bankAccount;
    }

    setBankAccount(bankAccount) {
        this.bankAccount = bankAccount;
    }

    getMode() {
        return {
            type: "UPI",
            bankAccount: this.bankAccount
        }
    }
}

export default UPI;