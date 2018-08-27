import React from 'react';
import { shallow } from 'enzyme';
import FeaturedList from '../../../../pages/LandlordLandingPage/FeaturedList';

describe('HomePage', () => {
    let component;

    beforeEach(() => {
        component = shallow(<FeaturedList />);
    });

    afterEach(() => {
        component = '';
    });

    it('should display two featured offices', () => {
        const featuredOffices = component
            .find('[data-name="featured-offices"]')
            .children();
        expect(featuredOffices).toHaveLength(2);

        featuredOffices.forEach(node => {
            expect(node.find('Image')).toHaveLength(1);
        });
    });
});
