import { call, put, take, fork, cancel } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { delay } from 'redux-saga'
import { Client, Message } from 'react-native-paho-mqtt';

import HslActions, { HslTypes } from '../redux/HslRedux';


const API_URL = 'ws://mqtt.hsl.fi:1883/';

function subscribe(client) {
  //client.subscribe("/hfp/journey/tram/#");
  //client.subscribe("/hfp/journey/bus/#");
  client.subscribe("/hfp/journey/subway/#");
  //client.subscribe("/hfp/journey/rail/#");
  //client.subscribe("/hfp/journey/ferry/#");

  return eventChannel((emit) => {
    client.on('messageReceived', (message) => {
      emit({
        topic: message.destinationName,
        message: JSON.parse(message.payloadString)
      });
    });
    return () => {};
  });
}

function* read(client) {
  const channel = yield call(subscribe, client);
  while (true) {
    let { topic, message } = yield take(channel);
    yield put(HslActions.handle(topic, message));
  }
}

function* handleIO(client) {
  yield fork(read, client);
}

function connect(client) {
  return new Promise((success) => {
    client.connect().then(success);
  });
}

function disconnect(client) {
  return new Promise((success) => {
    client.disconnect().then(success);
  });
}

export function* startStreaming() {
  const client = new Client({
    uri: API_URL,
    clientId: 'HSL RN APP',
    storage: () => {}
  });

  yield call(connect, client);
  const task = yield fork(handleIO, client);

  // Listen the socket until STOP action is received and then disconnect
  // from the socket.
  yield take(HslTypes.STOP);
  yield cancel(task);
  yield call(disconnect, client);
}

