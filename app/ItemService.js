// const fetch = require('node-fetch');
// const fetch = require('isomorphic-fetch');
require('whatwg-fetch');

class ItemService {

    getItems(url) {
        return fetch(url)
            .then(function(response) {
                return response.json();
            });
    }
}

module.exports = ItemService;

