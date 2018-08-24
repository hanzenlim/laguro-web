import React, { PureComponent } from 'react';
import SearchBoxView from './view';

class SearchBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            date: '',
        };
    }

    handleLocationFilterChange = location => {
        this.setState({ location });
    };

    handleDateFilterChange = date => {
        this.setState({ date });
    };

    handleSubmit = () => {
        // eslint-disable-next-line
        console.log(this.state.location, this.state.date);
    };

    render() {
        return (
            <SearchBoxView
                onLocationFilterChange={this.handleLocationFilterChange}
                onDateFilterChange={this.handleDateFilterChange}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default SearchBox;
