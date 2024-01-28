import { client } from "../../brokers/mqtt-broker";

export function f91Toggle(operation) {
    // This will make call to the backend to toggle the f91 lights
    switch(operation) {
        case "on":
            client.publish("gundam/uc", "on");
            break;
        case "off":
            break;
    }
}