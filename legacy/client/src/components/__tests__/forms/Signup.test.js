import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from '../../forms/Signup';

describe('<Signup />', () => {
    let component = '';

    beforeEach(() => {
        component = shallow(<Signup />);
    });

    afterEach(() => {
        component = null;
    });

    it('should call onSignupSuccess after signup promise gets resolved', async () => {
        const spy = jest.spyOn(component.instance(), 'onSignupSuccess');

        component.instance().signup = jest
            .fn()
            .mockReturnValue(Promise.resolve({}));

        await component.instance().onSubmit();
        await expect(spy).toHaveBeenCalled();
    });

    it('should call onSignupFail after signup promise gets rejected', async () => {
        const spy = jest.spyOn(component.instance(), 'onSignupFail');

        component.instance().signup = jest
            .fn()
            .mockReturnValue(Promise.reject({ message: 'ERROR' }));

        await component.instance().onSubmit();

        await expect(spy).toHaveBeenCalled();
    });

    it('should set error state when onSignupFail is called', () => {
        component.instance().onSignupFail('ERROR');
        expect(component.state('error')).toEqual('ERROR');
    });
});
