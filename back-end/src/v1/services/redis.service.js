const client = require('../../databases/init.redis');

module.exports = {
    // Level 1 use promise
    setPromise: async ({ key, value }) => {
        try {
            return new Promise((resolve, reject) => {
                client.set(key, value, (error, result) => {
                    return !error ? resolve(result) : reject(error);
                });
            });
        } catch (error) {
            console.log('error setPromise: ', error);
        }
    },
    getPromise: async (key) => {
        try {
            return new Promise((resolve, reject) => {
                client.get(key, (error, result) => {
                    return !error ? resolve(result) : reject(error);
                });
            });
        } catch (error) {
            console.log('error getPromise: ', error);
        }
    },
};
