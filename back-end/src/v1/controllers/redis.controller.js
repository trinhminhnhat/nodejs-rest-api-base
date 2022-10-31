'use strict';

const { setPromise, getPromise } = require('../services/redis.service');

module.exports = {
    setPromise: async (req, res, next) => {
        try {
            const { key, payload } = req.body;

            return res.json({
                data: await setPromise({
                    key,
                    value: JSON.stringify(payload),
                }),
            });
        } catch (error) {
            next(error);
        }
    },
    getPromise: async (req, res, next) => {
        try {
            const { key } = req.body;

            return res.json({
                data: JSON.parse(await getPromise(key)),
            });
        } catch (error) {
            next(error);
        }
    },
};
