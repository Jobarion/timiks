import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Time from '../shared/Time';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faInfoCircle, faThumbsUp, faTimes } from '@fortawesome/fontawesome-pro-solid';
import ToggleContent from '../ToggleContent';
import Modal from '../shared/Modal';
import TimeDetails from './TimeDetails';
import * as CustomPropTypes from '../../propTypes';
import IconButton from '../shared/IconButton';
import { Cell } from '../shared/Tables';
import { SubtleText } from '../shared/Typography';
import CloudSyncIcon from '../shared/CloudSyncIcon';

const TimeTableTimeRow = ({ index, time, removeTime }) => (
  <tr>
    <TimeIndexCell>
      <SubtleText>{index + 1}.</SubtleText>
    </TimeIndexCell>
    <Cell>
      <Time time={time} />
      {time.best && (
        <TimeInfo>
          <BestTimeIcon>
            <FontAwesome icon={faThumbsUp} />
          </BestTimeIcon>
        </TimeInfo>
      )}
    </Cell>
    <Cell rightAlign>
      {time.stored && <CloudSyncIcon time={time} fixedWidth size="sm" />}
      <ToggleContent
        toggle={({ show }) => (
          <InfoIconButton onClick={show}>
            <FontAwesome icon={faInfoCircle} fixedWidth size="sm" />
          </InfoIconButton>
        )}
        content={({ hide }) => (
          <Modal title="Details" onClose={hide}>
            <TimeDetails
              time={time}
              onClose={hide}
              onRemoveTime={() => {
                hide();
                removeTime(time.id);
              }}
            />
          </Modal>
        )}
      />
      <RemoveItemIconButton onClick={() => removeTime(time.id)}>
        <FontAwesome icon={faTimes} fixedWidth size="sm" />
      </RemoveItemIconButton>
    </Cell>
  </tr>
);

TimeTableTimeRow.propTypes = {
  time: CustomPropTypes.Time.isRequired,
  index: PropTypes.number.isRequired,
  removeTime: PropTypes.func.isRequired
};

const TimeIndexCell = Cell.extend`
  width: 3rem;
`;

const TimeInfo = styled.span`
  padding-left: 1rem;
  color: ${props => props.theme.colors.subtleFg};
  font-size: 1.5rem;
`;

const BestTimeIcon = styled.span`
  color: ${props => props.theme.colors.green};
`;

const InfoIconButton = IconButton.extend`
  margin-left: 1rem;
  color: ${props => props.theme.colors.blue};
`;

const RemoveItemIconButton = IconButton.extend`
  margin-left: ${props => props.theme.sizes.xxs};
  color: ${props => props.theme.colors.red};
`;

export default React.memo(TimeTableTimeRow);
