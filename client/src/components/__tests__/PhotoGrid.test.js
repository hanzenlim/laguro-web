import React from 'react';
import { mount } from 'enzyme';
import PhotoGrid from '../PhotoGrid';

describe('PhotoGrid Component', () => {
    let component;

    const offices = [
        {
            id: 'jest1',
            name: 'jestName',
            location: 'jestLocation',
            imageUrl: 'jestUrl',
            chairHourlyPrice: 'jestChairHourlyPrice',
            numChairsAvailable: 'jestNumChairsAvailable',
            detailPageUrl: `/office/jest1`
        }
    ];

    const dentists = [
        {
            id: 'jest1',
            name: 'jestName',
            location: 'jestLocation',
            imageUrl: 'jestUrl',
            detailPageUrl: `/office/jest1`,
            procedures: [{
                name: 'jestProcedureName',
                duration: 'jestProcedureDuration'
            }]
        }
    ];

    afterEach(() => {
        component = '';
    });

    it('should populate one office card when passing in a prop', () => {
        component = mount(<PhotoGrid objects={offices} numRow="2" />);
        const image = component.find('[data-name="image"]');
        const name = component.find('[data-name="name"]');
        const location = component.find('[data-name="location"]');
        const chairHourlyPrice = component.find('[data-name="chairHourlyPrice"]');

        expect(image).toHaveLength(1);
        expect(name).toHaveLength(1);
        expect(location).toHaveLength(1);
        expect(chairHourlyPrice).toHaveLength(1);

        expect(image.find('img').prop("src")).toEqual('jestUrl');
        expect(name.find('span').text()).toEqual('jestName');
        expect(location.find('span').text()).toEqual('jestLocation');
        expect(chairHourlyPrice.find('span').text()).toEqual('$jestChairHourlyPrice per hour on average - jestNumChairsAvailable chair(s) avail. usually');
    });

    it('should populate one dentist card when passing in a prop', () => {
        component = mount(<PhotoGrid objects={dentists} numRow="2" />);
        const image = component.find('[data-name="image"]');
        const name = component.find('[data-name="name"]');
        const location = component.find('[data-name="location"]');
        const procedures = component.find('[data-name="procedures"]');

        expect(image).toHaveLength(1);
        expect(name).toHaveLength(1);
        expect(location).toHaveLength(1);
        expect(procedures).toHaveLength(1);

        expect(image.find('img').prop("src")).toEqual('jestUrl');
        expect(name.find('span').text()).toEqual('jestName');
        expect(location.find('span').text()).toEqual('jestLocation');
        expect(procedures.find('span').text()).toEqual('jestProcedureName');
    });
})
