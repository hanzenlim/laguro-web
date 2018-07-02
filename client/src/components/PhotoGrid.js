import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Card from '@material-ui/core/Card';
import * as actions from "../actions";
import { Padding } from './common/Spacing';
import { Typography } from './common';
import listingImgPlaceholder from './images/office-placeholder-thumbnail.png'

import "./css/PhotoGrid.css";

const StyledContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 67%;
    overflow: hidden;
`;

const StyledImg = styled.img`
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: auto;
`;

const ListingInfo = styled.div`
    color: black;
    padding: 8px;
    line-height: 22px;
`;

const ListingCard = styled(Card)`
    @media screen and (max-width : 540px)
    {
        margin-bottom: 3.5%;
    }
`
const SoldOutDiv = styled.div`
    text-align: center;
    margin-top: 3%;
    margin-bottom: 3%;
    font-weight: bold;
    font-size: 25px;
`;

class PhotoGrid extends Component {
    componentWillMount() {
        document.title = "Laguro - Search Index";
        if (this.props.listings.length === 0) {
            const active = true;
            this.props.fetchListings(active);
        }
    }

    render() {
        let photoGridElements;

        if (this.props.listings) {

            if (this.props.listings.length === 0) {
                return (
                    <Padding top={20} bottom={10}>
                        <SoldOutDiv> "All listings currently sold out! Don't worry, there will be more soon." </SoldOutDiv>
                    </Padding>
                )
            } else {
                var officesSoFar = {};

                photoGridElements = this.props.listings.filter(function(listing) {

                    if (officesSoFar.hasOwnProperty(listing.office.id)) {
                        return false;
                    } else {
                        officesSoFar[listing.office.id] = 0;
                        return true;
                    }

                }).map(listing => {
                    let listingImg;
                    if (listing.office.imageUrls && listing.office.imageUrls.length !== 0) {
                        listingImg = listing.office.imageUrls[0]
                    } else {
                        listingImg = listingImgPlaceholder;
                    }
                    return (
                        <a href={`/office/${listing.officeId}`} key={listing.id}>
                            <div className='col offset-s1 s10 m6 l3'>
                                <ListingCard>
                                    <div>
                                        <StyledContainer>
                                            <StyledImg className="center" id="element" alt={listing.office.imageUrls} src={listingImg} />
                                        </StyledContainer>
                                    </div>
                                    <ListingInfo>
              							<Typography fontSize={3} truncate>{listing.office.name}</Typography>
                                        <Typography fontSize={1} truncate>{listing.office.location}</Typography>
              							<Typography fontSize={1} fontWeight={"light"} truncate>${listing.chairHourlyPrice} per hour - {listing.numChairsAvailable} chairs avail.</Typography>
                                    </ListingInfo>
                                </ListingCard>
                            </div>
                        </a>
                    );
                });
            }


        }

        photoGridElements = photoGridElements.slice(0, 4 * parseInt(this.props.numRow, 10));

        const Div = styled.div`
            clear: both;
            margin-top: 3%;
            margin-left: 3%;
            margin-right: 3%;
        `
        return (
            <Div>
                <h4 className="photo-grid-header"> New Listings </h4>
                <div className="row">
                    {photoGridElements}
                </div>
            </Div>
        );
    }
}

function mapStateToProps(state) {
    return {
        offices: state.offices.all,
        isFetching: state.offices.isFetching,
        invalid: state.offices.invalid,
        listings: state.listings.all,
        reviews: state.reviews.all,
        filters: state.filters
    };
}

export default connect(mapStateToProps, actions)(PhotoGrid);
