function processPayment(payment) {
    console.log(`Payment of ${payment.amount} done using ${payment.method}`);
}
processPayment({ amount: 2000, method: "upi" });
export {};
