import styled from 'styled-components';
import { space, color, fontSize, fontWeight } from 'styled-system';
import { truncate } from '../../../util/styleUtil'

export default styled.span`
  /* Cursors */
  ${props => props.cursor === 'pointer' && 'cursor: pointer;'}
  ${props => props.cursor === 'not-allowed' && 'cursor: not-allowed;'}
  ${props => props.cursor === 'help' && 'cursor: help;'}

  /* Misc */
  ${props => props.underline && 'text-decoration: underline;'}
  ${props => props.capitalize && 'text-transform: capitalize;'}
  ${props => props.truncate && truncate('auto')}

  ${space} ${color} ${fontSize} ${fontWeight}
`;
