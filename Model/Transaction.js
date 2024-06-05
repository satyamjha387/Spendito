import { Status } from "./Status.js"
class Transaction {
    

    constructor(userId, date, amount, mode, status, remark, transactionId) {
        this.userId = userId
        this.date = date
        this.amount = amount
        this.mode = mode
        this.status = status
        this.remark = remark
        this.transactionId = transactionId
    }

    getTransaction() {
        return {
            userId: this.userId,
            date: this.date,
            amount: this.amount,
            mode: this.mode.getMode(),
            status: this.status,
            remark: this.remark,
            transactionId: this.transactionId
        }
    }

    getDate() {
        return this.date;
    }

    getMode() {
        return this.mode;
    }

    getRemark() {
        return this.remark;
    }

    setTransaction(userId, date, amount, mode, status, remark) {
        this.userId = userId
        this.date = date
        this.amount = amount
        this.mode = mode
        this.status = status
        this.remark = remark
    }

    getId() {
        return this.transactionId;
    }
 }

 export default Transaction;