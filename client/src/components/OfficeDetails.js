import React, { Component } from 'react';
import Carousel from "nuka-carousel";
import styled from 'styled-components';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from './Icon';

// import "./css/OfficeDetails.css";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#3E4446',
            main: '#3E4446',
            dark: '#3E4446',
            contrastText: "#FFFFFF",
        },
        secondary: {
            light: '#F15F14',
            main: '#F15F14',
            dark: '#F15F14',
            contrastText: "#FFFFFF",
        },
    },
});

const theme2 = createMuiTheme({
    palette: {
        primary: {
            light: '#FFFFFF',
            main: '#FFFFFF',
            dark: '#FFFFFF',
            contrastText: "#666",
        },
    },
});

const NameDiv = styled.div`
    font-size: 36px;
    margin-bottom: 1%;
`;

const LocationDiv = styled.div`
    font-size: 17px;
    margin-bottom: 1%;
`;

const FeesDiv = styled.div`
    font-size: 17px;
    color: #484E51;
    margin-bottom: 7%;

    @media screen and (min-width : 600px) {
        margin-bottom: 2%;
    }
`;

const Container1 = styled.div`
    position: relative;
    width: 100%;
    padding-top: 73%;
`;

const Container2 = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
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
    margin-top: 5%;
    font-size: 24px;
    width: 78%;
    display: inline-block;

    @media screen and (min-width : 600px) {
        width: 86%;
    }
`;

const ShowMore = styled.div`
    margin-top: 2%;
    opacity: 0.4;
    font-size: 11px;
    text-decoration: underline;
    clear: both;
`;

const Description = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #484E51;
    margin-top: 3%;
`;

const StaffEquipment = styled.div`
    font-size: 17px;
    line-height: 0.8rem;
    color: #484E51;
    margin-top: 3.7%;
`;

const ReviewSubmitButton = styled(Button)`
    float: left;
    width: 18%;
    color: white;
    height: 3.9rem;
`;

const ReviewDiv = styled.div`
    float: left;
    font-size: 13px;
`;

const ReviewNameDiv = styled.div`
    font-weight: bold;
    margin-top: 3%;
    margin-bottom: 3%;
    font-size: 17px;
`;

const ReviewContentDiv = styled.div`
    float: none;
    font-weight: 500;
    font-size: 14px;
`;

const OfficeReviewsDiv = styled.div`
    margin-top: 4.5%;
    margin-bottom: 3%;
    position: relative;
`;

const StarIcon = styled(Icon)`
    margin-top: 9%;
    display: inline-block;
`;

const MapPinIcon = styled(Icon)`
    margin-right: 3px;
`;

const InputStarsDiv = styled.div`
    position: absolute;
    left: 48%;
    top: 4%;

    @media screen and (min-width : 600px) {
        left: 65%;
        top: 5%;
    }
`;

const DownArrow = styled(Icon)`
    margin-right: 1%;
`;

const OfficeCarousel = styled(Carousel)`
    margin-top: 3px;
    position: relative;

    @media screen and (min-width : 600px) {
        margin-top: 0;
    }
`;

const BookResButton = styled(Button)`
    width: 80%;
    height: 3.9rem;

    @media screen and (min-width : 600px) {
        width: 22%;
    }

`;

const ViewPhotosButton = styled(Button)`
    @media screen and (min-width : 600px) {
        width: 100%;
        height: 1.5rem;
    }
`;

const CarouselButtonLeft = styled(Icon)`
    margin-left: 15px;

    @media screen and (min-width : 600px) {
        margin-left: 50px;
    }
`;

const CarouselButtonRight = styled(Icon)`
    margin-right: 15px;

    @media screen and (min-width : 600px) {
        margin-right: 50px;
    }
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

const ViewPhotosButtonContainer = styled.div`
    display: none;

    @media screen and (min-width : 600px) {
        display: block;
    }
