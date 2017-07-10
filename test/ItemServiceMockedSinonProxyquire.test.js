require('sinon-stub-promise');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

let stubbedFetch = sinon.stub();

const ItemService = proxyquire('../app/ItemService', {
    'node-fetch': stubbedFetch
});

let itemService;


beforeEach(() => {
    stubbedFetch.restore();
});

describe('Jest', () => {
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
});

describe('ItemService', () => {

    it('extracts items from the response', done => {
        stubbedFetch.returnsPromise().resolves([{"name": "mocked response"}]);

        itemService.getItems('https://demo0522445.mockable.io/orders/123').then(json => {
            expect(json[0].name).toBe("mocked response");
            done();
        });
    });

    it('getItems should call fetch with correct URL', done => {
        stubbedFetch.returnsPromise().resolves([]);

        itemService.getItems('correct Url').then(json => {
            assert(stubbedFetch.calledWith('correct Url'));
            done();
        })
    });
});