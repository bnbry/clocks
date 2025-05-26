# clocks

[bnbry.com/clocks](bnbry.com/clocks)

This is a series of simple CSS/HTML/JS experiments to render various clocks.

## How to poke around

All of the CSS for each clock is in clocks.css in the root.

The clocks.js file is used to manage updates of the selected clock and feed it the current hour, minute and second from a JS loop.

The individual clock js files are in the clock_types directory. Their job is mostly to convert the time values into something that can trigger CSS hooks, activating various styling.

## Word Clock

This is based on a clock I saw online. Just search for "word clock" to see various versions of this. It maps time values to selectors using JS objects then activates the matching target elements.

## Digital Clock

This is based on the classic 7 segment display alarm clock. The segments are rendered using CSS borders on positioned bofore/after pseudo elements. The segment containers and the digits are positioned via a combination of flexbox and CSS grid.

## Binary Clock

This is based off of a clock I used to own that rendered each digit on a 24 hour clock as a byte column. You read it by translating each byte into a number. 0100 = 2, 1000 = 1, 0000 = 0, 0010 = 4, 1010 = 5, 1110 = 7 which would be 21:04:57. The bits are just CSS rounded divs that use vmin units to respond to the viewport and are arranged using CSS grid.
