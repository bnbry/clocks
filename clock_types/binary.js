BINARY_CLOCK_MARKUP = `
  <div class="binary-hours binary-section">
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
  </div>
  <div class="binary-minutes binary-section">
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
  </div>
  <div class="binary-seconds binary-section">
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
    <div class="bit-box"><div class="bit"></div></div>
  </div>
`;

// Accepts the current hour, minute and second and updates the binary clock.
const binaryClock = (currentHour, currentMinute, currentSeconds) => {
  const adjustedHour = getBinaryDigits(currentHour);
  const adjustedMinute = getBinaryDigits(currentMinute);
  const adjustedSeconds = getBinaryDigits(currentSeconds);
  const binaryDigits = [...adjustedHour, ...adjustedMinute, ...adjustedSeconds];

  // We can use the order of binaryDigits and the selectors to activate the correct bits
  // because the flow of bit-boxes uses CSS grid columns instead of rows.
  document.querySelectorAll(".bit").forEach((bit, index) => {
    bit.classList.remove("active");

    if (binaryDigits[index] === "1") {
      bit.classList.add("active");
    }
  });
};

// Accepts a number and returns an array of 1s and 0s representing each digit in the number
// as 4 bits.
const getBinaryDigits = (number) => {
  // Pad digits to 2 places and then split into an array of digits
  let splitDigits = number.toString().padStart(2, "0").split("");

  // Convert each digit in the array to a binary string, pad to 4 places and
  // then split and flatten the result
  return splitDigits.flatMap((digit) => {
    return parseInt(digit).toString(2).padStart(4, "0").split("");
  });
};
