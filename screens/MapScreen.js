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

const BusMarker = (props) =>
  <VehicleMarker icon="directions-bus" color="blue" text={props.line} />

const TramMarker = (props) =>
  <VehicleMarker icon="tram" color="green" text={props.line} />

class MapScreen extends React.Component {
  render() {
    if (!this.props.streaming) {
      this.props.start();
    }

    const busMarkers = Object.keys(this.props.busses).map((id) => {
      const bus = this.props.busses[id];
      const coordinate = {
        latitude: bus.latitude,
        longitude: bus.longitude
      };
      return (
        <MapView.Marker key={id} coordinate={coordinate}>
          <BusMarker line={bus.line} />
        </MapView.Marker>
      );
    })

    const tramMarkers = Object.keys(this.props.trams).map((id) => {
      const tram = this.props.trams[id];
      const coordinate = {
        latitude: tram.latitude,
        longitude: tram.longitude
      };
      return (
        <MapView.Marker key={id} coordinate={coordinate}>
          <TramMarker line={tram.line} />
        </MapView.Marker>
      );
    })

    return (
      <MapView style={{ flex: 1 }}>
        {busMarkers}
        {tramMarkers}
      </MapView>
    );
  }
}

const mapStateToProps = (state) => ({
  streaming: state.hsl.streaming,
  busses: state.hsl.busses,
  trams: state.hsl.trams
});

const mapDispatchToProps = (dispatch) => ({
  start: () => dispatch(HslActions.start()),
  stop: () => dispatch(HslActions.stop())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
