import { Transaction } from "../model/transactions.js";

export class ExpenseService {

    private transactions: Transaction[] = [];

    constructor() {
        this.loadData();
    }

    loadData(): void {
        const stored = localStorage.getItem("transactions");
        this.transactions = stored ? JSON.parse(stored) : [];
    }

    saveData(): void {
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
    }

    addTransaction(title: string, amount: number, type: "income" | "expense", category: string, date: string): void {

        const newTransaction: Transaction = {
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

    removeTransaction(id: string): void {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveData();
    }

    updateTransaction(id: string, updatedData: Partial<Transaction>) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index === -1) throw new Error("Transaction not found");

        this.transactions[index] = {
            ...this.transactions[index],
            ...updatedData
        };

        this.saveData();
    }

    getTransactions(): Transaction[] {
        return this.transactions;
    }

    getBalance(): number {
        return this.transactions.reduce((balance, t) =>
            t.type === "income"
                ? balance + t.amount
                : balance - t.amount
        , 0);
    }

    getTotalIncome(): number {
        return this.transactions
            .filter(t => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
    }

    getTotalExpense(): number {
        return this.transactions
            .filter(t => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
    }

    getMonthlyBalance(month: number, year: number): number {
        return this.transactions
            .filter(t => {
                const d = new Date(t.date);
                return d.getMonth() === month && d.getFullYear() === year;
            })
            .reduce((balance, t) =>
                t.type === "income"
                    ? balance + t.amount
                    : balance - t.amount
            , 0);
    }
}