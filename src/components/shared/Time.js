import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as CustomPropTypes from '../../propTypes';
import { fillZeroes } from '../../helpers/formatting';
import { breakUpTime, getMs } from '../../helpers/time';
import { getColor } from '../../helpers/theme';

const Time = ({ secondsOnly, time: { ms, dnf, plus2 } }) => {
  if (dnf || ms === Infinity) {
    return monospace('DNF');
  }

  if (secondsOnly) {
    return <span>{formatPart(Math.ceil(ms / 1000))}</span>;
  }

  const { minutes, seconds, milliseconds } = breakUpTime(getMs({ ms, plus2 }));
  const showMinute = minutes > 0;

  return (
    <>
      {showMinute && formatPart(minutes, 2)}
      {showMinute && ':'}
      {formatPart(seconds, 2)}.{formatPart(milliseconds, 3)}
      {plus2 && <Plus2>(+2)</Plus2>}
    </>
  );
};

function formatPart(number, minChars) {
  return monospace(fillZeroes(String(number), minChars));
}

function monospace(string) {
  return string.split('').map((char, i) => <TimeNumber key={i}>{char}</TimeNumber>);
}

Time.propTypes = {
  time: CustomPropTypes.Time.isRequired,
  secondsOnly: PropTypes.bool
};

const Plus2 = styled.span`
  position: relative;
  top: -0.6em;
  border-radius: 3em;
  font-size: 0.5em;
  color: ${getColor('subtleFg')};
  margin-left: 0.3em;
`;

const TimeNumber = styled.span`
  display: inline-block;
  width: 0.55em;
  text-align: center;
`;

export default Time;
