import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import ReactStars from "react-stars";
import moment from 'moment';
import * as materialize from 'materialize-css/dist/js/materialize';
import Icon from './Icon';
import * as actions from "../actions";
import { Link, Grid} from './common';
import NewReview from './forms/NewReview';
import ReviewContainer from './ReviewContainer';
import { Padding } from './common/Spacing';
import Appointments from './Appointments';

import {
    USER,
    DENTIST,
    OFFICES,
    LISTINGS,
    RESERVATIONS,
    REVIEWS
} from '../util/strings';

const StyledResContentDiv = styled.div`
    && {
        width: 100%;
        font-size: 14px;
    }

`;

const Container = styled.div`
    padding: 0 7px;
    min-height: 100vh;
`;

const NameDiv = styled.div`
    font-size: 36px;
    margin-bottom: 1%;
`;

const InfoDiv = styled.div`
    margin-top: 0.7%;
    margin-bottom: 2%;
`;

const DetailsDiv = styled.div`
    display: block;
    margin-left: 4%;
    margin-right: 4%;
    margin-bottom: 15%;
    margin-top: 7%

    @media screen and (min-width : 600px) {
        margin-top: 0;
        margin-left: 25.5%;
        margin-right: 25.5%;
        margin-bottom: 4.5%;
    }
`

const DetailsHeadingDiv = styled.div`
    font-size: 24px;
    display: inline-block;
`;

const ShowMore = styled.div`
    margin-top: 2%;
    opacity: 0.4;
    font-size: 11px;
    text-decoration: underline;
    clear: both;
    cursor: pointer;
`;

const StaffEquipment = styled.div`
    font-size: 16px;
    line-height: 30px;
    color: #484E51;
`;

const DentistReviewsDiv = styled.div`
    margin-top: 4.5%;
    margin-bottom: 3%;
    position: relative;
`;

const DownArrow = styled(Icon)`
    margin-right: 1%;
`;

const BackToListingsDiv = styled.div`
    height: 45px;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 6%;
    margin-bottom: 3%;

    @media screen and (min-width : 600px) {
        position: absolute;
        display: block;
        margin-left: 3%;
        margin-top: 0.5%;
        margin-bottom: 0%;
    }
`;

const BackToListingsTextDiv = styled.div`
    float: left;
    line-height: 45px;
    padding-left: 10px;
`;

const BackToListingsIcon = styled(Icon)`
    float: left;
`;

const StyledReactStars = styled(ReactStars)`
    line-height: 34px;
    float: right;
`;

const StyledProfPic = styled.img`
    border-radius: 50%;
    display: block;
    margin: auto;
    width: 15%;
`;

class Profile extends Component {
    constructor () {
        super();
        this.state = { reviewRowNum: 1 };
        this.handleReviewShowMore = this.handleReviewShowMore.bind(this);
    }
    componentWillMount() {
        this.dentist_id = this.props.match.params.id;
        this.props
            .getDentist(
                this.dentist_id,
                USER,
                OFFICES,
                LISTINGS,
                RESERVATIONS,
                REVIEWS
            )
            .then(() => {
                const user = (this.props && this.props.dentist ? this.props.dentist.user : null);
                document.title = `Laguro - ${user ? user.name : ""}`;
                this.dentist_user_id = user ? user.id : "";
            });
    }

    handleReviewShowMore() {
        this.setState({
            reviewRowNum: this.state.reviewRowNum + 1,
        });
    }

    componentDidUpdate() {
        const elements = document.getElementsByClassName('dropdown-trigger');
        for (const el of elements) {
            materialize.Dropdown.init(el, {
                coverTrigger: false,
                closeOnClick: false,
                constrainWidth: false
            });
        }
    }

    renderProcedures(dentist) {
        if (dentist) {
            return dentist.procedures.map(proc => (
                <div key={proc.name}>
                    {proc.name} - ${proc.duration}
                </div>
            ));
        }
        return <div>No procedures Available</div>;
    }



