const cart = {
    items: [],
    addItems(item) {
        this.items.push(item);
    },
    showItems() {
        console.log("Items in the cart:");
        this.items.forEach((item) => {
            console.log(`${item}`);
        });
    }
};

cart.addItems("Laptop")
cart.addItems("Desktop")
cart.showItems()