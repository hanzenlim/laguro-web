import elasticsearch from 'elasticsearch';

const esClient = new elasticsearch.Client({
    host: process.env.REACT_APP_ELASTIC_SEARCH_URL,
    levels: ['error'],
});

export default esClient;
