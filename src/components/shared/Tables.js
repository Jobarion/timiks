import styled from 'styled-components';
import { getColor } from '../../helpers/theme';

export const Tables = styled.table`
  width: 100%;
  overflow: auto;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const Cell = styled.td`
  text-align: ${props => (props.rightAlign ? 'right' : 'left')};
  border-top: 1px solid ${getColor('grey')};
  height: 3.6rem;
`;

export const HeadingCell = styled.th`
  text-align: ${props => (props.rightAlign ? 'right' : 'left')};
  border-bottom: 2px solid ${getColor('grey')};
  height: 3.6rem;
  font-weight: bold;
`;

export const SubtleHeadingCell = HeadingCell.extend`
  font-weight: normal;
`;
