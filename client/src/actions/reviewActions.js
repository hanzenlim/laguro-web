import Review from '../models/review';
import { CREATE_REVIEW, FETCH_REVIEWS } from './types';

export const queryReviews = (key, value) => async dispatch => {
    const reviews = await Review.query(key, value);
    dispatch({
        type: FETCH_REVIEWS,
        payload: reviews,
    });
};

export const createReview = values => async dispatch => {
    const review = await Review.create(values);
    dispatch({
        type: CREATE_REVIEW,
        payload: review,
    });
};

export const deleteReview = id => async () => {
    await Review.delete(id);
};
