import Transaction from "./Model/Transaction.js";
import { Status } from "./Model/Status.js";
import UPI from "./Model/UPI.js";
import Cheque from "./Model/Cheque.js";
import Cash from "./Model/Cash.js";
import User from "./Model/User.js";
const user = new User("Satyam", 23, "satyam@gmail.com", "satyam_jha387", ["Kotak", "SBI"]);
console.log(user.getUser());
console.log("/////////////////////////////////////////////");

const t1 = new Transaction(user.getId(), new Date(2024, 5, 5), 105, new UPI("Kotak"), Status.SUCCESS, "College ki file ka printout", "001");
const t2 = new Transaction(user.getId(), new Date(2024, 5, 5), 15, new Cash("INR"), Status.PENDING, "Canteen ka samosa :-(", "002");
const t3 = new Transaction(user.getId(), new Date(2024, 5, 6), 2300000, new Cheque("SBI", "12340"), Status.SUCCESS, "College ki fees", "003");

user.addTransaction(t1);
console.log(user.getTransaction(t1.getId()));
console.log("/////////////////////////////////////////////");

user.addTransaction(t2);
console.log(user.getTransaction(t2.getId()));
console.log("/////////////////////////////////////////////");

user.addTransaction(t3);
console.log(user.getTransaction(t3.getId()));
console.log("/////////////////////////////////////////////");

user.editTransaction(user.getId(), t2.getDate(), 20, t2.getMode(), Status.SUCCESS, "Canteen ka samosa ;-)", t2.getId());
console.log(user.getAllTransactions());
console.log("EDIT: GET ALL TRANSACTIONS DONE/////////////////////////////////////////////");

user.deleteTransaction(t2.getId());
console.log(user.getAllTransactions());
console.log("DELETE: /////////////////////////////////////////////");
console.log(user.monthlyTransactions);
console.log("MONTHLY/////////////////////////////////////////////");
console.log(user.yearlyTransactions);
console.log("YEARLY/////////////////////////////////////////////");





