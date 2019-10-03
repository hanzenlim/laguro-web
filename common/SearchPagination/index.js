import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import queryString from 'query-string';
import SearchPaginationView from './view';

class SearchPagination extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
        };

        this.urlParams = queryString.parse(this.props.location.search);
    }

    componentDidMount() {
        if (this.urlParams.page) {
            this.setState({
                page: Number(this.urlParams.page),
            });
        }
    }

    handlePaginationChange = page => {
        const search = {
            ...this.urlParams,
            page,
        };

        this.props.history.push({
            search: queryString.stringify(search),
        });

        this.setState({ page });
    };

    render() {
        return (
            <SearchPaginationView
                total={this.props.total}
                current={this.state.page}
                onChange={this.handlePaginationChange}
            />
        );
    }
}

export default withRouter(SearchPagination);
