require('dotenv').config();

const body = document.getElementById("body");
body.addEventListener("load", subClientsToBroker(), false);

function subClientsToBroker() {
  const mqtt = require('mqtt')

  //EMQX's default port for mqtt connections is 1883, while for mqtts it is 8883.
  const url = `mqtt://${process.env.PI_MQTT_BROKER}:1883`

  const clientsToBuild = [
    {name: "f91", topic: "gundam/uc/f91/f91gundam"},
    {name: "unicorn", topic: "gundam/uc/unicorn/unicorngundam"}
  ]

  const secretMapping = {
    f91: "GUNDAM_F91_PASSWORD",
    unicorn: "GUNDAM_UNICORN_PASSWORD",
  }

  clientsToBuild.forEach((item) => {
    var secretKey = secretMapping[item.name]
    const options = {
      clean: true,
      connectTimeout: 4000,
      clientId: 'mqtt_client_frontend_' + item.name,
      username: item.name,
      password: process.env[secretKey],
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
