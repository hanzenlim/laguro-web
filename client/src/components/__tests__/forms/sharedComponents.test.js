import { renderOptionsFromList } from '../../forms/sharedComponents';

describe('renderOptionsFromList', () => {
    const list = [
        { id: 1, name: 'cat' },
        { id: 2, name: 'dog' },
        { id: 3, name: 'bird' }
    ];

    it('should return an option for each item in list', () => {
        const renderedOptions = renderOptionsFromList(list);

        expect(renderedOptions.length).toEqual(list.length);
    });

    it('should return all enabled options if given no selected items', () => {
        const renderedOptions = renderOptionsFromList(list);
        const enabledOptions = renderedOptions.filter(
            option => option.props.disabled === false
        );

        expect(enabledOptions.length).toEqual(list.length);
    });

    it('should return all enabled options if given empty array of selected items', () => {
        const selectedOptions = [];
        const renderedOptions = renderOptionsFromList(list, selectedOptions);
        const enabledOptions = renderedOptions.filter(
            option => option.props.disabled === false
        );

        expect(enabledOptions.length).toEqual(list.length);
    });

    it('should return disabled options if any options are selected elsewhere', () => {
        const selectedOptions = [{ name: 'cat' }];
        const renderedOptions = renderOptionsFromList(list, selectedOptions);
        const disabledOptions = renderedOptions.filter(
            option => option.props.disabled === true
        );

        expect(disabledOptions.length).toEqual(selectedOptions.length);
    });
});
