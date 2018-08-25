import React from 'react';
import { shallow } from 'enzyme';
import { ForgotPassword } from '../../forms/ForgotPassword';

describe('<ForgotPassword />', () => {
    let component = '';
    let spy = jest.fn();

    beforeEach(() => {
        spy = jest.fn();
        component = shallow(<ForgotPassword onSuccess={spy} />);
    });

    afterEach(() => {
        component = '';
        spy = jest.fn();
    });

    it('should call onSuccess on sendForgotPasswordEmail promise success', async () => {
        component.instance().sendForgotPasswordEmail = jest
            .fn()
            .mockReturnValue(Promise.resolve({}));

        await component.instance().onSubmit();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should update error state on sendForgotPasswordEmail promise fail', async () => {
        component.instance().sendForgotPasswordEmail = jest
            .fn()
            .mockReturnValue(Promise.reject({ message: 'ERROR' }));

        await component.instance().onSubmit();
        expect(component.state('error')).toBe('ERROR');
    });
});
