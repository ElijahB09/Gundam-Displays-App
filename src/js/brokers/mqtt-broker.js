import mqtt from 'mqtt'

// Create a client instance
const clientId = "gundamFrontend";
const host = `ws://${import.meta.env.VITE_PI_MQTT_BROKER}:9001`;
const options = {
  keepalive: 30,
  clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  rejectUnauthorized: false
}

export const client = mqtt.connect(host, options);

client.on("connect", () => {
  console.log("Connected : " + clientId);
  client.subscribe("gundam/uc", (err) => {
    if (!err) {
      client.publish("gundam/uc", "Connection to gundam/uc: CHECK");
    }
  });
});

client.on('message', (topic, message, packet) => {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
});

client.on('close', () => {
  console.log(clientId + ' disconnected')
});