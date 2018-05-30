import React from 'react';
import styled from 'styled-components';

import notInAreaSVG from './icons/not-in-area.svg';
import exitSVG from './icons/exit.svg';

import { Grid, Typography } from './common';
import { OFFICE, DENTIST } from '../util/strings';

const Container = styled(Grid)`
    position: relative;
    padding: 45px 20px;
    width: 490px;
    border-radius: 2px;
    background-color: #ffffff;
    box-shadow: 0 2px 6px 4px rgba(200, 199, 199, 0.6);
`;

const Wrapper = styled(Grid)`
    max-width: 500px;
    flex-direction: column;
    width: 100%;

    @media (min-width: 600px) {
        flex-direction: row;
    }
`;

const ExitIcon = styled.img`
    width: 35px;
    height: 35px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
`;

const Image = styled.img`
    width: 121px;
    padding: 0 0 50px 0;

    @media (min-width: 600px) {
        width: 100px;
        padding: 0 20px 0 0;
    }
`;

const HeadingContainer = styled.div`
    font-size: 32px;
    padding-bottom: 26px;

    @media (min-width: 600px) {
        font-size: 18px;
        padding-bottom: 8px;
    }
`;

const SubHeadingContainer = styled.div`
    font-size: 24px;

    @media (min-width: 600px) {
        font-size: 14px;
    }
`;

const NoResults = props => {
    const { onClose, type } = props;

    return (
        <Container container justify="center" alignItems="center">
            <ExitIcon src={exitSVG} onClick={onClose} />
            <Wrapper container justify="center" alignItems="center">
                <Grid item>
                    <Image src={notInAreaSVG} />
                </Grid>
                <Grid item xs>
                    <HeadingContainer>
                        <Typography weight="bold">
                            No search results in your area
                        </Typography>
                    </HeadingContainer>
                    <SubHeadingContainer>
                        <Typography>
                            {type === DENTIST &&
                                'We didn’t find any dentists in your area.'}
                            {type === OFFICE &&
                                'We didn’t find any offices for rent in your area.'}
                        </Typography>
                    </SubHeadingContainer>
                </Grid>
            </Wrapper>
        </Container>
    );
};

export default NoResults;
