class BankAccount {
    public accountHolder: string;
    private balance: number;
    protected bankName: string = "SBI";

    constructor(accountHolder: string, balance: number) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    public getBalance() {
        return this.balance;
    }
}

let acc = new BankAccount("Ushosi", 5000);
console.log(acc.accountHolder);      
console.log(acc.getBalance()); 
