import { categories } from "../data/categories.js";
export class UI {
    constructor(service) {
        this.service = service;
        this.editingId = null;
    }
    initialize() {
        this.populateCategories();
        this.renderTransactions();
        this.renderDashboard();
        this.handleForm();
        this.handleFilters();
    }
    populateCategories() {
        const categorySelect = document.getElementById("category");
        const filterCategory = document.getElementById("filterCategory");
        categories.forEach(cat => {
            const option1 = new Option(cat, cat);
            const option2 = new Option(cat, cat);
            categorySelect.add(option1);
            filterCategory.add(option2);
        });
    }
    handleForm() {
        const form = document.getElementById("transactionForm");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const amount = Number(document.getElementById("amount").value);
            const type = document.getElementById("type").value;
            const category = document.getElementById("category").value;
            const date = document.getElementById("date").value;
            if (this.editingId) {
                this.service.updateTransaction(this.editingId, { title, amount, type, category, date });
                this.editingId = null;
                form.querySelector("button").textContent = "Add Transaction";
            }
            else {
                this.service.addTransaction(title, amount, type, category, date);
            }
            form.reset();
            this.renderTransactions();
            this.renderDashboard();
        });
    }
    renderTransactions(transactions) {
        const list = document.getElementById("transactionList");
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
            li.querySelector(".delete").addEventListener("click", () => {
                this.service.removeTransaction(t.id);
                this.renderTransactions();
                this.renderDashboard();
            });
            li.querySelector(".edit").addEventListener("click", () => {
                this.loadToForm(t);
            });
            list.appendChild(li);
        });
    }
    loadToForm(t) {
        document.getElementById("title").value = t.title;
        document.getElementById("amount").value = t.amount.toString();
        document.getElementById("type").value = t.type;
        document.getElementById("category").value = t.category;
        document.getElementById("date").value = t.date;
        this.editingId = t.id;
        document.querySelector("form button").textContent = "Update Transaction";
    }
    renderDashboard() {
        const now = new Date();
        const monthBalance = this.service.getMonthlyBalance(now.getMonth(), now.getFullYear());
        document.getElementById("balance").textContent = this.service.getBalance().toString();
        document.getElementById("income").textContent = this.service.getTotalIncome().toString();
        document.getElementById("expense").textContent = this.service.getTotalExpense().toString();
        document.getElementById("monthly").textContent = monthBalance.toString();
    }
    handleFilters() {
        const filterCategory = document.getElementById("filterCategory");
        filterCategory.addEventListener("change", () => {
            const category = filterCategory.value;
            if (category === "All") {
                this.renderTransactions();
            }
            else {
                const filtered = this.service.getTransactions().filter(t => t.category === category);
                this.renderTransactions(filtered);
            }
        });
    }
}
