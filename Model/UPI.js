class UPI {
    constructor() {
        this.bankAccount = "";
    }

    constructor(bankAccount) {
        this.bankAccount = bankAccount;
    }

    getBankAccount() {
        return this.bankAccount;
    }

    setBankAccount(bankAccount) {
        this.bankAccount = bankAccount;
    }
 }