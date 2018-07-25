import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import * as actions from '../actions';

import DentistResult from './DentistResult';
import NoResults from './NoResults';
import LocationFilter from './filters/LocationFilter';
import DateFilter from './filters/DateFilter';
import ResultMap from './ResultMap';
import { DENTIST } from '../util/strings';

import { Grid, Typography } from './common';
import { Padding } from './common/Spacing';
import { isMobile } from '../util/uiUtil';
import history from '../history';

const Container = styled.div`
    padding: 0 7px;
    min-height: 100vh;
`;

const MapContainer = styled.div`
    position: relative;
    height: 100%;
    min-height: 100vh;
`;

const DentistListContainer = styled.div`
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

class DentistResultIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeView: 'list',
            activeListingId: null
        };
    }

    componentWillMount() {
        document.title = 'Laguro - Search Index';
        this.props.fetchActiveDentists(this.props.filters);
    }

    renderMap(activeDentists) {
        if (isMobile() && this.state.activeView !== 'map')
            return null;

        return (
            <MapContainer>
                <ResultMap
                    activeListingId={this.state.activeListingId}
                    locations={activeDentists}
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

    renderDentistList(activeDentists) {
        const searchInput = this.props.filters.location;

        if (searchInput && searchInput.length && !activeDentists.length) {
            return (
                <NoResults
                    onClose={this.handleClearSearchInput}
                    type={DENTIST}
                />
            );
        }

        return activeDentists.map((dentist, index) => {
            const reviews = dentist.reviews;
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
                    data-id={dentist.id + dentist.location}
                    onMouseOver={this.setActiveListing}
                    onMouseOut={this.removeActiveListing}
                    key={dentist.id + dentist.location}
                >
                    <DentistResult
                        name={`${dentist.user.firstName} ${
                            dentist.user.lastName
                        }`}
                        specialty={dentist.specialty}
                        location={dentist.location}
                        procedures={dentist.procedures}
                        rating_value={this.avg_rating}
                        rating_count={this.rating_count}
                        img={dentist.user.imageUrl}
                        dentist_id={dentist.id}
                        index={index}
                    />
                </div>
            );
        });
    }

    handleClearSearchInput = () => {
        this.props.updateFilters({ location: '' });
        history.push('/office/search');
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
            this.props.fetchActiveDentists(this.props.filters);
        }

        if (this.props.isFetching) {
            return <LinearProgress />;
        }

        let activeDentists = this.props.dentists;
        let filterDate = null;

        if (filters.date) {
            filterDate = moment(filters.date);
        }
        if (!filterDate && filters.values && filters.values.date) {
            filterDate = moment(filters.values.date);
        }
        if (filterDate) {
            const filterDay = filterDate.format('LL');
            activeDentists = activeDentists.filter(dentist => {
                const { schedule } = dentist;
                for (let i = 0; i < schedule.length; i += 1) {
                    const startDay = moment(schedule[i].startTime).format('LL');
                    const endDay = moment(schedule[i].endTime).format('LL');
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
                                    Dentists in{' '}
                                    <Typography fontWeight="bold">
                                        {this.props.filters.location}
                                    </Typography>
                                </Typography>
                            </Padding>
                        )}
                        <Padding bottom={12} />
                        <DentistListContainer
                            show={this.state.activeView === 'list'}
                        >
                            {this.renderDentistList(activeDentists)}
                        </DentistListContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {this.renderMap(activeDentists)}
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

function getVisibleDentists(dentists) {
    if (!dentists) {
        return [];
    }
    // remove any offices greater than 35 miles away
    // if no location filter, office.distance is undefined and !!(undefined > 35) == false
    const visibleDentists = dentists.filter(dentist => {
        if (dentist.distance > 35) {
            return false;
        }

        return true;
    });

    // sort offices within range, allows their labels to reflect order
    return visibleDentists.sort((a, b) => a.distance - b.distance);
}

function mapStateToProps(state) {
    return {
        dentists: getVisibleDentists(state.dentists.dentists),
        isFetching: state.dentists.isFetching,
        invalid: state.dentists.invalid,
        filters: state.filters
    };
}

export default connect(mapStateToProps, actions)(DentistResultIndex);
