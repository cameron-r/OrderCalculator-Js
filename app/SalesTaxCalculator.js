class SalesTaxCalculator {
    addTwoNumbers(number1, number2) {
        return number1 + number2;
    }

    calculateCostWithTax(items) {
        let sum = 0;
        for(let item of items) {
            if (item.type === "food") {
                sum += item.cost;
            } else if (item.type === "book") {
                sum += item.cost * 1.05;
            } else {
                sum += item.cost * 1.10;
            }
        }
        return sum;
    }
}

module.exports = SalesTaxCalculator;
