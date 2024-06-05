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
        if (this.dailyTransactions.at(-1).length === 0 || this.checkIfToday(this.dailyTransactions.at(-1).at(-1), transaction.date)) {
            this.dailyTransactions.at(-1).push(transaction.getTransaction());
            // hashtable update
            this.dailyTransactionsHashTable.set(transaction.getId(), [this.dailyTransactions.length - 1, this.dailyTransactions.at(-1).length - 1]);
        } else {
            this.dailyTransactions.push([transaction.getTransaction()]);
            // hashtable update
            this.dailyTransactionsHashTable.set(transaction.getId(), [this.dailyTransactions.length - 1, this.dailyTransactions.at(-1).length - 1]);
        }

        if (this.monthlyTransactions.at(-1).length === 0 || this.checkIfSameMonth(this.monthlyTransactions.at(-1).at(-1), transaction.date)) {
            this.monthlyTransactions.at(-1).push(transaction.getTransaction());
            // hashtable update
            this.monthlyTransactionsHashTable.set(transaction.getId(), [this.monthlyTransactions.length - 1, this.monthlyTransactions.at(-1).length - 1]);
        } else {
            this.monthlyTransactions.push([transaction.getTransaction()]);
            // hashtable update
            this.monthlyTransactionsHashTable.set(transaction.getId(), [this.monthlyTransactions.length - 1, this.monthlyTransactions.at(-1).length - 1]);
        }

        if (this.yearlyTransactions.at(-1).length === 0 || this.checkIfSameFullYear(this.yearlyTransactions.at(-1).at(-1), transaction.date)) {
            this.yearlyTransactions.at(-1).push(transaction.getTransaction());
            // hashtable update
            this.yearlyTransactionsHashTable.set(transaction.getId(), [this.yearlyTransactions.length - 1, this.yearlyTransactions.at(-1).length - 1]);
        } else {
            this.yearlyTransactions.push([transaction.getTransaction()]);
            // hashtable update
            this.yearlyTransactionsHashTable.set(transaction.getId(), [this.yearlyTransactions.length - 1, this.yearlyTransactions.at(-1).length - 1]);
        }
    }
    editTransaction(userId, date, amount, mode, status, remark, transactionId) {
        index = this.transactions.get(transactionId); //example 4
        dailyIndexes = this.dailyTransactionsHashTable.get(transactionId);  //example [0,1]
        monthlyIndexes = this.monthlyTransactionsHashTable.get(transactionId);
        yearlyIndexes = this.yearlyTransactionsHashTable.get(transactionId);
        
        this.transactions.at(index).setTransaction(userId, date, amount, mode, status, remark);

        //If date is not allowed to be updated
        this.dailyTransactions.at(dailyIndexes.at(0)).at(dailyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        this.monthlyTransactions.at(monthlyIndexes.at(0)).at(monthlyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        this.yearlyTransactions.at(yearlyIndexes.at(0)).at(yearlyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        

        /*
        newTransaction = new Transaction(userId, date, amount, mode, status, remark, transactionId);  //new object 
        //If date is allowed to be updated 
        if (this.checkIfToday(this.dailyTransactions.at(dailyIndexes.at(0)).at(dailyIndexes.at(1)), date)) {
            this.dailyTransactions.at(dailyIndexes.at(0)).at(dailyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        }
        else {
            //if date is updated and not today's transaction
            this.dailyTransactions.at(dailyIndexes.at(0)).splice(dailyIndexes.at(1),1);  //removing from daily transaction[]
            for(let i=0;i<this.dailyTransactions.length;i++){
                //find the appropriate index whose transaction dates are equal to updated date
                if(this.checkIfToday(this.dailyTransactions.at(i).at(0),date)){
                    this.dailyTransactions.at(i).push(newTransaction);  // Add there 
                    //Update hashTable 
                    this.dailyTransactionsHashTable.set(transactionId,[i,this.dailyTransactions.at(i).length - 1])
                    break;
                }
            }
        }
        if (this.checkIfSameMonth(this.monthlyTransactions.at(monthlyIndexes.at(0)).at(monthlyIndexes.at(1)), date)) {
            this.monthlyTransactions.at(monthlyIndexes.at(0)).at(monthlyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        }
        else {
            this.monthlyTransactions.at(monthlyIndexes.at(0)).splice(monthlyIndexes.at(1),1);
            for(let i=0;i<this.monthlyTransactions.length;i++){
                if(this.checkIfSameMonth(this.monthlyTransactions.at(i).at(0),date)){
                    this.monthlyTransactions.at(i).push(newTransaction);
                    this.monthlyTransactionsHashTable.set(transactionId,[i,this.monthlyTransactions.at(i).length - 1]);
                    break;
                }
            }
        }
        if (this.checkIfSameFullYear(this.yearlyTransactions.at(yearlyIndexes.at(0)).at(yearlyIndexes.at(1)), date)) {
            this.yearlyTransactions.at(yearlyIndexes.at(0)).at(yearlyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        }
        else {
            this.yearlyTransactions.at(yearlyIndexes.at(0)).splice(yearlyIndexes.at(1),1);
            for(let i=0;i<this.yearlyTransactions.length;i++){
                if(this.checkIfSameFullYear(this.yearlyTransactions.at(i).at(0),date)){
                    this.yearlyTransactions.at(i).push(newTransaction);
                    this.yearlyTransactionsHashTable.set(transactionId,[i,this.yearlyTransactions.at(i).length - 1]);
                    break;
                }
            }
        } */
    }
}
