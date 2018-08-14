import React from 'react';
import { shallow } from 'enzyme';
import { EditPassword } from '../../forms/EditPassword';
import User from '../../../models/user';

jest.mock('../../../models/user');

describe('<EditPassword />', () => {
    let component = '';

    beforeEach(() => {
        component = shallow(<EditPassword auth={{ id: 'user113' }} />);
    });

    afterEach(() => {
        component = null;
    });

    const values = { newPassword: '123', currentPassword: '1234' };

    it('should update message state when updating password succeeds', async () => {
        User.editPassword.mockReturnValue('some nonnull value');

        await component.instance().onSubmit(values);
        expect(component.state('message')).toBe(
            'Your password has been changed. You can now log in with your new credentials.'
        );
    });

    it('should update error state to display incorrect password', async () => {
        User.editPassword.mockImplementation(() => {
            throw new Error('Incorrect password!');
        });

        await component.instance().onSubmit(values);
        expect(component.state('error')).toBe('Incorrect password!');
    });

    it('should update error state when edit password throws an error', async () => {
        User.editPassword.mockImplementation(() => {
            throw new Error('');
        });

        await component.instance().onSubmit(values);
        expect(component.state('error')).toBe(
            'Something went wrong. Please try again later.'
        );
    });
});
