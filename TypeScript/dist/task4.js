class BankAccount {
    constructor(accountHolder, balance) {
        this.bankName = "SBI";
        this.accountHolder = accountHolder;
        this.balance = balance;
    }
    getBalance() {
        return this.balance;
    }
}
let acc = new BankAccount("Ushosi", 5000);
console.log(acc.accountHolder);
console.log(acc.getBalance());
export {};
