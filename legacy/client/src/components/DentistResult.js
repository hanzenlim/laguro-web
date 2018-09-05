import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';

import styled from 'styled-components';

import { Typography, Card, Grid, Link } from './common';
import { Padding, Margin } from './common/Spacing';
import { defaultProfilePhoto } from './Profile';

const Container = styled(Card)`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`;

const ImageContainer = styled.div`
    height: 140px;
    width: 170px;
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
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

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

class DentistResult extends Component {
    renderProcedures(procedures) {
        if (procedures.length) {
            return procedures.slice(0, 4).map(procedure => (
                <Procedure key={procedure.name}>
                    <Typography fontSize={3} fontWeight="regular" color="white">
                        {procedure.name}
                    </Typography>
                </Procedure>
            ));
        }
        return <div />;
    }

    imgUrl() {
        return this.props.img ? this.props.img : defaultProfilePhoto;
    }

    render() {
        return (
            <Link
                className="blue-text text-darken-2"
                to={`/dentist/${this.props.dentist_id}?referrer=search`}
            >
                <Container>
                    <Grid container>
                        <Grid item>
                            <Margin right={15}>
                                <ImageContainer>
                                    <Image src={this.imgUrl()} alt="Doctor" />
                                </ImageContainer>
                            </Margin>
                        </Grid>

                        <Grid item xs>
                            <DetailsContainer>
                                <Grid container>
                                    <Typography
                                        fontSize={4}
                                        fontWeight="bold"
                                        color="black"
                                    >
                                        {this.props.name}
                                    </Typography>
                                </Grid>
                                <Padding bottom={5} />
                                <Grid container>
                                    <Typography
                                        fontSize={3}
                                        fontWeight="regular"
                                        color="black"
                                    >
                                        {this.props.specialty} -{' '}
                                        {this.props.location.name}
                                    </Typography>
                                </Grid>
                                <Padding bottom={5} />
                                <Grid container alignItems="center">
                                    <ReactStars
                                        size={10}
                                        count={5}
                                        edit={false}
                                        value={this.props.rating_value}
                                    />
                                    <Padding right={7} />
                                    <Typography
                                        fontSize={2}
                                        fontWeight="regular"
                                        color="black"
                                    >{`(${
                                        this.props.rating_count
                                    }) Reviews`}</Typography>
                                </Grid>
                                <Padding bottom={7} />
                                <Grid container>
                                    {this.renderProcedures(
                                        this.props.procedures
                                    )}
                                </Grid>
                            </DetailsContainer>
                        </Grid>
                    </Grid>
                </Container>
            </Link>
        );
    }
}

export default connect(null)(DentistResult);
