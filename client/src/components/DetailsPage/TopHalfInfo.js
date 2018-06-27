import React, { Component } from 'react';
import styled from 'styled-components';
import { Padding } from '../common/Spacing';
import Icon from '../Icon';
import { Box, Link } from '../common';

const StyledProfPic = styled.img`
    border-radius: 50%;
    display: block;
    margin: auto;
    width: 150px;
    height: 150px;
`;

let padBackToSearchLet = 0;

if (window.innerWidth > 600) {
    padBackToSearchLet = 12;
} else {
    padBackToSearchLet = 0;
}

const padBackToSearch = padBackToSearchLet;

const StyledMapPinIcon = styled(Icon)`
    margin-right: 3px;
`;

const StyledBackToSearchLink = styled(Link)`
    height: 45px;
    cursor: pointer;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    @media screen and (min-width: 600px) {
        position: absolute;
        display: block;
        margin-left: 3%;
    }
`;

const StyledBackToSearchTextBox = styled(Box)`
    float: left;
    line-height: 45px;
`;

const StyledBackToSearchIcon = styled(Icon)`
    float: left;
`;

class TopHalfInfo extends Component {
    render() {
        const obj = this.props.obj;
        let backToSearchLink;
        let backToSearchText;
        if (this.props.type === 'office') {
            backToSearchLink = '/office/search';
            backToSearchText = 'Back to office search';
        } else {
            backToSearchLink = '/dentist/search';
            backToSearchText = 'Back to dentist search';
        }
        return (
            <div className="center">
                <Padding bottom={padBackToSearch} />

                <Box mt={[3, 0]} mb={[2, 0]}>
                    <StyledBackToSearchLink to={backToSearchLink}>
                        <StyledBackToSearchIcon
                            icon="BackToSearch"
                            width="45px"
                        />
                        <StyledBackToSearchTextBox pl={10} color="#000">
                            {backToSearchText}
                        </StyledBackToSearchTextBox>
                    </StyledBackToSearchLink>
                </Box>

                {this.props.type === 'dentist' && (
                    <StyledProfPic
                        src={
                            obj && obj.user
                                ? obj.user.imageUrl
                                : 'https://lh5.googleusercontent.com/-pJtmF-TTUxk/AAAAAAAAAAI/AAAAAAAAAAA/6ULkoHqUkSo/photo.jpg?sz=300'
                        }
                        alt="Profile Picture"
                    />
                )}

                {this.props.type === 'dentist' && <Box mb={12} />}

                {this.props.type === 'office' ? (
                    <Box fontSize={36}>
                        {obj && obj.name ? obj.name : '_____'}
                    </Box>
                ) : (
                    <Box fontSize={36}>
                        {obj && obj.user ? `${obj.user.firstName} ${obj.user.lastName}` : '_____'}
                    </Box>
                )}

                {this.props.type === 'office' && (
                    <div>
                        <Box mb={12} />
                        <Box fontSize={17}>
                            <StyledMapPinIcon icon="map-pin" width="15px" />
                            {obj && obj.location ? obj.location : '_____'}
                        </Box>

                        <Padding bottom={18} />
                    </div>
                )}
            </div>
        );
    }
}

export default TopHalfInfo;
