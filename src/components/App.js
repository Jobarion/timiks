import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import TimerView from './timer/TimerView';
import ArchiveContainer from '../containers/archive/ArchiveContainer';
import Section from './shared/Section';

const App = () => (
  <div className="container">
    <Section margin="md">
      <Header />
    </Section>
    <Section margin="md">
      <Route exact path="/" component={TimerView} />
      <Route path="/archive" component={ArchiveContainer} />
    </Section>
  </div>
);

export default App;
