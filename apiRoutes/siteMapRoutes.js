/* eslint-disable no-console */
const esClient = require('../apiUtil/esClient');

const getItems = body => body.hits.hits.map(({ _source }) => _source);
async function searchEntity(isVerified, entity) {
    let searchResult;
    try {
        const response = await esClient.search({
            index: entity,
            from: 0,
            size: 1000,
            body: {
                _source: ['id', 'isVerified'],
                query: {
                    match: {
                        isVerified,
                    },
                },
            },
        });

        searchResult = await getItems(response);
    } catch (error) {
        console.log(error);
    }

    return searchResult;
}

function entitySiteMap(availableEntities, entityName, frequency) {
    let returnSiteMapXml = '';

    for (let index = 0; index < availableEntities.length; index++) {
        returnSiteMapXml += `
            <url>
                <loc>
                    https://www.laguro.com/${entityName}/${availableEntities[index].id}
                </loc>
                <changefreq>${frequency}</changefreq>
            </url>
        `;
    }

    return returnSiteMapXml;
}

const siteMapRoutes = app => {
    app.get('/sitemap.xml', async (req, res) => {
        const dentistResult = await searchEntity(true, 'dentists');
        const officeResult = await searchEntity(true, 'offices');

        res.set('Content-Type', 'text/xml');
        res.send(
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>https://www.laguro.com</loc>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url>
                <url>
                    <loc>https://www.laguro.com/office/search</loc>
                    <changefreq>always</changefreq>
                </url>
                <url>
                    <loc>https://www.laguro.com/dentist/search</loc>
                    <changefreq>always</changefreq>
                    <priority>1.0</priority>
                </url>
                <url>
                    <loc>https://www.laguro.com/onboarding/dentist/profile/</loc>
                    <changefreq>monthly</changefreq>
                </url>
                <url>
                    <loc>https://www.laguro.com/host-onboarding/add-office</loc>
                    <changefreq>monthly</changefreq>
                </url>
                <url>
                    <loc>https://www.laguro.com/blog</loc>
                    <changefreq>weekly</changefreq>
                </url>
                <url>
                    <loc>https://www.laguro.com/#how-it-works</loc>
                    <changefreq>yearly</changefreq>
                </url>
                <url>
                    <loc>https://www.laguro.com/#our-features</loc>
                    <changefreq>yearly</changefreq>
                </url>
                <url>
                    <loc>https://www.laguro.com/terms</loc>
                    <changefreq>yearly</changefreq>
                </url>
                <url>
                    <loc>https://www.laguro.com/privacy</loc>
                    <changefreq>yearly</changefreq>
                </url>
                ${entitySiteMap(dentistResult, 'dentist', 'monthly')}
                ${entitySiteMap(officeResult, 'office', 'monthly')}
            </urlset>`
        );
    });
};

module.exports = siteMapRoutes;
