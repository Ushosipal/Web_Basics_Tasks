import { ExpenseService } from "../service/expanseServices.js";
import { categories } from "../data/categories.js";
import { Transaction } from "../model/transactions.js";

export class UI {

    private editingId: string | null = null;

    constructor(private service: ExpenseService) {}

    initialize() {
        this.populateCategories();
        this.renderTransactions();
        this.renderDashboard();
        this.handleForm();
        this.handleFilters();
    }

    populateCategories() {
        const categorySelect = document.getElementById("category") as HTMLSelectElement;
        const filterCategory = document.getElementById("filterCategory") as HTMLSelectElement;

        categories.forEach(cat => {
            const option1 = new Option(cat, cat);
            const option2 = new Option(cat, cat);
            categorySelect.add(option1);
            filterCategory.add(option2);
        });
    }

    handleForm() {
        const form = document.getElementById("transactionForm") as HTMLFormElement;

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = (document.getElementById("title") as HTMLInputElement).value;
            const amount = Number((document.getElementById("amount") as HTMLInputElement).value);
            const type = (document.getElementById("type") as HTMLSelectElement).value as "income" | "expense";
            const category = (document.getElementById("category") as HTMLSelectElement).value;
            const date = (document.getElementById("date") as HTMLInputElement).value;

            if (this.editingId) {
                this.service.updateTransaction(this.editingId, { title, amount, type, category, date });
                this.editingId = null;
                form.querySelector("button")!.textContent = "Add Transaction";
            } else {
                this.service.addTransaction(title, amount, type, category, date);
            }

            form.reset();
            this.renderTransactions();
            this.renderDashboard();
        });
    }

    renderTransactions(transactions?: Transaction[]) {
        const list = document.getElementById("transactionList")!;
        list.innerHTML = "";

        const data = transactions || this.service.getTransactions();

        data.forEach(t => {
            const li = document.createElement("li");
            li.className = t.type;

            li.innerHTML = `
                <div>
                    <strong>${t.title}</strong><br>
                    ${t.category} | ${t.date}
                </div>
                <div>
                    ₹${t.amount}
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;

            li.querySelector(".delete")!.addEventListener("click", () => {
                this.service.removeTransaction(t.id);
                this.renderTransactions();
                this.renderDashboard();
            });

            li.querySelector(".edit")!.addEventListener("click", () => {
                this.loadToForm(t);
            });

            list.appendChild(li);
        });
    }

    loadToForm(t: Transaction) {
        (document.getElementById("title") as HTMLInputElement).value = t.title;
        (document.getElementById("amount") as HTMLInputElement).value = t.amount.toString();
        (document.getElementById("type") as HTMLSelectElement).value = t.type;
        (document.getElementById("category") as HTMLSelectElement).value = t.category;
        (document.getElementById("date") as HTMLInputElement).value = t.date;

        this.editingId = t.id;
        document.querySelector("form button")!.textContent = "Update Transaction";
    }

    renderDashboard() {
        const now = new Date();
        const monthBalance = this.service.getMonthlyBalance(now.getMonth(), now.getFullYear());

        document.getElementById("balance")!.textContent = this.service.getBalance().toString();
        document.getElementById("income")!.textContent = this.service.getTotalIncome().toString();
        document.getElementById("expense")!.textContent = this.service.getTotalExpense().toString();
        document.getElementById("monthly")!.textContent = monthBalance.toString();
    }

    handleFilters() {
        const filterCategory = document.getElementById("filterCategory") as HTMLSelectElement;

        filterCategory.addEventListener("change", () => {
            const category = filterCategory.value;
            if (category === "All") {
                this.renderTransactions();
            } else {
                const filtered = this.service.getTransactions().filter(t => t.category === category);
                this.renderTransactions(filtered);
            }
        });
    }
}