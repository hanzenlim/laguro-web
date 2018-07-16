import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import ReactStars from 'react-stars';
import styled from 'styled-components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { reviewConditions } from './formValidation';
import * as actions from '../../actions';
import { Grid } from '../common/';
import { Padding } from '../common/Spacing';

import '../css/forms/NewReview.css';

const ReviewSubmitButton = styled(Button)`
    width: 100%;
    color: white;
    height: 3.9rem;

    && {
        text-transform: none;
        min-width: 0;
    }
`;

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#3E4446',
            main: '#3E4446',
            dark: '#3E4446',
            contrastText: '#FFFFFF'
        },
        secondary: {
            light: '#F15F14',
            main: '#F15F14',
            dark: '#F15F14',
            contrastText: '#FFFFFF'
        }
    }
});

const StyledTextArea = styled.textarea`
    float: left;
    display: block;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    ${props => props.larger && 'height: 100px;'}
    ${props => props.larger && 'line-height: 18px;'}
    ${props => props.larger && 'padding-top: 10px;'}
    ${props => !props.larger && 'height: 58px;'}
    ${props => !props.larger && 'line-height: 45px;'}
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 120px;

    @media screen and (min-width: 600px) {
        ${props => props.larger && 'height: 150px;'}
        ${props => props.larger && 'line-height: 18px;'}
        ${props => props.larger && 'padding-top: 19px;'}
        ${props => !props.larger && 'height: 58px;'}
        ${props => !props.larger && 'line-height: 54px;'}
    }
`;

const InputStarsDiv = styled.div`
    position: absolute;
    right: 21%;
    line-height: 58.5px;
`;

const StyledPadding = styled(Padding)`
    float: left;
`;

class NewReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 3
        };
    }

    onSubmit(values) {
        const { reset, reviewee, reviewerId, type } = this.props;
        const { rating } = this.state;
        this.props.createReview({
            ...values,
            rating,
            type,
            revieweeId: reviewee.id,
            reviewerId
        });
        reset();
    }

    renderTextArea = ({
        input,
        className,
        placeholder,
        meta: { touched, error }
    }) => {
        const larger = this.props.text !== undefined;
        return (
            <div data-name="review-input" className={className}>
                <StyledTextArea {...input} larger={larger} placeholder={placeholder} />
                {touched && error ? (
                    <StyledPadding top={10}>
                        <span className="red-text">{error}</span>
                    </StyledPadding>
                ) : (
                    <StyledPadding />
                )
                }
            </div>
        );};

    ratingChanged = newRating => {
        this.setState({ rating: newRating });
    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Grid container spacing={8}>
                    <Grid item xs={10}>
                        <div>
                            <Field
                                name="text"
                                placeholder={'Write a review'}
                                component={this.renderTextArea}
                                validate={reviewConditions}
                            />
                        </div>
                        <InputStarsDiv>
                            <ReactStars
                                count={5}
                                size={20}
                                onChange={this.ratingChanged}
                                half={false}
                                value={this.state.rating}
                            />
                        </InputStarsDiv>
                    </Grid>

                    <Grid item xs={2}>
                        <MuiThemeProvider theme={theme}>
                            <ReviewSubmitButton
                                variant="raised"
                                color="primary"
                                type="submit"
                            >
                                Submit
                            </ReviewSubmitButton>
                        </MuiThemeProvider>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

function mapStateToProps(state) {
    const selector = formValueSelector('newReview');
    return {
        auth: state.auth,
        text: selector(state, 'text')
    };
}

export default reduxForm({
    form: 'newReview',
    reviewConditions
})(connect(mapStateToProps, actions)(NewReview));
