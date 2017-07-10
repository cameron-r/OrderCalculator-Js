let ItemService;
let itemService;

const stubFetchWith = (mockObjectToReturn) => {
    jest.mock('node-fetch', () => {
        return jest.fn((url) => new Promise((resolve, reject) => {
            if (mockObjectToReturn)
                resolve({
                    json: () => mockObjectToReturn
                });
            else
                reject({
                    // extra logic for reject here
                });
        }))
    });
    ItemService = require('../app/ItemService');
    itemService = new ItemService();
};

beforeEach(() => {
    jest.resetAllMocks();
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

it('extracts items from the response', () => {
    stubFetchWith([{"name": "mocked response"}]);

    return itemService.getItems('myUrl').then(json => {
        expect(json[0].name).toBe("mocked response");
    });
});

it('getItems should call fetch with correct URL', done => {
    stubFetchWith([]);

    itemService.getItems('correct Url').then(json => {
        // harder to know what to do.. where do we have access to our mock function?
        done();
    })
});