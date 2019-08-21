import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _keyBy from 'lodash/keyBy';

import {
    Box,
    Flex,
    Container,
    Text,
    Grid,
    Loading,
    Image,
    Truncate,
} from '../../components';

const colors = [
    '#f5a623',
    '#24519',
    '#417505',
    'text.blue',
    'text.darkBlue',
    'text.red',
];

// Wordpress data fetching hook
const useBlog = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogEntries = async () => {
            // fetch posts
            let response = await fetch(
                'https://blog.laguro.com/wp-json/wp/v2/posts?per_page=3&page=1'
            );
            const data = await response.json();

            // fetch categories
            response = await fetch(
                'https://blog.laguro.com/wp-json/wp/v2/categories'
            );
            const categoriesData = await response.json();
            const mappedCategoriesData = categoriesData.map(
                (catData, index) => ({
                    ...catData,
                    color: colors[index] || 'text.gray',
                })
            );
            const categoryDictionary = _keyBy(mappedCategoriesData, 'id');

            const mappedEntries = data.map(entry => {
                // Custom regex to remove unnecessary html tags in the excerpt
                const excerpt = entry.excerpt.rendered.replace(
                    /(<p>)|(\s\[&hellip;\]<\/p>)|(\s\s<a.{1,})/g,
                    ''
                );
                const categories = entry.categories.map(
                    catId => categoryDictionary[catId]
                );

                return {
                    id: entry.id,
                    title: entry.title.rendered,
                    excerpt,
                    imageUrl: entry.jetpack_featured_media_url,
                    entryUrl: entry.link,
                    categories,
                };
            });

            setEntries(mappedEntries);
            setLoading(false);
        };

        fetchBlogEntries();
    }, []);

    return { entries, loading };
};

// Blog Entries section
const BlogEntries = () => {
    const { entries, loading } = useBlog();

    return (
        <Box
            pt={[32, '', 104]}
            pb={[96, '', 216]}
            background={[
                'linear-gradient(to bottom, #f2efff, #f4f8ff 53%, #e7f0ff)',
                '',
                'linear-gradient(to bottom, #f6f3ff, #f6f9ff)',
            ]}
        >
            <Container>
                <Text
                    fontSize={[28, '', 50]}
                    fontFamily="IowanOldStyle"
                    fontWeight="bold"
                    lineHeight={1}
                    mb={[44, '', 62]}
                    textAlign="center"
                >
                    Learn with us
                </Text>

                {loading && <Loading />}
                {!loading && entries && (
                    <Grid
                        gridTemplateColumns={['1fr', '', '1fr 1fr 1fr']}
                        gridColumnGap={40}
                        gridRowGap={22}
                    >
                        {entries.map(entry => (
                            <Entry {...entry} key={entry.id} />
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

// Single Blog Entry
const Entry = ({ imageUrl, title, excerpt, entryUrl, categories }) => {
    const categoryId = Math.floor(
        Math.random() * Math.floor(categories.length)
    );

    return (
        <Flex
            flexDirection="column"
            bg="background.white"
            borderRadius={15}
            boxShadow="0 40px 40px 0 rgba(52, 129, 248, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 12px 12px 0 rgba(0, 0, 0, 0.1)"
            minHeight={['auto', '', 662]}
            style={{ overflow: 'hidden' }}
        >
            <Image src={imageUrl} alt={title} width="100%" />

            <Box
                flex={1}
                px={[30, '', 40]}
                py={[36, '', 40]}
                position="relative"
            >
                <Text
                    fontSize={[0, '', 2]}
                    fontWeight="bold"
                    mb={[8, '', 14]}
                    textTransform="uppercase"
                    color={categories[categoryId].color}
                >
                    {categories[categoryId].name}
                </Text>

                <Text
                    fontSize={[3, '', 22]}
                    fontWeight="medium"
                    mb={[30, '', 24]}
                    minHeight={['auto', '', 66]}
                >
                    <Truncate lines={2}>{title}</Truncate>
                </Text>

                <Text fontWeight="light" fontSize={[1, '', 3]} mb={30}>
                    <Truncate lines={4}>
                        <span
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                                __html: excerpt,
                            }}
                        />
                    </Truncate>
                </Text>

                <Text
                    is="a"
                    href={entryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="text.blue"
                    fontWeight="bold"
                    fontSize={[0, '', 3]}
                    textTransform="uppercase"
                    position={['static', '', 'absolute']}
                    bottom={66}
                    left={40}
                >
                    Read article
                </Text>
            </Box>
        </Flex>
    );
};

Entry.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    entryUrl: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            color: PropTypes.string,
        })
    ).isRequired,
};

export default BlogEntries;
