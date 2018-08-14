import React from 'react';
import { shallow } from 'enzyme';
import queryString from 'query-string';
import ProgressBar from '../common/ProgressBar';
import NewDentist from '../forms/NewDentist';
import { LandlordOnboarding } from '../LandlordOnboarding';

jest.mock('query-string');

describe('<LandlordOnboarding />', () => {
    const defaultProps = {
        auth: { dentistId: 123 },
        computedMatch: {
            params: {
                step: 'add-office'
            }
        }
    };

    it('should show NewDentist modal if no user logged in', () => {
        let props = { ...defaultProps, auth: {} };
        queryString.parse.mockReturnValue({ officeId: 123 });
        const landlordOnboarding = shallow(<LandlordOnboarding {...props} />);

        expect(landlordOnboarding.find(NewDentist).props().open).toBe(
            true
        );
    });

    it('should hide NewDentist modal if user logged in', () => {
        queryString.parse.mockReturnValue({ officeId: 123 });
        const landlordOnboarding = shallow(
            <LandlordOnboarding {...defaultProps} />
        );

        expect(landlordOnboarding.find(NewDentist).props().open).toBe(
            false
        );
    });

    it('should show ProgressBar if officeId is undefined in urlParams', async () => {
        queryString.parse.mockReturnValue({ officeId: undefined });
        const landlordOnboarding = shallow(
            <LandlordOnboarding {...defaultProps} />
        );

        expect(landlordOnboarding.find(ProgressBar)).toHaveLength(1);
    });

    it('should not show ProgressBar if officeId is defined in urlParams', async () => {
        queryString.parse.mockReturnValue({ officeId: 123 });
        const landlordOnboarding = shallow(
            <LandlordOnboarding {...defaultProps} />
        );

        expect(landlordOnboarding.find(ProgressBar)).toHaveLength(0);
    });
});
