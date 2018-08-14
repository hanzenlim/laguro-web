import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { shape } from 'prop-types';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { LandingComponent } from '../Landing';

describe('Landing Component', () => {
    // Instantiate router context
    const router = {
        history: new BrowserRouter().history,
        route: {
            location: {},
            match: {},
        },
    };

    const mockProps = {
        fetchOffices: () => {},
        fetchActiveDentists: () => {},
        offices: [{id: 'id'}],
        dentists: [{
            id: 'id',
            procedures: [{name: 'procedure_name'}]
        }]
    }

    const initialState = {};

    const mockStore = configureStore();

    const createContext = () => ({
        context: { router },
        childContextTypes: { router: shape({}) },
    });

    const setupGoogleMock = () => {
        /*** Mock Google Maps JavaScript API ***/
        const google = {
            maps: {
                places: {
                    AutocompleteService: () => {},
                    PlacesServiceStatus: {
                        INVALID_REQUEST: 'INVALID_REQUEST',
                        NOT_FOUND: 'NOT_FOUND',
                        OK: 'OK',
                        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                        REQUEST_DENIED: 'REQUEST_DENIED',
                        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                        ZERO_RESULTS: 'ZERO_RESULTS',
                    },
                },
                Geocoder: () => {},
                GeocoderStatus: {
                    ERROR: 'ERROR',
                    INVALID_REQUEST: 'INVALID_REQUEST',
                    OK: 'OK',
                    OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                    REQUEST_DENIED: 'REQUEST_DENIED',
                    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                    ZERO_RESULTS: 'ZERO_RESULTS',
                },
            },
        };
        global.window.google = google;
    };
    let store, component;

    beforeEach(() => {
        setupGoogleMock();
        store = mockStore(initialState)
        component = mount(<Provider store={store}><LandingComponent {...mockProps}/></Provider>, createContext());
    });

    afterEach(() => {
        component = '';
    });

    it('should make dentist photoGrid active first', () => {
        expect(component.find('[data-name="office-photo-grid"]')).toHaveLength(0);
        expect(component.find('[data-name="dentist-photo-grid"]')).toHaveLength(1);
    });

    it('should make office photoGrid active when tabChange happens', () => {
        component.find('#office-tab').hostNodes().simulate('click');
        expect(component.find('[data-name="office-photo-grid"]')).toHaveLength(1);
        expect(component.find('[data-name="dentist-photo-grid"]')).toHaveLength(0);
    });
})
