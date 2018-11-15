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

    it('should display text inside the top picture', () => {
        const heroShotText = component.find('Text');

        expect(heroShotText).toBeTruthy();
        expect(
            heroShotText
                .at(0)
                .childAt(0)
                .text()
        ).not.toEqual('');
    });
});
