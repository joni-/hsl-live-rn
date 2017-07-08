import React from 'react'
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import HslActions from '../redux/HslRedux';


const markerStyle = {
  flex: 1,
  alignItems: 'center'
}

const VehicleMarker = ({ icon, color, text }) => (
  <View style={markerStyle}>
    <Text>{text}</Text>
    <MaterialIcons name={icon} size={24} color={color} />
  </View>
);

const buildMarkers = (vehicles, icon, color) => Object.keys(vehicles).map((id) => {
  const vehicle = vehicles[id];
  const coordinate = {
    latitude: vehicle.latitude,
    longitude: vehicle.longitude
  };
  return (
    <MapView.Marker key={id} coordinate={coordinate}>
      <VehicleMarker text={vehicle.line} icon={icon} color={color} />
    </MapView.Marker>
  );
});

class MapScreen extends React.Component {
  render() {
    const {
      streaming,
      start,
      busses,
      trams,
      subways,
      trains,
      ferries,
      filters
    } = this.props;

    if (!streaming) {
      start(filters);
    }

    const { bus, tram, subway, train, ferry } = filters;

    return (
      <MapView style={{ flex: 1 }}>
        {bus && buildMarkers(busses, 'directions-bus', 'blue')}
        {tram && buildMarkers(trams, 'tram', 'green')}
        {subway && buildMarkers(subways, 'directions-subway', 'red')}
        {train && buildMarkers(trains, 'directions-railway', 'orange')}
        {ferry && buildMarkers(ferries, 'directions-boat', 'blue')}
      </MapView>
    );
  }
}

const mapStateToProps = (state) => ({
  streaming: state.hsl.streaming,
  busses: state.hsl.busses,
  trams: state.hsl.trams,
  subways: state.hsl.subways,
  trains: state.hsl.trains,
  ferries: state.hsl.ferries,
  subways: state.hsl.subways,
  trains: state.hsl.trains,
  ferries: state.hsl.ferries,
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  start: (filters) => dispatch(HslActions.start(filters)),
  stop: () => dispatch(HslActions.stop())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
