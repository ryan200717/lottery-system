const packageJson = require('../../package.json');

const getHealthCheckMsg = async (req, res, next) => res.send(`<html>
            <head>
                <title>Health Check</title>
            </head>
            <body>
            <p>Lottery System Backend in version ${packageJson.version}</p>
            </body>
        </html>
        `);

module.exports = {
    getHealthCheckMsg,
};
