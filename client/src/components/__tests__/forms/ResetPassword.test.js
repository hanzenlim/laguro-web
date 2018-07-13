import React from 'react';
import { shallow } from 'enzyme';
import { ResetPassword } from '../../forms/ResetPassword';

describe('<ResetPassword />', () => {
    let component = '';

    beforeEach(() => {
        component = shallow(<ResetPassword />);
    });

    afterEach(() => {
        component = null;
    });

    it('should update message state on useResetPasswordRequest promise success', async () => {
        component.instance().useResetPasswordRequest = jest
            .fn()
            .mockReturnValue(Promise.resolve({ status: 'USED' }));

        await component.instance().onSubmit();
        expect(component.state('message')).toBe(
            'Your password has been changed. You can now log in with your new credentials.'
        );
    });

    it('should update message state on useResetPasswordRequest promise fail', async () => {
        component.instance().useResetPasswordRequest = jest
            .fn()
            .mockReturnValue(Promise.reject({ message: 'Invalid request.' }));

        await component.instance().onSubmit();
        expect(component.state('message')).toBe('Invalid request.');
    });
});
