import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ReactStars from 'react-stars';
import styled from 'styled-components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import * as actions from '../../actions';
import Grid from '../common/Grid';
import { getEntityName } from '../../util/entity';

import '../css/forms/NewReview.css';

const required = value => (value && value !== '' ? undefined : 'Required');

const ReviewSubmitButton = styled(Button)`
    width: 100%;
    color: white;
    height: 3.9rem;

    && {
        text-transform: none;
    }
`;

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

const TextArea = styled.textarea`
    float: left;
    display: block;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    height: 3.9rem;
    padding-left: 10px;
    border-radius: 5px;
    line-height: 45px;

    @media screen and (min-width : 600px) {
        line-height: 54.5px;
    }
`;

const InputStarsDiv = styled.div`
    position: absolute;
    left: 45%;
    line-height: 58.5px;

    @media screen and (min-width : 600px) {
        left: 66%;
    }
`;

class NewReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 3
        };
        const { reviewee, type } = this.props;
        this.name = getEntityName(reviewee, type);
    }

    onSubmit(values) {
        // console.log(this.props);

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
    }) => (
        <div className={className}>
            <TextArea
                {...input}
                placeholder={placeholder}
            />
            {touched && error && <span className="red-text">{error}</span>}
        </div>
    );

    ratingChanged = newRating => {
        this.setState({ rating: newRating });
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <form
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
            >
                <Grid container spacing={8}>
                    <Grid item xs={10}>
                        <div>
                            <Field
                                name="text"
                                placeholder={`Write a review`}
                                component={this.renderTextArea}
                                validate={required}
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
                            <ReviewSubmitButton variant="raised" color="primary" type="submit">
                                Submit
                            </ReviewSubmitButton>
                        </MuiThemeProvider>
                    </Grid>

                </Grid>
            </form>
        );
    }
}

export default reduxForm({
    form: 'newReview'
})(connect(null, actions)(NewReview));
