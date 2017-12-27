import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Time from './Time';
import Section from './Section';
import ActivationContainer from '../containers/ActivationContainer';

const Timer = ({ scramble, time }) => (
  <div>
    <Section>
      <TimerTime>
        <Time ms={time} fontSize={6.2} />
      </TimerTime>
    </Section>
    <Section>
      <Scramble>{scramble.join(' ')}</Scramble>
    </Section>
    <Section>
      <ActivationContainer/>
    </Section>
  </div>
);

Timer.propTypes = {
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  time: PropTypes.number.isRequired
};

const TimerTime = styled.div`
  text-align: center;
  padding: ${props => props.theme.sizes.xl} 0;
`;

const Scramble = styled.p`
  font-size: 1.6rem;
  text-align: center;
  font-family: ${props => props.theme.monoFont};
  background-color: ${props => props.theme.colors.subtleBg};
  padding: ${props => props.theme.sizes.xs};
  margin: 0;
  font-weight: bold;
  border-radius: 3px;
`;

export default Timer