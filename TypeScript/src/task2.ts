interface Payment {
    amount: number;
    method: "card" | "upi" | "cash";
}

function processPayment(payment: Payment) {
    console.log(`Payment of ${payment.amount} done using ${payment.method}`);
}

processPayment({ amount: 2000, method: "upi" });
