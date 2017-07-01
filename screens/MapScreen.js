import React from 'react'
import { MapView } from 'expo';
import { connect } from 'react-redux';

import HslActions from '../redux/HslRedux';


class MapScreen extends React.Component {
  render() {
    if (!this.props.streaming) {
      this.props.start();
    }

    return <MapView style={{ flex: 1 }} />;
  }
}

const mapStateToProps = (state) => ({
  streaming: state.hsl.streaming
});

const mapDispatchToProps = (dispatch) => ({
  start: () => dispatch(HslActions.start()),
  stop: () => dispatch(HslActions.stop())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
