import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';

import styled from 'styled-components';

import { Typography, Card, Grid, Link } from './common';
import { Padding } from './common/Spacing';

const Container = styled(Card)`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`;

const ImageContainer = styled.div`
    height: 120px;
    width: 164px;
`;

const Image = styled.img`
    height: 120px;
    width: 164px;
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
                    <Typography size="t3" weight="regular" color="white">
                        {procedure.name}
                    </Typography>
                </Procedure>
            ));
        }
        return <div />;
    }

    imgUrl() {
        return this.props.img
            ? this.props.img
            : 'http://via.placeholder.com/200x200';
    }

    render() {
        return (
            <Link
                className="blue-text text-darken-2"
                to={`/dentist/${this.props.dentist_id}`}
            >
                <Container>
                    <Grid container>
                        <Grid item>
                            <Padding right={5}>
                                <ImageContainer>
                                    <Image src={this.imgUrl()} alt="Doctor" />
                                </ImageContainer>
                            </Padding>
                        </Grid>

                        <Grid item xs>
                            <DetailsContainer>
                                <Grid container>
                                    <Typography
                                        size="t2"
                                        weight="bold"
                                        color="black"
                                    >
                                        {this.props.name}
                                    </Typography>
                                </Grid>
                                <Padding bottom={5} />
                                <Grid container>
                                    <Typography
                                        size="t3"
                                        weight="regular"
                                        color="black"
                                    >
                                        {this.props.specialty} -{' '}
                                        {this.props.location}
                                    </Typography>
                                </Grid>
                                <Padding bottom={5} />
                                <Grid container alignItems="center">
                                    <ReactStars
                                        size="10"
                                        count={5}
                                        edit={false}
                                        value={this.props.rating_value}
                                    />
                                    <Padding right={7} />
                                    <Typography
                                        size="t4"
                                        weight="regular"
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
