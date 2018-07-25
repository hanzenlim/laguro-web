import React, { Component } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { Padding } from '../common/Spacing';
import Icon from '../Icon';
import { Box, Link } from '../common';
import history from '../../history';
import { isMobile } from '../../util/uiUtil';

const StyledProfPic = styled.img`
    border-radius: 50%;
    display: block;
    margin: auto;
    width: 150px;
    height: 150px;
`;

let padBackToSearch = 0;

if (isMobile()) {
    padBackToSearch = 0;
} else {
    padBackToSearch = 12;
}

const StyledMapPinIcon = styled(Icon)`
    margin-right: 3px;
`;

const StyledbackLinkUrl = styled(Link)`
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

const StyledbackLinkTextBox = styled(Box)`
    float: left;
    line-height: 45px;
`;

const StyledBackToSearchIcon = styled(Icon)`
    float: left;
`;

class TopHalfInfo extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);
    }

    render() {
        const obj = this.props.obj;
        let backLinkUrl;
        let backLinkText;
        let { referrer, dentistId } = this.urlParams;

        if (referrer === 'search') {
            if (this.props.type === 'office') {
                backLinkUrl = '/office/search';
                backLinkText = 'Back to office search';
            } else {
                backLinkUrl = '/dentist/search';
                backLinkText = 'Back to dentist search';
            }
        } else if (referrer === 'profile') {
            backLinkUrl = '/profile';
            backLinkText = 'Back to profile';
        } else if (referrer === 'dentist' && dentistId !== 'undefined') {
            backLinkUrl = `/dentist/${dentistId}`;
            backLinkText = 'Back to dentist page';
        }

        return (
            <div className="center">
                <Padding bottom={padBackToSearch} />

                {backLinkUrl !== undefined && (
                    <Box mt={[3, 0]} mb={[2, 0]}>
                        <StyledbackLinkUrl to={backLinkUrl}>
                            <StyledBackToSearchIcon
                                icon="BackToSearch"
                                width="45px"
                            />
                            <StyledbackLinkTextBox pl={10} color="#000">
                                {backLinkText}
                            </StyledbackLinkTextBox>
                        </StyledbackLinkUrl>
                    </Box>
                )}

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
                        {obj && obj.user
                            ? `${obj.user.firstName} ${obj.user.lastName}`
                            : '_____'}
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
