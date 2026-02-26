function fetchProduct() {
    return new Promise((resolve, reject) => {
        let success = true;

        if (success) {
            resolve("Product data fetched");
        } else {
            reject("Error fetching product");
        }
    });
}

fetchProduct()
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
    .finally(() => console.log("Done"));