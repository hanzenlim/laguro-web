import styled from 'styled-components';
import theme from '../theme';
import { borderRadius } from 'styled-system';

const Image = styled.img`
    display: block;
    max-width: 100%;
    height: auto;
    ${borderRadius};
`;

Image.displayName = 'Image';

Image.defaultProps = {
    theme: theme,
};

export default Image;
