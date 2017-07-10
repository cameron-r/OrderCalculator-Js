const sinon = require('sinon');
const sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

let mockedFetch = sinon.stub();

jest.mock('node-fetch', () => {
    return mockedFetch
});

const ItemService = require('../app/ItemService');
let itemService;

beforeEach(() => {
    mockedFetch.reset();
    itemService = new ItemService();
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

describe('ItemService with jest and sinon', () => {

    it('extracts items from the response', done => {
        const response = {json: () => [{name: "mocked item"}]};
        mockedFetch.withArgs("url1").returnsPromise().resolves(response);

        itemService.getItems('url1').then(json => {
            expect(json[0].name).toBe("mocked item");
            done();
        });
    });

    it('extracts items from the response 2', done => {
        const response = {
            json: () => [{name: "mocked item2"}]
        };
        mockedFetch.withArgs("url2").returnsPromise().resolves(response);

        itemService.getItems('url2').then(json => {
            expect(json[0].name).toBe("mocked item2");
            done();
        });
    });

    it('getItems should call fetch with correct URL', done => {
        const response = {json: () => []};
        mockedFetch.returnsPromise().resolves(response);

        itemService.getItems('correct Url').then(json => {
            expect(mockedFetch.calledWith('correct Url'));
            done();
        })
    });




    it.skip('throws an error on 404 using ', done => {
        const response = {
            json: () => {return {error: "couldn't find it!"}},
            ok: false,
            status: 404
        };
        mockedFetch.returnsPromise().resolves(response);

        itemService.getItems("url://not-found").then(err => {
            expect(err.msg).toBe("couldn't find it!");
            expect(err.status).toBe(404);
            done();
        });
    });

    it.skip('throws an error when it cannot parse the response json', done => {

    })

});