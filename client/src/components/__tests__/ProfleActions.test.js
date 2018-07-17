import React from 'react';
import { shallow } from 'enzyme';
import { ProfileActions } from '../ProfileActions';
import Provider from '../../models/provider';

global.confirm = jest.fn();
global.alert = jest.fn();

jest.mock('../../models/provider');

describe('<ProfileActions />', () => {
    const auth = { id: 'user123' };
    const authWithDentist = { id: 'user123', dentistId: 'dentist123' };
    const dentist = { id: 'dentist123' };

    describe('dentist profile does not exist', () => {
        it('should not render the OD reset password link', () => {
            const component = shallow(
                <ProfileActions auth={auth} dentist={null} />
            );
            expect(
                component.find('[data-name="resetProviderPassword"]')
            ).toHaveLength(0);
        });
    });

    describe('dentist profile exists', () => {
        it('should not render the OD reset password link', () => {
            const component = shallow(
                <ProfileActions auth={authWithDentist} dentist={dentist} />
            );
            expect(
                component.find('[data-name="resetProviderPassword"]')
            ).toHaveLength(1);
        });
    });

    describe('resetProviderPassword', () => {
        global.confirm.mockReturnValue(true);

        describe('successfully resets the password', () => {
            it('alerts the success message', async () => {
                const component = shallow(
                    <ProfileActions auth={authWithDentist} dentist={dentist} />
                ).instance();
                await component.resetPassword();
                expect(alert).toHaveBeenCalledWith(
                    'Check email for you new Open Dental credentials.'
                );
            });
        });

        describe('fails to reset the password', () => {
            it('alerts the success message', async () => {
                const component = shallow(
                    <ProfileActions auth={authWithDentist} dentist={dentist} />
                ).instance();
                Provider.resetPassword.mockImplementation(() => {
                    throw new Error('');
                });
                await component.resetPassword();
                expect(alert).toHaveBeenCalledWith(
                    'Something went wrong. Please try again later.'
                );
            });
        });
    });
});
