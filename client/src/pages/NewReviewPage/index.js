import React, { Component } from 'react';
import queryString from 'query-string';
import { Container } from '../../components';
import NewReview from '../common/NewReview';

class NewReviewPage extends Component {
    constructor(props) {
        super(props);
        this.mappedData = queryString.parse(this.props.location.search);
    }

    render() {
        return (
            <Container>
                <NewReview info={this.mappedData} />
            </Container>
        );
    }
}
export default NewReviewPage;
