import React from 'react';
import { shallow } from 'enzyme';
import FeaturedList from '../../../../pages/HomePage/FeaturedList';

describe('HomePage', () => {
    let component;

    beforeEach(() => {
        component = shallow(<FeaturedList />);
    });

    afterEach(() => {
        component = '';
    });

    it('should display six specialty boxes, two role boxes, and one explore image', () => {
        const specialties = component.find('[data-name="specialties"]');
        expect(specialties.children()).toHaveLength(6);

        const roleBoxes = component.find('[data-name="role-boxes"]').children();
        expect(roleBoxes).toHaveLength(2);

        roleBoxes.forEach(node => {
            expect(node.find('Image')).toHaveLength(1);
        });

        const explore = component.find('[data-name="explore"]');
        expect(explore.find('Image')).toHaveLength(1);
    });
});
