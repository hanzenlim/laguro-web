import React from 'react';
import PropType from 'prop-types';
import { Pagination } from '~/components';

const SearchPaginationView = props => {
    const { total, current, onChange } = props;

    return <Pagination current={current} total={total} onChange={onChange} />;
};

SearchPaginationView.propTypes = {
    current: PropType.number,
    total: PropType.number,
    onChange: PropType.func,
};

export default SearchPaginationView;
