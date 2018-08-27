import React from 'react';
import { shallow } from 'enzyme';
import { NoReduxNewDentist } from '../../forms/NewDentist';

describe('<NewDentist />', () => {
    const defaultProps = {
        open: true,
        auth: {},
        initialize: jest.fn(),
        handleSubmit: jest.fn()
    };

    describe('onSubmit function', () => {
        it('should call createDentist and fetchUser if dentist has procedures', async () => {
            let props = {
                ...defaultProps,
                auth: { id: '123' },
                fetchUser: jest.fn(),
                createDentist: jest.fn(),
                onSuccess: jest.fn()
            };
            const newDentist = shallow(<NoReduxNewDentist {...props} />);
            let values = { foo: 'bar', procedures: ['foo'] };

            expect(
                newDentist.instance().props.createDentist
            ).toHaveBeenCalledTimes(0);
            expect(newDentist.instance().props.fetchUser).toHaveBeenCalledTimes(
                0
            );

            await newDentist.instance().onSubmit(values);

            expect(newDentist.instance().props.fetchUser).toHaveBeenCalledTimes(
                1
            );
            expect(
                newDentist.instance().props.createDentist
            ).toHaveBeenCalledTimes(1);
        });

        it('should call onSuccess if procedures are defined', async () => {
            let props = {
                ...defaultProps,
                onSuccess: jest.fn(),
                createDentist: jest.fn(),
                fetchUser: jest.fn()
            };
            const newDentist = shallow(<NoReduxNewDentist {...props} />);
            let values = { foo: 'bar', procedures: ['foo'] };

            expect(newDentist.instance().props.onSuccess).toHaveBeenCalledTimes(
                0
            );

            await newDentist.instance().onSubmit(values);

            expect(newDentist.instance().props.onSuccess).toHaveBeenCalledTimes(
                1
            );
        });
    });
});
