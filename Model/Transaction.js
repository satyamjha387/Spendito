import { Status } from "./Status.js"
class Transaction {
    

    constructor(userId,transactionId, amount, mode, status,date, remark) {
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
            transactionId: this.transactionId,
            amount: this.amount,
            mode: this.mode.getMode(),
            status: this.status,
            date: this.date,
            remark: this.remark,
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

    setTransaction(userId, amount, mode, status, date, remark) {
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