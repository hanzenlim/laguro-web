import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Search from './Search';

import HeroImg from './images/hero-img.png';
import HeroImgMobile from './images/cta-img-mobile.png';
import PhotoGrid from './PhotoGrid'
import Icon from './Icon';

import './css/Landing.css'

const SearchTabH5 = styled.h5`
    padding: 1.1rem 20px .66rem 20px;
    margin: 0;
    cursor: pointer;
    font-size: 1.40rem;
`;

const IconWithMargin = styled(Icon)`
    @media screen and (min-width : 541px) {
        margin-top: 5%;
    }
`;

export class LandingComponent extends Component {
    constructor() {
        super();
        this.state = {
            height: window.innerHeight,
            width: window.innerWidth,
            activeTab: 'dentist'
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.props.fetchOffices();
        this.props.fetchActiveDentists();
    }

    componentWillUnmount() {
        document.title = 'Laguro - Home';
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }

    tabChange = (e) => {
        const { tab } = e.target.dataset;
        this.setState({ activeTab: tab });
    }

    cta() {
        if (!(window.innerWidth <= 540)) {
            return (
                <img id="cta" src={HeroImg} alt='cta' />
            );
        } else {
            return (
                <img id="cta" src={HeroImgMobile} alt='cta' />
            );
        }
    }

    renderDentistVersion = () =>  {
        const mainIconWidth = (window.innerWidth >= 541)? '81px' : '45px';
        const { dentists } = this.props;
        return (
            <div>
                <div className="landing">
                    <div className="hero-search">
                        <IconWithMargin width={mainIconWidth} icon="logo" background="#FFFFFF" tooth="#0AD5B1" />
                        <div className="mission">
                            <h3 className="headline"> No Waiting Rooms.</h3>
                            <p className="explanation"> Find your next dentist or specialist and book an appointment in your neighborhood on your schedule.
                            </p>
                        </div>
                        <div className="search">
                            <div className="search-tabs">
                                <div className="tab">
                                    <SearchTabH5
                                        onClick={this.tabChange}
                                        id="dentist-tab"
                                        data-tab="dentist"
                                        className="search-tab active"
                                    >
                                        Find a Dentist
                                    </SearchTabH5>
                                </div>
                                <div className="tab inactive">
                                    <SearchTabH5
                                        onClick={this.tabChange}
                                        id="office-tab"
                                        data-tab="office"
                                        className="search-tab"
                                    >
                                        Rent an Office
                                    </SearchTabH5>
                                </div>
                            </div>
                            <div className="searchModule">
                                <Search search="dentist" />
                            </div>
                        </div>
                    </div>
                </div>
                <PhotoGrid data-name="dentist-photo-grid" numRow="2" page="landing" objects={dentists} header={'Popular Dentists'} type="dentist" message="No dentist has an available appointment. Please come back and check again."/>
            </div>);
    }

    renderOfficeVersion = () =>  {
        const mainIconWidth = (window.innerWidth >= 541)? '81px' : '45px';
        const { offices } = this.props;
        return (
            <div>
                <div className="landing">
                    <div className="hero-search">
                        <IconWithMargin width={mainIconWidth} icon="logo" background="#FFFFFF" tooth="#0AD5B1" />
                        <div className="mission">
                            <h3 className="headline"> No Empty Chairs.</h3>
                            <p className="explanation"> Search, discover and book a chair after-hours at a local clinic and see your patients on your terms. </p>
                        </div>
                        <div className="search">
                            <div className="search-tabs">
                                <div className="tab inactive">
                                    <SearchTabH5
                                        onClick={this.tabChange}
                                        id="dentist-tab"
                                        data-tab="dentist"
                                        className="search-tab"
                                    >
                                        Find a Dentist
                                    </SearchTabH5>
                                </div>
                                <div className="tab">
                                    <SearchTabH5
                                        onClick={this.tabChange}
                                        id="office-tab"
                                        data-tab="office"
                                        className="search-tab active"
                                    >
                                        Rent an Office
                                    </SearchTabH5>
                                </div>
                            </div>
                            <div className="searchModule">
                                <Search search="office" />
                            </div>
                        </div>
                    </div>
                </div>

                <PhotoGrid data-name="office-photo-grid" numRow="2" objects={offices} header={'New Listings'} type="office" message="All listings currently sold out! Don't worry, there will be more soon."/>
            </div>);
    }

    render() {

        return (
            <div>
                {this.state.activeTab === 'dentist' && this.renderDentistVersion()}
                {this.state.activeTab === 'office' && this.renderOfficeVersion()}
                <div id="cta-container">
                    {this.cta()}
                    <div id="cta-text">
                        <h2 className="cta-text-header"> Rent your Office </h2>
                        <h4 className="cta-text-blurb"> Have free space to share or have an open office? Rent your dental office with Laguro. </h4>
                        <Link id="get-started" to={'/landlord-onboarding/add-office'} className="login waves-effect btn white-text">Get Started</Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        offices: state.offices && state.offices.all && state.offices.all.map(office => {
            const { id, name, location } = office;
            return {
                id,
                name,
                location,
                //computing the average chairHourlyPrice and numChairsAvailable
                imageUrl: office.imageUrls[0],
                chairHourlyPrice:
                    office.listings && office.listings.map(listing => listing.chairHourlyPrice).reduce((a, b) => a + b) / office.listings.length,
                numChairsAvailable:
                    office.listings && office.listings.map(listing => listing.numChairsAvailable).reduce((a, b) => a + b) / office.listings.length,
                detailPageUrl: '/office/' + id
            };
        }),
        dentists: state.dentists && state.dentists.dentists && state.dentists.dentists.map(dentist => {
            const { id, procedures, location } = dentist;
            return {
                id,
                location,
                procedures,
                imageUrl: dentist.user.imageUrl,
                name: dentist.user.firstName + ' ' + dentist.user.lastName,
                detailPageUrl: '/dentist/' + id
            };
        })
    };
}

export default connect(mapStateToProps, actions)(LandingComponent);
