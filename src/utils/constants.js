import clearsky from "../images/sunnyday.svg";
import cloudyDay from "../images/cloudyday.svg";
import rainyDay from "../images/rainyday.svg";
import stormyDay from "../images/stormyday.svg";
import snowyday from "../images/snowyday.svg";
import foggyday from "../images/foggyday.svg";

import clearNight from "../images/brightnight.svg";
import cloudyNight from "../images/cloudynight.svg";
import rainyNight from "../images/rainynight.svg";
import stormyNight from "../images/stormynight.svg";
import snowyNight from "../images/snowynight.svg";
import foggyNight from "../images/foggynight.svg";

// Cordinates for Asheville
const latitude = "35.6009";
const longitude = "-82.554";
const key = "d4a1b1f4d691f0971973d2060e56412a";

// Array of Objects
const weatherForecast = [
  {
    name: "clear sky" || "scattered clouds" || "broken clouds",
    imageDay: clearsky,
    imageNight: clearNight,
  },
  {
    name: "few clouds",
    imageDay: cloudyDay,
    imageNight: cloudyNight,
  },
  {
    name: "rain" || "shower rain",
    imageDay: rainyDay,
    imageNight: rainyNight,
  },
  {
    name: "thunderstorm",
    imageDay: stormyDay,
    imageNight: stormyNight,
  },
  {
    name: "snow",
    imageDay: snowyday,
    imageNight: snowyNight,
  },
  {
    name: "mist",
    imageDay: foggyday,
    imageNight: foggyNight,
  },
];

export { latitude, longitude, key, weatherForecast };
