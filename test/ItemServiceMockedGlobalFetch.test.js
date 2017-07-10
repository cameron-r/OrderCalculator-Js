global.fetch = require('jest-fetch-mock');

const ItemService = require('../app/ItemService');


let itemService;
describe('itemService', () => {
    beforeEach(() => {
        itemService = new ItemService();
    });

    it('example jest matchers', () => {
        // toBe uses ===
        expect(1 + 1).toBe(2);

        // toEqual checks fields recursively
        const data = {one: 1};
        data['two'] = 2;
        expect(data).toEqual({one: 1, two: 2});

        // .toBeDefined makes sure it's defined
        expect(data).toBeDefined();

        // .not checks the opposite of the matcher
        let undefinedVariable;
        expect(undefinedVariable).not.toBeDefined();
    });

    it('test with fetch-mock', done => {
        fetch.mockResponseOnce(JSON.stringify([{name: "mocked response"}]));

        itemService.getItems('myUrl').then(json => {
            expect(json[0].name).toBe("mocked response");
            done();
        });
    });

    it('getItems should call fetch with correct URL', done => {
        done();
    });

});