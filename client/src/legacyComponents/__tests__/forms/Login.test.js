import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../forms/Login';

describe('<Login />', () => {
    let component = '';

    beforeEach(() => {
        component = shallow(<Login />);
    });

    afterEach(() => {
        component = null;
    });

    it('should call onLoginSuccess after login promise gets resolved', async () => {
        const spy = jest.spyOn(component.instance(), 'onLoginSuccess');

        component.instance().login = jest
            .fn()
            .mockReturnValue(Promise.resolve({}));

        await component.instance().onSubmit();
        await expect(spy).toHaveBeenCalled();
    });

    it('should call onLoginFail after login promise gets rejected', async () => {
        const spy = jest.spyOn(component.instance(), 'onLoginFail');

        component.instance().login = jest
            .fn()
            .mockReturnValue(Promise.reject({ message: 'ERROR' }));

        await component.instance().onSubmit();

        await expect(spy).toHaveBeenCalled();
    });

    it('should set error state when onLoginFail is called', () => {
        component.instance().onLoginFail('ERROR');
        expect(component.state('error')).toEqual('ERROR');
    });
});
