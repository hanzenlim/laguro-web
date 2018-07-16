import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NewReview from '../forms/NewReview';

describe('Landing Component', () => {
    // Instantiate router context
    let spy = jest.fn();
    let spy2 = jest.fn();
    const initialState = {};
    const mockStore = configureStore();

    const mockProps = {
        createReview: spy,
        handleSubmit: spy2,
    }

    let store, component;

    beforeEach(() => {
        store = mockStore(initialState)
        component = mount(<Provider store={store}><NewReview {...mockProps}/></Provider>);
    });

    afterEach(() => {
        component = '';
    });

    it('should set the "larger" prop of the one and only textarea to false upon initial load and true when typing', () => {
        const textArea = component.find('[data-name="review-input"]');
        expect(textArea).toHaveLength(1);
        expect(textArea.find('textarea').prop('larger')).toBeFalsy;
        component.setProps({text: 'review_input'});
        expect(textArea.find('textarea').prop('larger')).toBeTruthy;
    })
})
