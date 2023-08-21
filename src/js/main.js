import { f91Toggle } from "./services/uc-services/f91-service";

function toggleLed(toggle, gundam_name) {
    switch (toggle) {
        case "on":
            ledOn(gundam_name);
            break;
        case "off":
            ledOff(gundam_name);
            break;
    }
}

function ledOn(gundam_name) {
    switch(gundam_name) {
        case "f91":
            f91Toggle("on")
            break;
        case "unicorn":
            break;
    }
}

function ledOff(gundam_name) {
    switch(gundam_name) {
        case "f91":
            f91Toggle("off")
            break;
        case "unicorn":
            break;
    }
}