const SalesTaxCalculator = require('../app/SalesTaxCalculator');

jest.mock('../app/ItemService');
const ItemService = require('../app/ItemService');

jest.mock('../app/ItemService', () => {
    return jest.fn(() => 42);
});

describe('SalesTaxCalculator', () => {
    let salesTaxCalculator;

    beforeEach(() => {
        salesTaxCalculator = new SalesTaxCalculator();
    });

    /*
     Given I pass books in my list of items
     When I calculate the tax
     Then it should charge 5% tax on those books
     */
    describe('Given a list of books', () => {

        describe('when I calculate the tax', () => {
            it('should call ItemService', () => {
                ItemService.prototype.getItems = jest.mockImplementation(() => {
                    return [];
                });
                const itemService = new ItemService();

                salesTaxCalculator.calculateCostWithTaxFromItemService(itemService);
                console.log(itemService);



            });

            it('should charge 5% tax on those books', () => {
                let testBook = {
                    name: "hi world",
                    type: "book",
                    cost: 5
                };

                expect(salesTaxCalculator.calculateCostWithTax([testBook])).toBeCloseTo(5.25, 0.001);
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

                expect(salesTaxCalculator.calculateCostWithTax([pizzapizzapizza, bahnMiBoysBao])).toBe(9)
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
                expect(salesTaxCalculator.calculateCostWithTax([bike])).toBeCloseTo(110, 0.001);
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
                };

                expect(salesTaxCalculator.calculateCostWithTax([plane, oatmeal, book])).toBeCloseTo(1100026, 0.001);
            });
        });
    });
});