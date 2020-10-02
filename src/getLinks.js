const cheerio = require('cheerio');
const axios = require('axios');

async function getLinks(url) {
    if (url.indexOf('http') < 0) {
        url = `http://${url}`;
    }

    let domain = '';
    let externalLinks = {
        links: []
    };
    
    if (url.indexOf('www') > 0) {
        domain = url.substring(url.indexOf('www') + 4, url.lastIndexOf('.'));
    } else {
        domain = url.substring(url.indexOf('//') + 2, url.lastIndexOf('.'));
    }

    const response = await axios.get(url);
    const data = response.data;
    const $ = cheerio.load(data);

    let anchors = [];

    $('a').each(function() {
        const link = $(this).attr('href');
        if (!link.startsWith('/') && !link.startsWith('#') && !link.startsWith('tel')) {
            anchors.push(link);
        }
    });

    anchors.forEach(anchor => {
        if (!anchor.includes(domain)) {
            externalLinks.links.push(anchor);
        }
    });

    return(externalLinks);
};

module.exports = getLinks;