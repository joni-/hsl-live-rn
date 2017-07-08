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

const VehicleTypeSwitch = ({ label, mode, onChange }) => (
  <View style={switchStyle}>
    <Text>{label}</Text>
    <Switch value={mode} onValueChange={onChange} />
  </View>
);

class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Settings',
    },
  };

  render() {
    const {
      filters,
      updateFilters,
      toggleBus,
      toggleTram,
      toggleSubway,
      toggleTrain,
      toggleFerry
    } = this.props;

    const { bus, tram, subway, train, ferry } = filters;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <VehicleTypeSwitch label="Bus" mode={bus} onChange={toggleBus} />
        <VehicleTypeSwitch label="Tram" mode={tram} onChange={toggleTram} />
        <VehicleTypeSwitch label="Subway" mode={subway} onChange={toggleSubway} />
        <VehicleTypeSwitch label="Train" mode={train} onChange={toggleTrain} />
        <VehicleTypeSwitch label="Ferry" mode={ferry} onChange={toggleFerry} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters
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
