import { f91Toggle } from "./services/uc-services/f91-service";
import { unicornToggle } from "./services/uc-services/unicorn-service";

const f91ToggleOnBtn = document.getElementById("f91ToggleOn");
f91ToggleOnBtn.addEventListener("click", ledOn("f91"), false);

const f91ToggleOffBtn = document.getElementById("f91ToggleOff");
f91ToggleOffBtn.addEventListener("click", ledOff("f91"), false);

const unicornToggleOnBtn = document.getElementById("unicornToggleOn");
f91ToggleOnBtn.addEventListener("click", ledOn("unicorn"), false);

const unicornToggleOffBtn = document.getElementById("unicornToggleOff");
f91ToggleOffBtn.addEventListener("click", ledOff("unicorn"), false);

function ledOn(gundam_name) {
    switch(gundam_name) {
        case "f91":
            f91Toggle("on");
            break;
        case "unicorn":
            unicornToggle("on");
            break;
    }
}

function ledOff(gundam_name) {
    switch(gundam_name) {
        case "f91":
            f91Toggle("off");
            break;
        case "unicorn":
            unicornToggle("off");
            break;
    }
}