import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import { Switch, Text, View } from 'react-native';

import FilterActions from '../redux/FilterRedux';


const switchStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between'
};

const VehiclyTypeSwitch = ({ label, mode, onChange }) => (
  <View style={switchStyle}>
    <Text>{label}</Text>
    <Switch value={mode} onValueChange={onChange} />
  </View>
);

class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'exp.json',
    },
  };

  render() {
    const {
      bus,
      tram,
      subway,
      train,
      ferry,
      toggleBus,
      toggleTram,
      toggleSubway,
      toggleTrain,
      toggleFerry
    } = this.props;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <VehiclyTypeSwitch label="Bus" mode={bus} onChange={toggleBus} />
        <VehiclyTypeSwitch label="Tram" mode={tram} onChange={toggleTram} />
        <VehiclyTypeSwitch label="Subway" mode={subway} onChange={toggleSubway} />
        <VehiclyTypeSwitch label="Train" mode={train} onChange={toggleTrain} />
        <VehiclyTypeSwitch label="Ferry" mode={ferry} onChange={toggleFerry} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  bus: state.filters.bus,
  tram: state.filters.tram,
  subway: state.filters.subway,
  train: state.filters.train,
  ferry: state.filters.ferry
});

const mapDispatchToProps = (dispatch) => ({
  toggleBus: (mode) => dispatch(FilterActions.toggleBus(mode)),
  toggleTram: (mode) => dispatch(FilterActions.toggleTram(mode)),
  toggleSubway: (mode) => dispatch(FilterActions.toggleSubway(mode)),
  toggleTrain: (mode) => dispatch(FilterActions.toggleTrain(mode)),
  toggleFerry: (mode) => dispatch(FilterActions.toggleFerry(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