    renderReservations() {
        const { auth, dentist, reservations } = this.props;

        if (reservations && reservations.length === 0 ) {
            return <div>Sorry no available appointment for now</div>
        }
        return reservations.map((reservation, index) => {
            const office = reservation.office;
            const officeImage =
                office.imageUrls.length === 0 ? '' : office.imageUrls[0];
            return (
                <Grid item xs={6}>
                    <div
                        key={index}
                        className="reservation card-panel grey lighten-5"
                    >
                        <Link
                            className="blue-text text-darken-2"
                            to={`/office/${office.id}`}
                        >
                            <div className="office_detail">
                                <img src={officeImage} alt="" />
                                <h6>{office.name}</h6>
                            </div>
                        </Link>
                        <StyledResContentDiv className="content">
                            <div className="top-bar">
                                <p>
                                    {moment(reservation.startTime).format(
                                        'MMM D, h:mm a - '
                                    )}
                                    {moment(reservation.endTime).format(
                                        'h:mm a'
                                    )}
                                </p>
                            </div>
                            <div>
                                <Appointments
                                    reservation={reservation}
                                    auth={auth}
                                    dentist={dentist}
                                />
                            </div>
                        </StyledResContentDiv>
                    </div>
                </Grid>
            );
        });
    }

    render() {
        const { dentist, auth, reviews } = this.props;

        // if dentist still hasn't loaded, wait for render
        if (!dentist || Object.keys(dentist).length === 0) {
            return <Container>Loading...</Container>;
        }

        // calculate avg rating
        if (reviews && reviews.length) {
            const dentistReviews = reviews.filter(
                review => review.reviewee_id === dentist.id
            );
            this.avg_rating =
                dentistReviews
                    .map(review => review.rating)
                    .reduce((acc, rating) => acc + rating, 0) /
                dentistReviews.length;
            this.rating_count = dentistReviews.length;
        } else {
            this.avg_rating = 0;
            this.rating_count = 0;
        }

        return (
            <div>
                <Padding bottomPerc={1.5} />

                <InfoDiv className="center">
                    <Link style={{ color: "#000" }} to={"/dentist/search"}>
                        <BackToListingsDiv>
                            <BackToListingsIcon icon="backToListings" width="45px" />
                            <BackToListingsTextDiv> Back to dentist search </BackToListingsTextDiv>
                        </BackToListingsDiv>
                    </Link>

                    <StyledProfPic src={(dentist && dentist.user) ? dentist.user.imageUrl : ""} alt="Profile Picture"></StyledProfPic>

                    <NameDiv>{dentist && dentist.user ? dentist.user.name : ""}</NameDiv>
                </InfoDiv>

                <DetailsDiv>
                    <DetailsHeadingDiv>
                        Procedures Available
                    </DetailsHeadingDiv>

                    <hr />


                    <StaffEquipment>
                        <Padding bottomPerc="1" />
                        {this.renderProcedures(dentist)}
                    </StaffEquipment>

                    <Padding topPerc={5} />

                    <DetailsHeadingDiv>
                        Available Appointments
                    </DetailsHeadingDiv>

                    <hr />

                    <Grid container spacing={8}>
                        {this.renderReservations(dentist, auth)}
                    </Grid>

                    <Padding topPerc={5} />

                    <DetailsHeadingDiv>
                        Reviews ({reviews.length})
                    </DetailsHeadingDiv>

                    <StyledReactStars
                        count={5}
                        edit={false}
                        size={20}
                        value={this.avg_rating}
                    />

                    <hr />

                    <DentistReviewsDiv>
                        {auth ? (
                            <NewReview
                                reviewee={dentist}
                                type={DENTIST}
                                reviewerId={auth.id}
                            />
                        ) : (
                            <NewReview
                                reviewee={dentist}
                                type={DENTIST}
                            />
                        )}

                        <Padding bottomPerc={2} />

                        <ReviewContainer
                            revieweeId={dentist.id}
                            revieweeName={dentist && dentist.user ? dentist.user.name : ""}
                            reviews={reviews}
                            rows={this && this.state ? this.state.reviewRowNum : 1}
                        />
                    </DentistReviewsDiv>

                    <ShowMore className="center" onClick={this.handleReviewShowMore}>
                        <DownArrow icon="downArrow" width="20px" />
                        Show more
                    </ShowMore>

                </DetailsDiv>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dentist: state.dentists.selectedDentist,
        listings: state.listings.all,
        reservations: state.reservations.all,
        reviews: state.reviews.all
    };
}
export default connect(mapStateToProps, actions)(Profile);
