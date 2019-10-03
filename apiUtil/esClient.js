const elasticsearch = require('elasticsearch');

const elasticSearchUrl = process.env.REACT_APP_ELASTIC_SEARCH_URL;

const esClient = new elasticsearch.Client({
    host: elasticSearchUrl,
    levels: ['error'],
});

module.exports = esClient;