`

class OfficeDetails extends Component {

    constructor() {
        super();
        this.state = {
            height: window.innerHeight,
            width: window.innerWidth
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        document.title = 'Laguro - Home';
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }

    render() {
        return (
            <div>
                <OfficeCarousel
                    renderCenterLeftControls={({ previousSlide }) => (
                        <CarouselButtonLeft icon="carouselButtonLeft" width="45px" className="carousel-control" onClick={previousSlide}/>
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                        <CarouselButtonRight icon="carouselButtonRight" width="45px" className="carousel-control" onClick={nextSlide} />
                    )}
                    renderBottomLeftControls={({ action }) => (
                        <ViewPhotosButtonContainer>
                            <MuiThemeProvider theme={theme2}>
                                <ViewPhotosButton style={{ marginLeft: "85%", marginBottom: "8%", textTransform: "none", fontSize: "16px"}} variant="raised" color="primary" className="carousel-control" onClick={action}>
                                    View Photos
                                </ViewPhotosButton>
                            </MuiThemeProvider>
                        </ViewPhotosButtonContainer>
                    )}
                    slidesToShow={this.state.width >= 600 ? 3 : 1}
                    slideWidth={this.state.width >= 600 ? 1.88 : 1}
                    cellSpacing={8}
                    cellAlign="center"
                    slideIndex={1}>

                    <Container1>
                        <Container2 />
                        <img className="photo-grid-listing-img center" id={this.state.height} src={"http://bit.ly/dentistoffice2"} />
                    </Container1>

                    <Container1>
                        <Container2 />
                        <img className="photo-grid-listing-img center" id="element" src={"http://bit.ly/dentistoffice3"} />
                    </Container1>

                    <Container1>
                        <Container2 />
                        <img className="photo-grid-listing-img center" id="element" src={"http://bit.ly/dentistoffice4"} />
                    </Container1>

                    <Container1>
                        <Container2 />
                        <img className="photo-grid-listing-img center" id="element" src={"http://bit.ly/dentistoffice1"} />
                    </Container1>


                </OfficeCarousel>

                <InfoDiv className="center">
                    <BackToListingsDiv>
                        <BackToListingsIcon icon="backToListings" width="45px" />
                        <BackToListingsTextDiv> Back to Listings </BackToListingsTextDiv>
                    </BackToListingsDiv>

                    <NameDiv>
                        Albright Dental
                    </NameDiv>

                    <LocationDiv>
                        <MapPinIcon icon='map-pin' width="15px" />
                        Location: 6333 Telegraph Ave., Oakland, CA
                    </LocationDiv>

                    <div>

                    </div>

                    <FeesDiv>
                        Cleaning Fee - $20 | Rental Charge - 15%
                    </FeesDiv>

                    <MuiThemeProvider theme={theme}>
                        <BookResButton style={{
                            fontSize: '1.4rem',
                            fontWeight: 300,
                            textTransform: "none"
                        }} variant="raised" color="secondary">
                            Book Reservation
                        </BookResButton>
                    </MuiThemeProvider>
                </InfoDiv>


                <DetailsDiv>
                    <DetailsHeadingDiv>
                        Description
                    </DetailsHeadingDiv>

                    <hr />

                    <Description>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lorem sapien, posuere sed dolor nec, tincidunt bibendum sem. Aenean justo libero, pretium vel faucibus non, suscipit sed lacus. Integer vulputate mauris id ante rhoncus, quis tempus urna lacinia. Nam at sodales libero. Aliquam quis leo purus. Morbi orci dui, hendrerit nec augue id, imperdiet porttitor velit. In vitae imperdiet sem. Quisque porta ante lorem, in laoreet nunc egestas quis. Quisque porta ante lorem, in laoreet nunc egestas quis. Quisque porta ante lorem. Quisque porta ante lorem.
                    </Description>

                    <ShowMore className="center">
                        <DownArrow icon="downArrow" width="20px" />
                        Show more
                    </ShowMore>

                    <DetailsHeadingDiv>
                        Staff Available
                    </DetailsHeadingDiv>

                    <hr />

                    <StaffEquipment>
                        <p> RDA - $20 (1 available) </p>
                        <p> DA - $15 (1 available) </p>
                    </StaffEquipment>

                    <DetailsHeadingDiv>
                        Equipment Available
                    </DetailsHeadingDiv>

                    <hr />

                    <StaffEquipment>
                        <p> Pano - $20 </p>
                        <p> CBTCT - $15 </p>
                    </StaffEquipment>

                    <DetailsHeadingDiv>
                        Reviews (10)
                    </DetailsHeadingDiv>

                    <StarIcon icon="star" width="15px" />
                    <StarIcon icon="star" width="15px" />
                    <StarIcon icon="star" width="15px" />
                    <StarIcon icon="star" width="15px" />
                    <StarIcon icon="star" width="15px" />

                    <hr />

                    <OfficeReviewsDiv className="office-reviews">
                        <input placeholder="Write a review"/>

                        <InputStarsDiv>
                            <StarIcon icon="star" width="15px" />
                            <StarIcon icon="star" width="15px" />
                            <StarIcon icon="star" width="15px" />
                            <StarIcon icon="star" width="15px" />
                            <StarIcon icon="star" width="15px" />
                        </InputStarsDiv>

                        <MuiThemeProvider theme={theme}>
                            <ReviewSubmitButton variant="raised" color="primary">
                                Submit
                            </ReviewSubmitButton>
                        </MuiThemeProvider>


                        <Grid container spacing={40}>

                            <Grid item xs={6} sm={4}>
                                <ReviewDiv>
                                    <ReviewNameDiv>Ethel Joseph</ReviewNameDiv>
                                    <ReviewContentDiv>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lorem sapien, posuere sed dolor nec, tincidunt bibendum sem. Aenean justo libero, pretium vel faucibus non, suscipit sed lacus.
                                    </ReviewContentDiv>

                                    <StarIcon icon="star" width="15px" />
                                    <StarIcon icon="star" width="15px" />
                                    <StarIcon icon="star" width="15px" />
                                    <StarIcon icon="star" width="15px" />
                                    <StarIcon icon="star" width="15px" />

                                </ReviewDiv>
                            </Grid>

                            <Grid item xs={6} sm={4}>
                                <ReviewDiv>
                                    <ReviewNameDiv>Ethel Joseph</ReviewNameDiv>
                                    <ReviewContentDiv>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lorem sapien, posuere sed dolor nec, tincidunt bibendum sem. Aenean justo libero, pretium vel faucibus non, suscipit sed lacus.
                                    </ReviewContentDiv>

                                    <StarIcon icon="star" width="15px" />
                                    <StarIcon icon="star" width="15px" />
                                    <StarIcon icon="star" width="15px" />
                                    <StarIcon icon="star" width="15px" />
                                    <StarIcon icon="star" width="15px" />
                                </ReviewDiv>
                            </Grid>
                        </Grid>
                    </OfficeReviewsDiv>

                    <ShowMore className="center">
                        <DownArrow icon="downArrow" width="20px" />
                        Show more
                    </ShowMore>

                </DetailsDiv>
            </div>
        );

    }




}

export default OfficeDetails;
