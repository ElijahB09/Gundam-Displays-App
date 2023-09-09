import * as mqtt from 'mqtt/dist/mqtt.min'

const body = document.getElementById('body');
body.addEventListener('load', subClientsToBroker(), false);

function subClientsToBroker() {
  //EMQX's default port for mqtt connections is 1883, while for mqtts it is 8883.
  const url = `ws://${import.meta.env.VITE_PI_MQTT_BROKER}:8083`

  const clientsToBuild = [
    {name: "f91", topic: "gundam/uc/f91/f91gundam"},
    {name: "unicorn", topic: "gundam/uc/unicorn/unicorngundam"}
  ]

  clientsToBuild.forEach((item) => {
    var user_password = null;
    if (item.name == 'f91') {
      user_password = import.meta.env.VITE_GUNDAM_F91_PASSWORD;
    } else {
      user_password = import.meta.env.VITE_GUNDAM_UNICORN_PASSWORD;
    }

    const options = {
      keepalive: 60,
      protocolId: 'MQTT',
      protocolVersion: 5,
      clean: true,
      connectTimeout: 4000,
      clientId: 'mqtt_client_' + item.name + '_frontend',
      username: item.name + '_frontend',
      password: user_password,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
    }
    const client  = mqtt.connect(url, options)
    client.on('connect', function () {
      console.log('Connected')
      client.subscribe(`${item.topic}`, function (err) {
        if (!err) {
          client.publish(`${item.topic}`, 'activate')
        }
      })
    })
  });
}

// Receive messages
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
