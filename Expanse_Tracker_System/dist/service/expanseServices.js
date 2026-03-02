export class ExpenseService {
    constructor() {
        this.transactions = [];
        this.loadData();
    }
    loadData() {
        const stored = localStorage.getItem("transactions");
        this.transactions = stored ? JSON.parse(stored) : [];
    }
    saveData() {
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
    }
    addTransaction(title, amount, type, category, date) {
        const newTransaction = {
            id: Date.now().toString(),
            title,
            amount,
            type,
            category,
            date
        };
        this.transactions.push(newTransaction);
        this.saveData();
    }
    removeTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveData();
    }
    updateTransaction(id, updatedData) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index === -1)
            throw new Error("Transaction not found");
        this.transactions[index] = Object.assign(Object.assign({}, this.transactions[index]), updatedData);
        this.saveData();
    }
    getTransactions() {
        return this.transactions;
    }
    getBalance() {
        return this.transactions.reduce((balance, t) => t.type === "income"
            ? balance + t.amount
            : balance - t.amount, 0);
    }
    getTotalIncome() {
        return this.transactions
            .filter(t => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
    }
    getTotalExpense() {
        return this.transactions
            .filter(t => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
    }
    getMonthlyBalance(month, year) {
        return this.transactions
            .filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === month && d.getFullYear() === year;
        })
            .reduce((balance, t) => t.type === "income"
            ? balance + t.amount
            : balance - t.amount, 0);
    }
}
