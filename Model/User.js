import Transaction from "./Transaction.js";

class User {
    // non-parameterized constructor
    
    // parameterized constructor
    constructor(userId,email,name, age, bankAccounts) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.userId = userId;
        this.bankAccounts = bankAccounts;
        this.transactions = [];
        this.dailyTransactions = [[]]; // contains T_ids of transactions in the form of 2-d array
        this.monthlyTransactions = [[]];
        this.yearlyTransactions = [[]];
        this.transactionsHashTable = new Map(); // map of t_id -> index of transactions array
        this.dailyTransactionsHashTable = new Map();// map of t_id -> coordinates of transaction in dailyTransactions 2-d array
        this.monthlyTransactionsHashTable = new Map();// map of t_id -> coordinates of transaction in monthlyTransactions 2-d array
        this.yearlyTransactionsHashTable = new Map();// map of t_id -> coordinates of transaction in yearlyTransactions 2-d array
        this.dateToDailyTransactionIdxHashTable = new Map(); //Map of date -> row(index) no of dailyTransaction (containing Tids) corresponding to that date
        this.fullTransaction = new Map(); // t_id -> transaction
    }

    getUser(){ 
        return {
            userId: this.userId,
            email: this.email,
            name: this.name,
            age: this.age,
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
        let transactionIds = this.transactions.filter((transactionId) => {
            return transactionId !== null; 
        })

        return transactionIds.map((transactionId) => {
            return this.fullTransaction.get(transactionId);
        });
    }
    getTransaction(transactionId) {
        return this.fullTransaction.get(transactionId);
    }
    
    addTransaction(transaction) {
        this.transactions.push(transaction.getId());
        this.fullTransaction.set(transaction.getId(), transaction);
        // hashtable update
        this.transactionsHashTable.set(transaction.getId(), this.transactions.length - 1);
        //addding in daily transaction if the last element of the dailyTransations 2d array is empty or
        //the date in the last element of the same element is same as the date of the date of the element to be added.
        if (this.dailyTransactions.at(-1).length === 0 || this.checkIfToday(this.getTransaction(this.dailyTransactions.at(-1).at(-1)), transaction.date)) {
            this.dailyTransactions.at(-1).push(transaction.getId());
            // hashtable update
            this.dailyTransactionsHashTable.set(transaction.getId(), [this.dailyTransactions.length - 1, this.dailyTransactions.at(-1).length - 1]);
            this.dateToDailyTransactionIdxHashTable.set(transaction.getDate().toDateString(), this.dailyTransactions.length-1);
        } else {
            this.dailyTransactions.push([transaction.getId()]);
            // hashtable update
            this.dailyTransactionsHashTable.set(transaction.getId(), [this.dailyTransactions.length - 1, this.dailyTransactions.at(-1).length - 1]);
            this.dateToDailyTransactionIdxHashTable.set(transaction.getDate().toDateString(), this.dailyTransactions.length-1);
        
        }

        if (this.monthlyTransactions.at(-1).length === 0 || this.checkIfSameMonth(this.getTransaction(this.monthlyTransactions.at(-1).at(-1)), transaction.date)) {
            this.monthlyTransactions.at(-1).push(transaction.getId());
            // hashtable update
            this.monthlyTransactionsHashTable.set(transaction.getId(), [this.monthlyTransactions.length - 1, this.monthlyTransactions.at(-1).length - 1]);
        } else {
            this.monthlyTransactions.push([transaction.getId()]);
            // hashtable update
            this.monthlyTransactionsHashTable.set(transaction.getId(), [this.monthlyTransactions.length - 1, this.monthlyTransactions.at(-1).length - 1]);
        }

        if (this.yearlyTransactions.at(-1).length === 0 || this.checkIfSameFullYear(this.getTransaction(this.yearlyTransactions.at(-1).at(-1)), transaction.date)) {
            this.yearlyTransactions.at(-1).push(transaction.getId());
            // hashtable update
            this.yearlyTransactionsHashTable.set(transaction.getId(), [this.yearlyTransactions.length - 1, this.yearlyTransactions.at(-1).length - 1]);
        } else {
            this.yearlyTransactions.push([transaction.getId()]);
            // hashtable update
            this.yearlyTransactionsHashTable.set(transaction.getId(), [this.yearlyTransactions.length - 1, this.yearlyTransactions.at(-1).length - 1]);
        }
    }


    editTransaction(transactionId,amount, mode, status, remark) {
        const index = this.transactionsHashTable.get(transactionId); //example 4
        // const dailyIndexes = this.dailyTransactionsHashTable.get(transactionId);  //example [0,1]
        // const monthlyIndexes = this.monthlyTransactionsHashTable.get(transactionId);
        // const yearlyIndexes = this.yearlyTransactionsHashTable.get(transactionId);
        
        this.fullTransaction.get(this.transactions.at(index)).setTransaction(amount, mode, status, remark);



        
        // We Do not need to update the the 2-d arrays as the transactionId does not change
        // If date is not allowed to be updated
        // this.fullTransaction.get(this.dailyTransactions.at(dailyIndexes.at(0)).at(dailyIndexes.at(1))).setTransaction(amount, mode, status, remark);
        // this.fullTransaction.get(this.monthlyTransactions.at(monthlyIndexes.at(0)).at(monthlyIndexes.at(1))).setTransaction(amount, mode, status, remark);
        // this.fullTransaction.get(this.yearlyTransactions.at(yearlyIndexes.at(0)).at(yearlyIndexes.at(1))).setTransaction(amount, mode, status, remark);
        

        
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

        this.fullTransaction.set(transactionId, null);

        this.transactions.splice(index, 1);//removing from transactions[]

        this.dailyTransactions.at(dailyIndexes.at(0)).splice(dailyIndexes.at(1), 1);  //removing from dailyTransaction[[]]
        this.monthlyTransactions.at(monthlyIndexes.at(0)).splice(monthlyIndexes.at(1), 1);//removing from monthlyTransactions[[]]
        this.yearlyTransactions.at(yearlyIndexes.at(0)).splice(yearlyIndexes.at(1), 1);//removing from yearlyTransactions[[]]

        for(let t_index = index; t_index < this.transactions.length; ++t_index) { 
            this.transactionsHashTable.set(this.transactions.at(t_index), t_index);
        }

        for(let d_index = dailyIndexes.at(1); d_index < this.dailyTransactions.at(dailyIndexes.at(0)).length; d_index++) {
            this.dailyTransactionsHashTable.set(this.dailyTransactions[dailyIndexes.at(0)][d_index], [dailyIndexes.at(0), d_index]);
        }

        for(let m_index = monthlyIndexes.at(1); m_index < this.monthlyTransactions.at(monthlyIndexes.at(0)).length; m_index++) {
            this.monthlyTransactionsHashTable.set(this.monthlyTransactions[monthlyIndexes.at(0)][m_index], [monthlyIndexes.at(0), m_index]);
        }

        for(let y_index = yearlyIndexes.at(1); y_index < this.yearlyTransactions.at(yearlyIndexes.at(0)).length; y_index++) {
            this.yearlyTransactionsHashTable.set(this.yearlyTransactions[yearlyIndexes.at(0)][y_index], [yearlyIndexes.at(0), y_index]);
        }
    }
    
    
    getTransactionsFromDate(date){
        // const result = [];
        // if(this.dateToDailyTransactionIdxHashTable.has(date.toDateString())==false){
        //     return result;
        // }
        // //return this.dateToDailyTransactionIdxHashTable.get(date.toDateString());
        // let idx = this.dateToDailyTransactionIdxHashTable.get(date.toDateString());
        // for(let i=0;i<this.dailyTransactions[idx].length;i++){
        //     let tId = this.dailyTransactions[idx][i]; //Transaction Id
        //     result.push(this.getTransaction(tId));
        // }
        // return result;

        let index = this.dateToDailyTransactionIdxHashTable.get(date.toDateString());
        if(index === undefined) return [];
        return this.dailyTransactions.at(index).map((transactionId) => {
            return this.fullTransaction.get(transactionId);
        });
    }
    
}

export default User;