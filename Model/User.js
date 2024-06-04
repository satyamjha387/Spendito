class User {
    // non-parameterized constructor
    constructor() {
        this.name = "";
        this.age = 0;
        this.email = "";
        this.userId = "";
        this.bankAccounts = [];
        this.transactions = [];
        this.dailyTransactions = [[]];
        this.monthlyTransactions = [[]];
        this.yearlyTransactions = [[]];
        this.transactionsHashTable = new Map();
        this.dailyTransactionsHashTable = new Map();
        this.monthlyTransactionsHashTable = new Map();
        this.yearlyTransactionsHashTable = new Map();
    }

    // parameterized constructor
    constructor(name, age, email, userId, bankAccounts) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.userId = userId;
        this.bankAccounts = bankAccounts;
        this.transactions = [];
        this.dailyTransactions = [[]];
        this.monthlyTransactions = [[]];
        this.yearlyTransactions = [[]];
        this.transactionsHashTable = new Map();
        this.dailyTransactionsHashTable = new Map();
        this.monthlyTransactionsHashTable = new Map();
        this.yearlyTransactionsHashTable = new Map();
    }

    checkIfToday(transaction, date) {
        return ((transaction.date.getDate() === date.getDate()) && this.checkIfSameMonth(transaction, date) && this.checkIfSameFullYear(transaction, date))
    }

    checkIfSameMonth(transaction, date) {
        return (transaction.date.getMonth() === date.getMonth() && this.checkIfSameFullYear(transaction, date));
    }

    checkIfSameFullYear(transaction, date) {
        return (transaction.date.getFullYear() === date.getFullYear());
    }

    addTransaction(transaction) {
        this.transactions.push(transaction.getTransaction());
        // hashtable update
        this.transactionsHashTable.set(transaction.getId(), this.transactions.length - 1);
        if(this.dailyTransactions.at(-1).length === 0 || this.checkIfToday(this.dailyTransactions.at(-1).at(-1), transaction.date)) {
            this.dailyTransactions.at(-1).push(transaction.getTransaction());
            // hashtable update
            this.dailyTransactionsHashTable.set(transaction.getId(), [this.dailyTransactions.length - 1, this.dailyTransactions.at(-1).length - 1]);
        } else {
            this.dailyTransactions.push([transaction.getTransaction()]);
            // hashtable update
            this.dailyTransactionsHashTable.set(transaction.getId(), [this.dailyTransactions.length - 1, this.dailyTransactions.at(-1).length - 1]);
        }

        if(this.monthlyTransactions.at(-1).length === 0 || this.checkIfSameMonth(this.monthlyTransactions.at(-1).at(-1), transaction.date)) {
            this.monthlyTransactions.at(-1).push(transaction.getTransaction());
            // hashtable update
            this.monthlyTransactionsHashTable.set(transaction.getId(), [this.monthlyTransactions.length - 1, this.monthlyTransactions.at(-1).length - 1]);
        } else {
            this.monthlyTransactions.push([transaction.getTransaction()]);
            // hashtable update
            this.monthlyTransactionsHashTable.set(transaction.getId(), [this.monthlyTransactions.length - 1, this.monthlyTransactions.at(-1).length - 1]);
        }
        
        if(this.yearlyTransactions.at(-1).length === 0 || this.checkIfSameFullYear(this.yearlyTransactions.at(-1).at(-1), transaction.date)) {
            this.yearlyTransactions.at(-1).push(transaction.getTransaction());
            // hashtable update
            this.yearlyTransactionsHashTable.set(transaction.getId(), [this.yearlyTransactions.length - 1, this.yearlyTransactions.at(-1).length - 1]);
        } else {
            this.yearlyTransactions.push([transaction.getTransaction()]);
            // hashtable update
            this.yearlyTransactionsHashTable.set(transaction.getId(), [this.yearlyTransactions.length - 1, this.yearlyTransactions.at(-1).length - 1]);
        }
    }
}

