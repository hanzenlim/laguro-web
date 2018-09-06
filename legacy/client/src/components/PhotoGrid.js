import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import { Typography, Flex, Box } from './common';
import officeImagePlaceholder from './images/office-placeholder-thumbnail.png';
import { defaultProfilePhoto } from './Profile';
import { renderPrice } from '../util/paymentUtil';

import './css/PhotoGrid.css';

const maxNumProcedures = 4;

const StyledContainer = styled.div`
    position: relative;
    width: 100%;
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
    line-height: 22px;
`;

const ListingCard = styled(Card)`
    @media screen and (max-width: 540px) {
        margin-bottom: 3.5%;
    }
`;
const SoldOutDiv = styled.div`
    text-align: center;
    margin-top: 3%;
    margin-bottom: 3%;
    font-weight: bold;
    font-size: 25px;
`;

const Procedure = styled.div`
    min-height: 17px;
    height: auto;
    display: flex;
    align-items: center;
    background-color: #c8c7c7;
    border-radius: 2px;
    margin: 0 6px 4px 0;
    padding: 0 4px;
`;

class PhotoGrid extends Component {
    componentWillMount() {
        document.title = 'Laguro - Search Index';
    }

    renderProcedures = procedures =>
        procedures.slice(0, maxNumProcedures).map(procedure => (
            <Procedure key={procedure.name}>
                <Typography fontSize={3} fontWeight="regular" color="white">
                    {procedure.name}
                </Typography>
            </Procedure>
        ));

    render() {
        const { className, objects, header, message, type } = this.props;
        const dentistCardPadding = '100%';
        const officeCardPadding = '67%';
        const paddingTop =
            type === 'dentist' ? dentistCardPadding : officeCardPadding;

        let photoGridElements;
        if (objects) {
            if (objects.length === 0) {
                return (
                    <Box className={className} pt={3} pb={2}>
                        <SoldOutDiv> {message} </SoldOutDiv>
                    </Box>
                );
            }
            photoGridElements = objects.map(obj => {
                const objImg =
                    obj.imageUrl ||
                    (type === 'dentist'
                        ? defaultProfilePhoto
                        : officeImagePlaceholder);

                return (
                    <a href={`${obj.detailPageUrl}?referrer=home`} key={obj.id}>
                        <div className="col offset-s1 s10 m6 l3">
                            <ListingCard>
                                <div data-name="image">
                                    <StyledContainer style={{ paddingTop }}>
                                        <StyledImg
                                            className="center"
                                            id="element"
                                            alt={objImg}
                                            src={objImg}
                                        />
                                    </StyledContainer>
                                </div>
                                <Box p={2}>
                                    <ListingInfo>
                                        <div data-name="name">
                                            <Typography fontSize={3} truncate>
                                                {obj.name}
                                            </Typography>
                                        </div>
                                        <div data-name="location">
                                            <Typography fontSize={1} truncate>
                                                {obj.location.name}
                                            </Typography>
                                        </div>
                                        {obj.chairHourlyPrice && (
                                            <div data-name="chairHourlyPrice">
                                                <Typography
                                                    fontSize={1}
                                                    fontWeight={'light'}
                                                    truncate
                                                >
                                                    {`${renderPrice(
                                                        obj.chairHourlyPrice
                                                    )} per hour on average - ${
                                                        obj.numChairsAvailable
                                                    } chair(s) avail. usually`}
                                                </Typography>
                                            </div>
                                        )}
                                    </ListingInfo>
                                    <Box pb={2} />
                                    {obj.procedures && (
                                        <div data-name="procedures">
                                            <Flex>
                                                {this.renderProcedures(
                                                    obj.procedures
                                                )}
                                            </Flex>
                                        </div>
                                    )}
                                </Box>
                            </ListingCard>
                        </div>
                    </a>
                );
            });
        }

        photoGridElements =
            photoGridElements &&
            photoGridElements.slice(0, 4 * parseInt(this.props.numRow, 10));

        const StyledBox = styled(Box)`
            clear: both;
        `;

        return (
            <StyledBox mt={4} mx={4} className={className}>
                <h4 className="photo-grid-header"> {header} </h4>
                <div className="row">{photoGridElements}</div>
            </StyledBox>
        );
    }
}

export default PhotoGrid;
