import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { isEmpty } from 'lodash';
import moment from 'moment';
import Icon from '../Icon';
import * as actions from '../../actions';
import {
    REVIEWS,
    OFFICE_ID,
    END_TIME,
    HOST,
    STATUS,
    ACTIVE,
    ALL_RESERVATIONS
} from '../../util/strings';
import dentistProfileExists from '../../util/userInfo';
import { Box } from '../common';
import { Padding } from '../common/Spacing';
import OfficePlaceholderBig from '../images/office-placeholder-big.png';
import TopHalfInfo from './TopHalfInfo';
import isMobile from '../../util/uiUtil';
//eslint-disable-next-line
import DetailDetails from './DetailDetails';

const StyledCarouselImg = styled.img`
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: auto;
`;

const StyledPicBox = styled(Box)`
    position: relative;
    width: 100%;
`;

const StyledCarousel = styled(Carousel)`
    position: relative;
    @media screen and (min-width: 600px) {
        margin-top: 0;
    }
`;

const StyledCarouselButtonLeftIcon = styled(Icon)`
    margin-left: 15px;
    @media screen and (min-width: 600px) {
        margin-left: 50px;
    }
`;

const StyledCarouselButtonRightIcon = styled(Icon)`
    margin-right: 15px;
    @media screen and (min-width: 600px) {
        margin-right: 50px;
    }
`;

// for each breakpoint, height of picture will be a fractiohn of its width.
const picRatioArray = [window.innerWidth * 0.55, window.innerWidth * 0.37]

class Office extends Component {
    constructor() {
        super();
        this.state = {
            reviewRowNum: 1,
            isModalOpen: false
        };
    }

    componentDidMount() {
        this.office_id = this.props.match.params.office_id;
        this.props.getOffice(this.office_id, REVIEWS, HOST);
        this.props.queryListings(OFFICE_ID, this.office_id, {
            sortKey: END_TIME,
            rangeStart: moment()
                .utc()
                .format(),
            filters: [
                {
                    filterKey: `${STATUS}`,
                    filterValue: `${ACTIVE}`
                }
            ]
        });

        if (dentistProfileExists(this.props.auth)) {
            this.props.getDentist(this.props.auth.dentistId, ALL_RESERVATIONS);
        }
    }

    // check if user has had an reservation before, or has one currently with this office
    isUserVerified = () => {
        const { reservations } = this.props;
        if (reservations) {
            for (let res of reservations) {
                if (res && res.office && res.office.id === this.office_id) {
                    return true;
                }
            }
        }
        return false;
    };

    renderImages(office) {
        if (
            !(
                office.constructor === Object &&
                Object.keys(office).length !== 0
            ) ||
            (office && office.imageUrls && office.imageUrls.length === 0)
        ) {
            return [1, 2, 3].map(key => (
                <StyledPicBox pt={picRatioArray} key={key}>
                    <StyledCarouselImg
                        src={OfficePlaceholderBig}
                        alt="No image available"
                    />
                </StyledPicBox>
            ));
        } else {
            let imageUrls = office.imageUrls;

            if (Array.isArray(imageUrls)) {
                imageUrls = imageUrls.slice();
                imageUrls.splice(0, 0, imageUrls[imageUrls.length - 1]);
                imageUrls.splice(imageUrls.length - 1, 1);

                if (imageUrls.length < 3) {
                    imageUrls.push(imageUrls[0]);
                    if (imageUrls.length === 2) {
                        imageUrls.push(imageUrls[0]);
                    }
                }

                return imageUrls.map(url => (
                    <StyledPicBox pt={picRatioArray} key={url}>
                        <StyledCarouselImg src={url} alt="No image available" />
                    </StyledPicBox>
                ));
            }
            return null;
        }
    }

    render() {
        let { office, auth, reviews, listings } = this.props;
        const office_id = this.props.match.params.office_id;
        if (office.id && office.id.valueOf() !== office_id.valueOf()) {
            office = {};
            listings = [];
        } else if (
            !(office.constructor === Object && Object.keys(office).length !== 0)
        ) {
            listings = [];
        } else if (
            office &&
            office.listings &&
            office.listings.length < listings.length
        ) {
            listings = [];
        }

        return (
            <div>
                <StyledCarousel
                    renderCenterLeftControls={({ previousSlide }) => (
                        <StyledCarouselButtonLeftIcon
                            icon="carouselButtonLeft"
                            width="45px"
                            className="carousel-control"
                            onClick={previousSlide}
                        />
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                        <StyledCarouselButtonRightIcon
                            icon="carouselButtonRight"
                            width="45px"
                            className="carousel-control"
                            onClick={nextSlide}
                        />
                    )}
                    renderBottomCenterControls={() => <div />}
                    slidesToShow={isMobile() ? 1 : 3}
                    slideWidth={isMobile() ? 1 : 1.88}
                    cellSpacing={8}
                    cellAlign="center"
                    slideIndex={1}
                >
                    {this.renderImages(office)}
                </StyledCarousel>

                <TopHalfInfo type="office" obj={office} />

                <Padding bottom={12} />

                <DetailDetails
                    type="office"
                    auth={auth}
                    obj={office}
                    reviews={reviews}
                    listings={listings}
                    ownPage={
                        auth && office.host && auth.dentistId === office.host.id
                    }
                    isUserVerified={this.isUserVerified()}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        listings: state.listings.all,
        office: state.offices.selected,
        dentist: state.dentists.selectedDentist,
        auth: state.auth,
        reviews: state.reviews.all,
        reservations: isEmpty(state.reservations.all)
            ? null
            : state.reservations.all
    };
}

export default connect(mapStateToProps, actions)(Office);
