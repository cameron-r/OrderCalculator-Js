const fetch = require('node-fetch');
// const fetch = require('isomorphic-fetch');
// require('whatwg-fetch');

class ItemService {

    getItems(url) {
        return fetch(url)
            .then(function(response) {
                // response.json()
                // Promise.resolve(response => response.json())
                return response.json();
            }).then(json => {
                Promise.resolve(json);
            });
    }
}

module.exports = ItemService;
