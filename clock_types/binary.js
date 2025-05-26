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

const binaryClock = (currentHour, currentMinute, currentSeconds) => {
  let adjustedHour = getBinaryDigits(currentHour);
  let adjustedMinute = getBinaryDigits(currentMinute);
  let adjustedSeconds = getBinaryDigits(currentSeconds);

  const binaryDigits = [...adjustedHour, ...adjustedMinute, ...adjustedSeconds];

  console.log(binaryDigits);

  document.querySelectorAll(".bit").forEach((bit, index) => {
    bit.classList.remove("active");

    if (binaryDigits[index] === "1") {
      bit.classList.add("active");
    }
  });
};

const getBinaryDigits = (number) => {
  let splitDigits = number.toString().padStart(2, "0").split("");
  console.log(splitDigits);

  return splitDigits.flatMap((digit) => {
    return parseInt(digit).toString(2).padStart(4, "0").split("");
  });
};
