class User {
    // non-parameterized constructor
    constructor() {
        this.name = "";
        this.age = 0;
        this.email = "";
        this.userId = "";
        this.bankAccounts = [];
        this.transactions = [];
        this.dailyTransactions = [];
        this.monthlyTransactions = [];
        this.yearlyTransactions = [];
    }

    // parameterized constructor
    constructor(name, age, email, userId, bankAccounts) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.userId = userId;
        this.bankAccounts = bankAccounts;
        this.transactions = [];
        this.dailyTransactions = [];
        this.monthlyTransactions = [];
        this.yearlyTransactions = [];
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    
}