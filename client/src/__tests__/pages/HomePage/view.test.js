import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../../pages/HomePage/view';

jest.mock('react-ga');

describe('HomePage', () => {
    let component;

    beforeEach(() => {
        component = shallow(<HomePage />);
    });

    afterEach(() => {
        component = '';
    });
});
