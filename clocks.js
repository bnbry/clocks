const NO_CLOCK_MARKUP = `
  <h1>Clocks | <span data-role="clock-digit">0</span><span data-role="clock-digit">0</span>:<span data-role="clock-digit">0</span><span data-role="clock-digit">0</span>:<span data-role="clock-digit">0</span><span data-role="clock-digit">0</span></h1>
  <p>This project is a series of explorations rendering different clock formats using HTML, CSS, and vanilla JavaScript. Explore the code at <a href="https://github.com/bnbry/clocks">github.com/bnbry/clocks</a> if you're into that.</p>
  <ul>
    <li>
      <a href="#" data-role="clock-picker" data-clock-type="digital">Digital</a>
      <p>A seven segment digital display rendered with CSS Grid, Flexbox, absolute positioning and CSS borders.</p>
    </li>
    <li>
      <a href="#" data-role="clock-picker" data-clock-type="word">Word</a>
      <p>A word clock that represents time using highlighted word segments.</p>
    </li>
    <li>
      <a href="#" data-role="clock-picker" data-clock-type="binary">Binary</a>
      <p>A binary clock that represents time by rendering each digit as a binary number on vertical byte columns. Uses CSS Grid and Flexbox for layout.</p>
    </li>
  </ul>
`;

let activeClockType = "none";
let currentTimeoutId = null;

const MARKUP = {
  binary: BINARY_CLOCK_MARKUP,
  digital: DIGITAL_CLOCK_MARKUP,
  word: WORD_CLOCK_MARKUP,
  none: NO_CLOCK_MARKUP,
};

const CLOCK_TYPES = {
  binary: binaryClock,
  digital: digitalClock,
  word: wordClock,
  none: (currentHour, currentMinute, currentSeconds) => {
    let adjustedHour = currentHour;
    if (adjustedHour > 12) {
      adjustedHour = adjustedHour - 12;
    }
    adjustedHour = String(adjustedHour).padStart(2, "0");
    let adjustedMinute = String(currentMinute).padStart(2, "0");
    let adjustedSeconds = String(currentSeconds).padStart(2, "0");

    const digits = [
      ...adjustedHour.split(""),
      ...adjustedMinute.split(""),
      ...adjustedSeconds.split(""),
    ];

    document
      .querySelectorAll("[data-role='clock-digit']")
      .forEach((digit, index) => {
        digit.textContent = digits[index];
      });
  },
};

// This function handles the basic clock tick and delegates to the appropriate clock type for rendering
// then calls itself again with a 1 second delay
const updateClock = () => {
  const currentDate = new Date();
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();
  let currentSeconds = currentDate.getSeconds();

  const body = document.querySelector("body");
  body.className = "";
  body.classList.add(`${activeClockType}-clock`);

  CLOCK_TYPES[activeClockType](currentHour, currentMinute, currentSeconds);

  currentTimeoutId = setTimeout(function () {
    updateClock();
  }, 1000);
};

const resetClock = (clockType) => {
  activeClockType = clockType;

  // clear the currently scheduled update
  if (currentTimeoutId) {
    clearTimeout(currentTimeoutId);
  }

  const main = document.querySelector("main");
  main.innerHTML = MARKUP[activeClockType];

  initEventListeners();

  updateClock();
};

const changeClockType = (event) => {
  event.preventDefault();
  const clockType = event.target.dataset.clockType;
  resetClock(clockType);
};

// Initialize event listeners
const initEventListeners = () => {
  const clockPickers = document.querySelectorAll("[data-role='clock-picker']");
  clockPickers.forEach((clockPicker) => {
    clockPicker.addEventListener("click", changeClockType);
  });
};

// This function initializes the clock and sets up the markup
const initClock = () => {
  activeClockType = "none";
  resetClock(activeClockType);
};
