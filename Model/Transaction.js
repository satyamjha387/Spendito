import { Status } from "./Status"
class Transaction {
    constructor() {
        this.userId = ""
        this.date = null
        this.amount = 0
        this.mode = null
        this.status = Status.PENDING
        this.remark = ""
        this.transactionId = ""
    }

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