import { call, put, take, fork, cancel } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { delay } from 'redux-saga'
import { Client, Message } from 'react-native-paho-mqtt';

import HslActions, { HslTypes } from '../redux/HslRedux';
import FilterActions from '../redux/FilterRedux';


const API_URL = 'ws://mqtt.hsl.fi:1883/';
let client = null;

function subscribe(client, filters) {
  if (filters.bus) {
    client.subscribe("/hfp/journey/bus/#");
  }

  if (filters.tram) {
    client.subscribe("/hfp/journey/tram/#");
  }

  if (filters.subway) {
    client.subscribe("/hfp/journey/subway/#");
  }

  if (filters.train) {
    client.subscribe("/hfp/journey/rail/#");
  }

  if (filters.ferry) {
    client.subscribe("/hfp/journey/ferry/#");
  }

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

function* read(client, filters) {
  const channel = yield call(subscribe, client, filters);
  while (true) {
    let { topic, message } = yield take(channel);

    if (topic.startsWith('/hfp/journey/bus')) {
      yield put(HslActions.handleBus(topic, message));
    } else if (topic.startsWith('/hfp/journey/tram')) {
      yield put(HslActions.handleTram(topic, message));
    } else if (topic.startsWith('/hfp/journey/subway')) {
      yield put(HslActions.handleSubway(topic, message));
    } else if (topic.startsWith('/hfp/journey/rail')) {
      yield put(HslActions.handleTrain(topic, message));
    } else if (topic.startsWith('/hfp/journey/ferry')) {
      yield put(HslActions.handleFerry(topic, message));
    }
  }
}

function* handleIO(client, filters) {
  yield fork(read, client, filters);
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

export function* startStreaming({ filters }) {
  client = new Client({
    uri: API_URL,
    clientId: 'HSL RN APP',
    storage: () => {}
  });

  yield call(connect, client);
  const task = yield fork(handleIO, client, filters);
  yield put(HslActions.streamStarted());

  // Listen the socket until STOP action is received and then disconnect
  // from the socket.
  yield take(HslTypes.STOP);
  yield cancel(task);
  yield call(disconnect, client);
}


export function* toggleBus({ mode }) {
  if (! mode) {
    client.unsubscribe("/hfp/journey/bus/#");
    yield put(HslActions.clear('busses'));
  } else {
    client.subscribe("/hfp/journey/bus/#");
  }

  yield put(FilterActions.filtersUpdated('bus', mode));
}

export function* toggleTram({ mode }) {
  if (! mode) {
    client.unsubscribe("/hfp/journey/tram/#");
    yield put(HslActions.clear('trams'));
  } else {
    client.subscribe("/hfp/journey/tram/#");
  }

  yield put(FilterActions.filtersUpdated('tram', mode));
}

export function* toggleSubway({ mode }) {
  if (! mode) {
    yield put(HslActions.clear('subways'));
    client.unsubscribe("/hfp/journey/subway/#");
  } else {
    client.subscribe("/hfp/journey/subway/#");
  }

  yield put(FilterActions.filtersUpdated('subway', mode));
}

export function* toggleTrain({ mode }) {
  if (! mode) {
    yield put(HslActions.clear('trains'));
    client.unsubscribe("/hfp/journey/rail/#");
  } else {
    client.subscribe("/hfp/journey/rail/#");
  }

  yield put(FilterActions.filtersUpdated('train', mode));
}

export function* toggleFerry({ mode }) {
  if (! mode) {
    yield put(HslActions.clear('ferries'));
    client.unsubscribe("/hfp/journey/ferry/#");
  } else {
    client.subscribe("/hfp/journey/ferry/#");
  }

  yield put(FilterActions.filtersUpdated('ferry', mode));
}