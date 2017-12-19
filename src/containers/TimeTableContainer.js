import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TimeTable from '../components/TimeTable';
import { removeTime } from '../actions';
import { calculateAverageTime, markBestTime } from '../helpers/times';

function mapStateToProps(state) {
  return {
    times: markBestTime(state.times.current),
    average: calculateAverageTime(state.times.current)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeTime }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);
