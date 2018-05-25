import styled from 'styled-components';

export default styled.span`
  /* Font Sizes */
  font-size: inherit;
  ${props => props.size === 't1' && 'font-size: 24px;'}
  ${props => props.size === 't2' && 'font-size: 18px;'}
  ${props => props.size === 't3' && 'font-size: 16px;'}
  ${props => props.size === 't4' && 'font-size: 14px;'}
  ${props => props.size === 't5' && 'font-size: 12px;'}
  ${props => props.size === 't6' && 'font-size: 10px;'}

  /* Colors */
  color: inherit;
  ${props => props.color === 'carribean-green' && 'color: #0AD5B1;'}
  ${props => props.color === 'white' && 'color: #FFFFFF;'}
  ${props => props.color === 'black' && 'color: #000000'}
  ${props => props.color === 'abbey' && 'color: #484E51;'}
  ${props => props.color === 'silver' && 'color: #C8C7C7;'}

  /* Font Weights */
  font-weight: inherit;
  ${props => props.weight === 'regular' && 'font-weight: 400;'}
  ${props => props.weight === 'medium' && 'font-weight: 500;'}
  ${props => props.weight === 'bold' && 'font-weight: 700;'}

  /* Misc */
  ${props => props.underline && 'text-decoration: underline;'}
  ${props => props.capitalize && 'text-transform: capitalize;'}
`;
