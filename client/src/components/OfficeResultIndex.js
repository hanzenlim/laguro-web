import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import * as actions from '../actions';

import OfficeResult from './OfficeResult';
import ResultMap from './ResultMap';
import LocationFilter from './filters/LocationFilter';
import DateFilter from './filters/DateFilter';
import NoResults from './NoResults';
import { OFFICE } from '../util/strings';

import { Grid, Typography } from './common';
import { Padding } from './common/Spacing';
import { isMobile } from '../util/uiUtil';

const Container = styled.div`
    padding: 0 7px;
    min-height: 100vh;
`;

const MapContainer = styled.div`
    position: relative;
    height: 100%;
    min-height: 100vh;
`;

const OfficetListContainer = styled.div`
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
            activeView: 'list',
            activeListingId: null
        };
    }

    componentWillMount() {
        document.title = 'Laguro - Search Index';
        this.props.fetchOffices(this.props.filters);
    }

    renderMap(activeOffices) {
        if (isMobile() && this.state.activeView !== 'map')
            return null;

        return (
            <MapContainer>
                <ResultMap
                    activeListingId={this.state.activeListingId}
                    locations={activeOffices}
                    searchLocation={
                        this.props.filters.location
                            ? this.props.filters.location
                            : null
                    }
                />
            </MapContainer>
        );
    }

    setActiveListing = event => {
        const activeListingId = event.currentTarget.getAttribute('data-id');
        this.setState({ activeListingId });
    };

    removeActiveListing = () => {
        this.setState({ activeListingId: null });
    };

    renderOfficeList(activeOffices) {
        const searchInput = this.props.filters.location;

        if (searchInput && searchInput.length && !activeOffices.length) {
            return (
                <NoResults
                    onClose={this.handleClearSearchInput}
                    type={OFFICE}
                />
            );
        }

        return activeOffices.map((office, index) => {
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
                <div
                    data-id={office.id + office.location}
                    onMouseOver={this.setActiveListing}
                    onMouseOut={this.removeActiveListing}
                    key={office.id + office.location}
                >
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
                    />
                </div>
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
                {options.map((view, index) => (
                    <ViewOption
                        key={index}
                        onClick={() => this.toggleView(view)}
                        active={this.state.activeView === view}
                    >
                        <Typography fontSize={2} capitalize>
                            {view}
                        </Typography>
                    </ViewOption>
                ))}
            </ViewToggle>
        );
    };

    render() {
        const { filters } = this.props;
        if (this.props.invalid) {
            this.props.fetchOffices(filters);
        }

        if (this.props.isFetching) {
            return <LinearProgress />;
        }

        let activeOffices = this.props.offices;
        let filterDate = null;

        if (filters.date) {
            filterDate = moment(filters.date);
        }
        if (!filterDate && filters.values && filters.values.date) {
            filterDate = moment(filters.values.date);
        }
        if (filterDate) {
            const filterDay = filterDate.format('LL');
            activeOffices = activeOffices.filter(office => {
                const { listings } = office;
                for (let i = 0; i < listings.length; i += 1) {
                    const startDay = moment(listings[i].startTime).format('LL');
                    const endDay = moment(listings[i].endTime).format('LL');
                    if (
                        startDay === filterDay ||
                        endDay === filterDay ||
                        (startDay < filterDay && filterDay < endDay)
                    ) {
                        return true;
                    }
                }
                return false;
            });
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
                                <Typography fontSize={3} color="abbey">
                                    Dentist Office Rentals in{' '}
                                    <Typography fontWeight="bold">
                                        {this.props.filters.location}
                                    </Typography>
                                </Typography>
                            </Padding>
                        )}
                        <Padding bottom={12} />
                        <OfficetListContainer
                            show={this.state.activeView === 'list'}
                        >
                            {this.renderOfficeList(activeOffices)}
                        </OfficetListContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {this.renderMap(activeOffices)}
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

function getVisibleOffices(offices) {
    if (!offices) {
        return [];
    }
    // remove any offices greater than 35 miles away
    // if no location filter, office.distance is undefined and !!(undefined > 35) == false
    const nearbyOffices = offices.filter(office => {
        if (office.distance && office.distance.split(',').join('') > 35) {
            return false;
        }

        return true;
    });
    // sort offices within range, allows their labels to reflect order
    return nearbyOffices.sort((a, b) => a.distance - b.distance);
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
