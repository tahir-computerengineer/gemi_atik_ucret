const https = require('https');

exports.handler = async function(event, context) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'www.tcmb.gov.tr',
            path: '/kurlar/today.xml',
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Content-Type': 'application/xml; charset=utf-8',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: data
                    });
                } else {
                    resolve({
                        statusCode: res.statusCode,
                        body: 'TCMB Sunucu Hatası: ' + res.statusCode
                    });
                }
            });
        });

        req.on('error', (e) => {
            resolve({
                statusCode: 500,
                body: 'Hata: ' + e.message
            });
        });

        req.end();
    });
};