import elasticsearch from 'elasticsearch';
import { elasticSearchUrl } from '../config/keys';

const esClient = new elasticsearch.Client({
    host: elasticSearchUrl,
    levels: ['error'],
});

export default esClient;
