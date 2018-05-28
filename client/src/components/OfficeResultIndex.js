import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../actions';

import OfficeResult from './OfficeResult';
import ResultMap from './ResultMap';
import LocationFilter from './filters/LocationFilter';
import DateFilter from './filters/DateFilter';
import NoResults from './NoResults';
import { LISTINGS, REVIEWS, OFFICE } from '../util/strings';

import { Grid, Typography } from './common';
import { Padding } from './common/Spacing';

const Container = styled.div`
    padding: 0 7px;
    min-height: 100vh;
`;

const MapContainer = styled.div`
    position: relative;
    height: 100%;
    min-height: 100vh;

    @media (max-width: 600px) {
        ${props => !props.show && 'display: none;'};
    }
`;

const OfficetListContainer = styled.div`
    height: 100vh;
    ${props => !props.show && 'display: none;'};

    @media (min-width: 600px) {
        display: block;
    }
`;

const ViewToggle = styled.div`
    display: flex;
    height: 51px;
    width: 166px;
    border: 1px solid #c8c7c7;
    border-radius: 2px;
    background-color: #ffffff;
    margin-top: 12px;

    @media (min-width: 600px) {
        display: none;
    }
`;

const ViewOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    cursor: pointer;
    background-color: ${props => (props.active ? '#484E51' : '#FFFFFF')};
    color: ${props => (props.active ? '#FFFFFF' : '#484E51')};
`;

class OfficeResultIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeView: 'list'
        };
    }

    componentWillMount() {
        document.title = 'Laguro - Search Index';
        this.props.fetchOffices(this.props.filters, LISTINGS, REVIEWS);
    }

    renderMap() {
        return (
            <MapContainer show={this.state.activeView === 'map'}>
                <ResultMap
                    locations={this.props.offices}
                    google={window.google}
                    searchLocation={
                        this.props.filters.location
                            ? this.props.filters.location
                            : null
                    }
                />
            </MapContainer>
        );
    }

    renderOfficeList() {
        const filteredOffices = this.props.offices;
        const searchInput = this.props.filters.location;

        if (searchInput && searchInput.length && !filteredOffices.length) {
            return (
                <NoResults
                    onClose={this.handleClearSearchInput}
                    type={OFFICE}
                />
            );
        }

        return filteredOffices.map((office, index) => {
            const { reviews } = office;

            // calculate avg rating
            if (reviews && reviews.length) {
                this.avg_rating =
                    reviews
                        .map(review => review.rating)
                        .reduce((acc, rating) => acc + rating, 0) /
                    reviews.length;
                this.rating_count = reviews.length;
            } else {
                this.avg_rating = 0;
                this.rating_count = 0;
            }
            return (
                <OfficeResult
                    name={office.name}
                    location={office.location}
                    chairs={office.numChairs}
                    listings={office.listings}
                    avg_rating={this.avg_rating}
                    rating_count={this.rating_count}
                    img={office.imageUrls ? office.imageUrls[0] : null}
                    office_id={office.id}
                    index={index}
                    key={office.id}
                />
            );
        });
    }

    handleClearSearchInput = () => {
        this.props.updateFilters({ location: '' });
    };

    toggleView = view => {
        this.setState({
            activeView: view
        });
    };

    renderViewToggle = () => {
        const options = ['list', 'map'];

        return (
            <ViewToggle>
                {options.map(view => (
                    <ViewOption
                        onClick={() => this.toggleView(view)}
                        active={this.state.activeView === view}
                    >
                        <Typography size="t4" capitalize>
                            {view}
                        </Typography>
                    </ViewOption>
                ))}
            </ViewToggle>
        );
    };

    render() {
        if (this.props.invalid) {
            this.props.fetchOffices(this.props.filters, LISTINGS, REVIEWS);
        }

        if (this.props.isFetching) {
            return <Container>Loading...</Container>;
        }

        return (
            <Container>
                <Padding top={14} />
                <Grid container spacing={8}>
                    <Grid item xs={12} md={6}>
                        <LocationFilter
                            searchLocation={this.props.filters.location}
                        />
                        <Padding bottom={8} />
                        <DateFilter selectedDate={this.props.filters.date} />
                        {this.renderViewToggle()}
                        {this.props.filters.location && (
                            <Padding top={20}>
                                <Typography size="t3" color="abbey">
                                    Dentist Office Rentals in{' '}
                                    <Typography weight="bold">
                                        {this.props.filters.location}
                                    </Typography>
                                </Typography>
                            </Padding>
                        )}
                        <Padding bottom={12} />
                        <OfficetListContainer
                            show={this.state.activeView === 'list'}
                        >
                            {this.renderOfficeList()}
                        </OfficetListContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {this.renderMap()}
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

function getVisibleOffices(offices) {
    // remove any offices greater than 35 miles away
    // if no location filter, office.distance is undefined and !!(undefined > 35) == false
    const filteredOffices = offices.filter(office => {
        if (office.distance && office.distance.split(',').join('') > 35) {
            return false;
        }

        return true;
    });

    // sort offices within range, allows their labels to reflect order
    return filteredOffices.sort((a, b) => a.distance - b.distance);
}

function mapStateToProps(state) {
    return {
        offices: getVisibleOffices(state.offices.all),
        isFetching: state.offices.isFetching,
        invalid: state.offices.invalid,
        filters: state.filters
    };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
