const https = require('https');

export default function handler(req, res) {
    const options = {
        hostname: 'www.tcmb.gov.tr',
        path: '/kurlar/today.xml',
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    };

    const externalReq = https.request(options, (externalRes) => {
        let data = '';

        externalRes.on('data', (chunk) => {
            data += chunk;
        });

        externalRes.on('end', () => {
            if (externalRes.statusCode >= 200 && externalRes.statusCode < 300) {
                res.setHeader('Content-Type', 'application/xml; charset=utf-8');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(data);
            } else {
                res.status(externalRes.statusCode).send('TCMB Sunucu Hatası: ' + externalRes.statusCode);
            }
        });
    });

    externalReq.on('error', (e) => {
        res.status(500).send('Hata: ' + e.message);
    });

    externalReq.end();
}