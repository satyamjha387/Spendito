import Transaction from "./Transaction.js";

class User {
    // non-parameterized constructor
    
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

    getUser(){ 
        return {
            userId: this.userId,
            name: this.name,
            age: this.age,
            email: this.email,
            bankAccounts: this.bankAccounts
        }
    }

    getId() {
        return this.userId;
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

    getAllTransactions() {
        return this.transactions;
    }
    
    addTransaction(transaction) {
        this.transactions.push(transaction);
        // hashtable update
        this.transactionsHashTable.set(transaction.getId(), this.transactions.length - 1);
        if (this.dailyTransactions.at(-1).length === 0 || this.checkIfToday(this.dailyTransactions.at(-1).at(-1), transaction.date)) {
            this.dailyTransactions.at(-1).push(transaction);
            // hashtable update
            this.dailyTransactionsHashTable.set(transaction.getId(), [this.dailyTransactions.length - 1, this.dailyTransactions.at(-1).length - 1]);
        } else {
            this.dailyTransactions.push([transaction]);
            // hashtable update
            this.dailyTransactionsHashTable.set(transaction.getId(), [this.dailyTransactions.length - 1, this.dailyTransactions.at(-1).length - 1]);
        }

        if (this.monthlyTransactions.at(-1).length === 0 || this.checkIfSameMonth(this.monthlyTransactions.at(-1).at(-1), transaction.date)) {
            this.monthlyTransactions.at(-1).push(transaction);
            // hashtable update
            this.monthlyTransactionsHashTable.set(transaction.getId(), [this.monthlyTransactions.length - 1, this.monthlyTransactions.at(-1).length - 1]);
        } else {
            this.monthlyTransactions.push([transaction]);
            // hashtable update
            this.monthlyTransactionsHashTable.set(transaction.getId(), [this.monthlyTransactions.length - 1, this.monthlyTransactions.at(-1).length - 1]);
        }

        if (this.yearlyTransactions.at(-1).length === 0 || this.checkIfSameFullYear(this.yearlyTransactions.at(-1).at(-1), transaction.date)) {
            this.yearlyTransactions.at(-1).push(transaction);
            // hashtable update
            this.yearlyTransactionsHashTable.set(transaction.getId(), [this.yearlyTransactions.length - 1, this.yearlyTransactions.at(-1).length - 1]);
        } else {
            this.yearlyTransactions.push([transaction]);
            // hashtable update
            this.yearlyTransactionsHashTable.set(transaction.getId(), [this.yearlyTransactions.length - 1, this.yearlyTransactions.at(-1).length - 1]);
        }
    }


    editTransaction(userId, date, amount, mode, status, remark, transactionId) {
        const index = this.transactionsHashTable.get(transactionId); //example 4
        const dailyIndexes = this.dailyTransactionsHashTable.get(transactionId);  //example [0,1]
        const monthlyIndexes = this.monthlyTransactionsHashTable.get(transactionId);
        const yearlyIndexes = this.yearlyTransactionsHashTable.get(transactionId);
        
        this.transactions.at(index).setTransaction(userId, date, amount, mode, status, remark);

        //If date is not allowed to be updated
        this.dailyTransactions.at(dailyIndexes.at(0)).at(dailyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        this.monthlyTransactions.at(monthlyIndexes.at(0)).at(monthlyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        this.yearlyTransactions.at(yearlyIndexes.at(0)).at(yearlyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        

        
        // const newTransaction = new Transaction(userId, date, amount, mode, status, remark, transactionId);  //new object 
        // //If date is allowed to be updated 
        // if (this.checkIfToday(this.dailyTransactions.at(dailyIndexes.at(0)).at(dailyIndexes.at(1)), date)) {
        //     this.dailyTransactions.at(dailyIndexes.at(0)).at(dailyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        // }
        // else {
        //     //if date is updated and not today's transaction
        //     this.dailyTransactions.at(dailyIndexes.at(0)).splice(dailyIndexes.at(1),1);  //removing from daily transaction[]
        //     for(let i=0;i<this.dailyTransactions.length;i++){
        //         //find the appropriate index whose transaction dates are equal to updated date
        //         if(this.checkIfToday(this.dailyTransactions.at(i).at(0),date)){
        //             this.dailyTransactions.at(i).push(newTransaction);  // Add there 
        //             //Update hashTable 
        //             this.dailyTransactionsHashTable.set(transactionId,[i,this.dailyTransactions.at(i).length - 1])
        //             break;
        //         }
        //     }
        // }
        // if (this.checkIfSameMonth(this.monthlyTransactions.at(monthlyIndexes.at(0)).at(monthlyIndexes.at(1)), date)) {
        //     this.monthlyTransactions.at(monthlyIndexes.at(0)).at(monthlyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        // }
        // else {
        //     this.monthlyTransactions.at(monthlyIndexes.at(0)).splice(monthlyIndexes.at(1),1);
        //     for(let i=0;i<this.monthlyTransactions.length;i++){
        //         if(this.checkIfSameMonth(this.monthlyTransactions.at(i).at(0),date)){
        //             this.monthlyTransactions.at(i).push(newTransaction);
        //             this.monthlyTransactionsHashTable.set(transactionId,[i,this.monthlyTransactions.at(i).length - 1]);
        //             break;
        //         }
        //     }
        // }
        // if (this.checkIfSameFullYear(this.yearlyTransactions.at(yearlyIndexes.at(0)).at(yearlyIndexes.at(1)), date)) {
        //     this.yearlyTransactions.at(yearlyIndexes.at(0)).at(yearlyIndexes.at(1)).setTransaction(userId, date, amount, mode, status, remark);
        // }
        // else {
        //     this.yearlyTransactions.at(yearlyIndexes.at(0)).splice(yearlyIndexes.at(1),1);
        //     for(let i=0;i<this.yearlyTransactions.length;i++){
        //         if(this.checkIfSameFullYear(this.yearlyTransactions.at(i).at(0),date)){
        //             this.yearlyTransactions.at(i).push(newTransaction);
        //             this.yearlyTransactionsHashTable.set(transactionId,[i,this.yearlyTransactions.at(i).length - 1]);
        //             break;
        //         }
        //     }
        // }
    }

    deleteTransaction(transactionId) {
        const index = this.transactionsHashTable.get(transactionId); //example 4
        const dailyIndexes = this.dailyTransactionsHashTable.get(transactionId);  //example [0,1]
        const monthlyIndexes = this.monthlyTransactionsHashTable.get(transactionId);
        const yearlyIndexes = this.yearlyTransactionsHashTable.get(transactionId);

        this.transactions.splice(index, 1);

        this.dailyTransactions.at(dailyIndexes.at(0)).splice(dailyIndexes.at(1), 1);  //removing from daily transaction[]
        this.monthlyTransactions.at(monthlyIndexes.at(0)).splice(monthlyIndexes.at(1), 1);
        this.yearlyTransactions.at(yearlyIndexes.at(0)).splice(yearlyIndexes.at(1), 1);

        for(let t_index = index; t_index < this.transactions.length; ++t_index) { 
            this.transactionsHashTable.set(this.transactions[t_index].getId(), index);
        }

        for(let d_index = dailyIndexes.at(1); d_index < this.dailyTransactions.at(dailyIndexes.at(0)).length; d_index++) {
            this.dailyTransactionsHashTable.set(this.dailyTransactions[dailyIndexes.at(0)][d_index].getId(), [dailyIndexes.at(0), d_index]);
        }

        for(let m_index = monthlyIndexes.at(1); m_index < this.monthlyTransactions.at(monthlyIndexes.at(0)).length; m_index++) {
            this.monthlyTransactionsHashTable.set(this.monthlyTransactions[monthlyIndexes.at(0)][m_index].getId(), [monthlyIndexes.at(0), m_index]);
        }

        for(let y_index = yearlyIndexes.at(1); y_index < this.yearlyTransactions.at(yearlyIndexes.at(0)).length; y_index++) {
            this.yearlyTransactionsHashTable.set(this.yearlyTransactions[yearlyIndexes.at(0)][y_index].getId(), [yearlyIndexes.at(0), y_index]);
        }
    }

    getTransaction(transactionId) {
        return this.transactions[this.transactionsHashTable.get(transactionId)].getTransaction();
    }
}

export default User;