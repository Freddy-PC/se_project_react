import clearsky from "../images/sunnyday.svg";
import cloudyDay from "../images/cloudyday.svg";
import rainyDay from "../images/rainyday.svg";
import stormyDay from "../images/stormyday.svg";
import snowyday from "../images/snowyday.svg";
import foggyday from "../images/foggyday.svg";

// Cordinates for Asheville
const latitude = "35.6009";
const longitude = "-82.554";
const key = "d4a1b1f4d691f0971973d2060e56412a";

// Accounts for all
const weatherForecast = [
  {
    name: "clear sky" || "scattered clouds" || "broken clouds",
    image: clearsky,
  },
  {
    name: "few clouds",
    image: cloudyDay,
  },
  {
    name: "rain" || "shower rain",
    image: rainyDay,
  },
  {
    name: "thunderstorm",
    image: stormyDay,
  },
  {
    name: "snow",
    image: snowyday,
  },
  {
    name: "mist",
    image: foggyday,
  },
];

// const weatherImage = {
//   clearsky: "../images/sunnyday.svg",
//   cloudyday: "../images/cloudyday.svg",
//   rainyday: "../images/rainyday.svg",
//   stormyday: "../images/stormyday.svg",
//   snowyday: "../images/snowyday.svg",
//   foggyday: "../images/foggyday.svg",

//   brightnight: "../images/brightnight.svg",
//   cloudynight: "../images/cloudynight.svg",
//   rainynight: "../images/rainynight.svg",
//   stormynight: "../images/stormynight.svg",
//   snownynight: "../images/snownynight.svg",
//   foggynight: "../images/foggynight.svg",
// };

export { latitude, longitude, key, weatherForecast };
