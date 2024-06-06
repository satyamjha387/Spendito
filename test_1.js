import Transaction from "./Model/Transaction.js";
import { Status } from "./Model/Status.js";
import UPI from "./Model/UPI.js";
import Cheque from "./Model/Cheque.js";
import Cash from "./Model/Cash.js";
import User from "./Model/User.js";
const user = new User("Satyam", 23, "satyam@gmail.com", "satyam_jha387", ["Kotak", "SBI"]);
// console.log(user.getUser());
// console.log("/////////////////////////////////////////////");
const t1 = new Transaction(user.getId(),new Date(2024,5,6),2000,new UPI("Axis"),Status.PENDING,"Wifi","001");
const t2 = new Transaction(user.getId(),new Date(2024,5,6),4000,new Cash("INR"),Status.SUCCESS,"TV","002");
const t3 = new Transaction(user.getId(),new Date(2024,5,6),5500,new Cheque("Axis","201"),Status.FAILURE,"Wifi","003");
const t4 = new Transaction(user.getId(),new Date(2024,6,5),2000,new UPI("Axis"),Status.PENDING,"Wifi","004");
const t5 = new Transaction(user.getId(),new Date(2024,6,6),4000,new Cash("INR"),Status.SUCCESS,"TV","005");
const t6 = new Transaction(user.getId(),new Date(2025,6,7),5500,new Cheque("Axis","203"),Status.FAILURE,"Wifi","006");

user.addTransaction(t1);
// console.log(user.getTransaction(t1.getId()));
// console.log("/////////////////////////////////////////////");

user.addTransaction(t2);
// console.log(user.getTransaction(t2.getId()));
// console.log("/////////////////////////////////////////////");

user.addTransaction(t3);
// console.log(user.getTransaction(t3.getId()));
// console.log("/////////////////////////////////////////////");

user.addTransaction(t4);
user.addTransaction(t5);
user.addTransaction(t6);

// user.editTransaction(user.getId(), t2.getDate(), 20, t2.getMode(), Status.SUCCESS, "Canteen ka samosa ;-)", t2.getId());
// console.log(user.getAllTransactions());
// console.log("EDIT: GET ALL TRANSACTIONS DONE/////////////////////////////////////////////");

// user.deleteTransaction(t2.getId());
// console.log(user.getAllTransactions());
// console.log("DELETE: /////////////////////////////////////////////");

// console.log(user.monthlyTransactions);
// console.log("MONTHLY/////////////////////////////////////////////");
// console.log(user.yearlyTransactions);
// console.log("YEARLY/////////////////////////////////////////////");

console.log("Transactions done on 2024 Jun 6 are ...")
console.log(user.getTransactionsFromDate(new Date(2024,5,6)))

console.log("Transactions done on 2024 July 6 are ...")
console.log(user.getTransactionsFromDate(new Date(2024,6,6)))

console.log("Transactions done on 2025 July 7 are ...")
console.log(user.getTransactionsFromDate(new Date(2025,6,7)))





// console.log("Daily Transactions")
// console.log(user.getDailyTransactions());

// console.log("Monthly Transactions")
// console.log(user.getMonthlyTransactions());

// console.log("Yearly Transactions")
// console.log(user.getYearlyTransactions());