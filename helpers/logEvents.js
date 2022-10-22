const fs = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');

const logEvents = async (message) => {
    const fileName = path.join(__dirname, '../logs', `${format(new Date(), 'dd-MM-yyyy')}-errors.log`);
    const dateTime = `${format(new Date(), 'dd-MM-yyyy HH:mm:ss')}`;
    const logContent = `${dateTime} - ${message}\n`;

    try {
        fs.appendFile(fileName, logContent);
    } catch (error) {
        console.log('error: ', error);
    }
};

module.exports = logEvents;
