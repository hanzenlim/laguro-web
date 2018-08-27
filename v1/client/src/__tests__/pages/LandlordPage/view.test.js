import React from 'react';
import { shallow } from 'enzyme';
import LandlordLandingPage from '../../../pages/LandlordLandingPage';

describe('Landlord', () => {
    let component;

    beforeEach(() => {
        component = shallow(<LandlordLandingPage />);
    });

    afterEach(() => {
        component = '';
    });

    it('should display text inside the top picture', () => {
        const heroShot = component.find('[data-name="hero-shot"]');
        const heroShotText = component.find('Text');

        expect(heroShot).toHaveLength(1);
        expect(heroShotText).toBeTruthy();
        expect(
            heroShotText
                .at(0)
                .childAt(0)
                .text()
        ).not.toEqual('');
    });
});
