const ItemService = require('../app/ItemService');

describe('Jest', () => {
    it('example jest matchers', () => {
        // toBe uses ===
        expect(1 + 1).toBe(2);

        // toEqual checks fields recursively
        const data = {one: 1, two: 2};
        // data['two'] = 2;
        expect(data).toEqual({two: 2, one: 1});

        // .toBeDefined makes sure it's defined
        expect(data).toBeDefined();

        // .not checks the opposite of the matcher
        let undefinedVariable;
        expect(undefinedVariable).not.toBeDefined();
    });
});

describe('ItemService', () => {
    let itemService;
    beforeEach(() => {
        itemService = new ItemService();
    });

    it('test jest async with real call', done => {

        itemService.getItems('https://demo0522445.mockable.io/orders/123').then(json => {
            expect(json[0].name).toBe("imported box of chocolate");
            done();
        });
    });
});