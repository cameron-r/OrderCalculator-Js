require('./ItemService');

class SalesTaxCalculator {

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

    calculateCostWithTaxFromItemService(itemService) {
        let items = itemService.getItems();
        return this.calculateCostWithTax(items);
    }
}

module.exports = SalesTaxCalculator;
