const DIGITAL_CLOCK_MARKUP = `
  <div class="digit display-eight">
    <div class="segment-horizontal segment-one"></div>
    <div class="segment-vertical segment-two"></div>
    <div class="segment-vertical segment-three"></div>
    <div class="segment-horizontal segment-four"></div>
    <div class="segment-vertical segment-five"></div>
    <div class="segment-vertical segment-six"></div>
    <div class="segment-horizontal segment-seven"></div>
  </div>
  <div class="digit display-eight">
    <div class="segment-horizontal segment-one"></div>
    <div class="segment-vertical segment-two"></div>
    <div class="segment-vertical segment-three"></div>
    <div class="segment-horizontal segment-four"></div>
    <div class="segment-vertical segment-five"></div>
    <div class="segment-vertical segment-six"></div>
    <div class="segment-horizontal segment-seven"></div>
  </div>
  <div class="separator">
    <div class="colon"></div>
    <div class="colon"></div>
  </div>
  <div class="digit display-eight">
    <div class="segment-horizontal segment-one"></div>
    <div class="segment-vertical segment-two"></div>
    <div class="segment-vertical segment-three"></div>
    <div class="segment-horizontal segment-four"></div>
    <div class="segment-vertical segment-five"></div>
    <div class="segment-vertical segment-six"></div>
    <div class="segment-horizontal segment-seven"></div>
  </div>
  <div class="digit display-eight">
    <div class="segment-horizontal segment-one"></div>
    <div class="segment-vertical segment-two"></div>
    <div class="segment-vertical segment-three"></div>
    <div class="segment-horizontal segment-four"></div>
    <div class="segment-vertical segment-five"></div>
    <div class="segment-vertical segment-six"></div>
    <div class="segment-horizontal segment-seven"></div>
  </div>
`;

const DIGITAL_CLOCK_DIGITS = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const digitalClock = (currentHour, currentMinute, _currentSeconds) => {
  let adjustedHour = currentHour;
  if (adjustedHour > 12) {
    adjustedHour = adjustedHour - 12;
  }
  adjustedHour = String(adjustedHour).padStart(2, "0");
  let adjustedMinute = String(currentMinute).padStart(2, "0");

  const digits = [...adjustedHour.split(""), ...adjustedMinute.split("")];

  document.querySelectorAll(".digit").forEach((digit, index) => {
    digit.className = "digit";
    digit.classList.add(`display-${DIGITAL_CLOCK_DIGITS[digits[index]]}`);
  });
};
