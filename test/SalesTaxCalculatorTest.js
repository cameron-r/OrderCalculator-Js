const assert = require('chai').assert;
const SalesTaxCalculator = require('../app/SalesTaxCalculator');
const salesTaxCalculator = new SalesTaxCalculator();

describe('SalesTaxCalculator', () => {
    /*
     As a client with simple needs
     I want to be able to add two numbers together
     So that I don't have to do the math myself
     */

    /*
     Given I pass two positive numbers to the calculator
     When I add the two numbers
     Then it should give a number back
     And that number should be equal to the sum of the numbers it received
     */
    describe('when adding two positive numbers', () => {
        let result;
        beforeEach(() => {
            result = salesTaxCalculator.addTwoNumbers(1, 2);
        });

        it('should return a number', () => {
            assert.isNumber(result);
        });
        it('should add the numbers it received', () => {
            assert.strictEqual(3, result);
        });
    });

    /*
     Given I pass letters as input to the calculator
     When I try adding the inputs together
     Then it should give "not a number" back
     */

    describe('when given letters as input', () => {
        let result = salesTaxCalculator.addTwoNumbers('k', 'j');

        it('should return NaN', () => {
            assert.isNaN(result);
        });
    });


    /*
     Given I pass books in my list of items
     When I calculate the tax
     Then it should charge 5% tax on those books
     */
    describe('Given a list of books', () => {

        describe('when I calculate the tax', () => {
            it('should charge 5% tax on those books', () => {
                let testBook = {
                    name: "hi world",
                    type: "book",
                    cost: 5
                };

                assert.strictEqual(salesTaxCalculator.calculateCostWithTax([testBook]), 5 * 1.05)
            })
        });

    });


    /*
     Given I pass it a list of items with food
     When I calculate the tax
     Then it should charge no tax on the food
     */
    describe('Given a list of food products', () => {
        describe('when I calculate the tax', () => {
            it('should charge no tax on those food products', () => {
                let pizzapizzapizza = {
                    name: "pizza",
                    type: "food",
                    cost: 4,
                };

                let bahnMiBoysBao = {
                    name: "bao",
                    type: "food",
                    cost: 5,
                };

                assert.strictEqual(salesTaxCalculator.calculateCostWithTax([pizzapizzapizza, bahnMiBoysBao]), 9)
            })
        })
    });

    /*
     Given I give it some normal items (not food, international, or books)
     When I calculate the tax
     Then it should charge tax equal to 10% of the cost of the items
     */
    describe('Given a list of normal items', () => {
        describe('when I calculate the tax', () => {
            it('should charge 10% tax on the normal items', () => {
                let bike = {
                    name: 'bike',
                    type: 'vehicle',
                    cost: 100
                };
                assert.closeTo(salesTaxCalculator.calculateCostWithTax([bike]), 110, 0.001);
            })
        })
    });

    /*
     Given I pass a list of mixed 'normal', book, and food items to the calculator
     When I calculate the tax
     Then it should charge the correct tax amount for the order
     */
    describe('Given a list of mixed items', () => {
        describe('when I calculate the tax', () => {
            it('should charge no tax on food, 5% tax on books and 10% tax on other items', () => {
                let plane = {
                    name: 'boeing-747',
                    type: 'vehicle',
                    cost: 1000000
                };
                let oatmeal = {
                    name: 'quaker',
                    type: 'food',
                    cost: 5
                };
                let book = {
                    name: '1984',
                    type: 'book',
                    cost: 20
                }

                assert.closeTo(salesTaxCalculator.calculateCostWithTax([plane, oatmeal, book]), 1100026, 0.001);
            });
        });
    });
});