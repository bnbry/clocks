const WORD_CLOCK_MARKUP = `
    <span data-target="it-is" class="clock-text active">IT</span>
    <span class="clock-test">H</span>
    <span data-target="it-is" class="clock-text active">IS</span>
    <span class="clock-text">TIME</span>
    <span data-target="half" class="clock-text">HALF</span>
    <span data-target="ten-minutes" class="clock-text">TEN</span>
    <span data-target="quarter" class="clock-text">A</span>
    <span class="clock-test">H</span>
    <span data-target="quarter" class="clock-text">QUARTER</span>
    <span data-target="twenty" class="clock-text">TWENTY</span>
    <span class="clock-text">YOU</span>
    <span data-target="five-minutes" class="clock-text">FIVE</span>
    <span class="clock-test">M</span>
    <span data-target="minutes" class="clock-text">MINUTES</span>
    <span class="clock-text">ENJOY</span>
    <span data-target="to" class="clock-text">TO</span>
    <span class="clock-text">WASTING</span>
    <span data-target="past" class="clock-text">PAST</span>
    <span data-target="one" class="clock-text">ONE</span>
    <span data-target="two" class="clock-text">TWO</span>
    <span data-target="three" class="clock-text">THREE</span>
    <span data-target="four" class="clock-text">FOUR</span>
    <span class="clock-text">IS</span>
    <span data-target="five" class="clock-text">FIVE</span>
    <span data-target="six" class="clock-text">SIX</span>
    <span data-target="seven" class="clock-text">SEVEN</span>
    <span class="clock-text">NOT</span>
    <span data-target="eight" class="clock-text">EIGHT</span>
    <span data-target="nine" class="clock-text">NINE</span>
    <span data-target="ten" class="clock-text">TEN</span>
    <span class="clock-text">WASTED</span>
    <span data-target="eleven" class="clock-text">ELEVEN</span>
    <span data-target="midnight" class="clock-text">MIDNIGHT</span>
    <span data-target="noon" class="clock-text">NOON</span>
    <span class="clock-test">M</span>
    <span class="clock-text">TIME</span>
    <span data-target="o-clock" class="clock-text">O'CLOCK</span>
  `
  .replace(/>\s+</g, "><")
  .trim();

const WORD_CLOCK_MINUTES = {
  0: [],
  5: ["five-minutes", "minutes"],
  10: ["ten-minutes", "minutes"],
  15: ["quarter"],
  20: ["twenty", "minutes"],
  25: ["twenty", "five-minutes", "minutes"],
  30: ["half"],
};

const WORD_CLOCK_HOURS = {
  0: "midnight",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "noon",
  13: "one",
  14: "two",
  15: "three",
  16: "four",
  17: "five",
  18: "six",
  19: "seven",
  20: "eight",
  21: "nine",
  22: "ten",
  23: "eleven",
};

const wordClock = (currentHour, currentMinute, _currentSeconds) => {
  // Deactivate all text display targets
  let allTargets = document.querySelectorAll(".clock-text");
  allTargets.forEach((target) => {
    target.classList.remove("active");
  });

  let standardActivations = ["it-is"];
  let direction = ["past"];
  let adjustedHour = currentHour;
  let adjustedMinute = currentMinute;

  // If the time is closer to the next hour than the current, orient the time values around the next hour
  if (currentMinute >= 33) {
    // flip to the minutes left in the hour
    adjustedMinute = 60 - currentMinute;
    // increment the hour
    adjustedHour = currentHour + 1;
    // set the direction to "to" instead of "past"
    direction = ["to"];
  }

  // if the hour is past 23, reset to 0 for the "midnight" hour
  if (adjustedHour > 23) {
    adjustedHour = 0;
  }

  // round the minutes to the nearest 5 which is as granular as our "word" clock can display
  adjustedMinute = Math.round(adjustedMinute / 5) * 5;

  // if the rounded minutes are 0, remove the direction because we are rendering a specific hour only
  if (adjustedMinute == 0) {
    direction = [];
  }

  // Get the targets for the minutes
  const minuteTargets = WORD_CLOCK_MINUTES[adjustedMinute];
  const hourTarget = WORD_CLOCK_HOURS[adjustedHour];

  // Append "o-clock" to the standard activations if the hour is not midnight or noon
  if (!(adjustedHour == 0 || adjustedHour == 12)) {
    standardActivations = [...standardActivations, "o-clock"];
  }

  const activations = [
    ...standardActivations,
    ...minuteTargets,
    ...direction,
    hourTarget,
  ];

  activations.forEach((target) => {
    document
      .querySelectorAll(`[data-target="${target}"]`)
      .forEach((el) => el.classList.add("active"));
  });
};
