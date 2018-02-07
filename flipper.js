/*

  -- PANCAKE FLIPPER COUNTER --
  for Infinite Pancake House.

  This program will properly determine the minimum number of
  flips required to properly orientate a randomly orientated
  stack of Happy Face Pancakes happy side up.

  Analyzing each stack using X-ray vision, test cases have been
  established. Cakes requiring a flip are denoted with a 1
  (indicating true, or yes, it needs a flip) cakes happy side up
  not requiring a flip are denoted with a 0 in the array
  (indicating false, or no, it does not need to be flipped).

  Node >= v6.9.4 required

  from the command line run:
  node flipper.js

*/

const assert = require('assert');

// returns true if all pancakes are smile side up.
const allSmileUp = (pancakes) => {
  return pancakes.every((pancake) => {
    return pancake === 0;
  });
};

// returns true if all pancakes are orientated the same direction.
const allSame = (pancakes) => {
  const which = pancakes[0];
  return pancakes.every((pancake) => {
    return pancake === which;
  })
};

// takes a set of matching pancakes and flips them to match the next consecutive pancake outside the set
const flipPancakes = (stack) => {
  const toMatch = stack[0];
  let end = stack.findIndex((pancake) => {
    return pancake !== toMatch;
  });

  const toProcess = stack.slice(0, end);
  const remaining = stack.slice(end);

  const flipped = toProcess.map((pancake) => {
    return pancake === 0 ? 1 : 0;
  });

  return flipped.concat(remaining);
};


// recursive call to orientate all pancakes.
function orientatePancakes(pancakes) {
  if (allSame(pancakes)) {
    return allSmileUp(pancakes) ? 0 : 1;
  } else {
    let n = orientatePancakes(flipPancakes(pancakes));
    return n + 1;
  }
}

// given test cases.
const case1 = [1];
const case2 = [1, 0];
const case3 = [0, 1];
const case4 = [0, 0, 0,];
const case5 = [1, 1, 0, 1];

console.log('Case #1:', orientatePancakes(case1));
console.log('Case #2:', orientatePancakes(case2));
console.log('Case #3:', orientatePancakes(case3));
console.log('Case #4:', orientatePancakes(case4));
console.log('Case #5:', orientatePancakes(case5));

// function tests.
const randomSample = [1, 0, 0, 1, 0, 0, 1];
const smileUpSample = [0, 0, 0, 0];
const blankUpSample = [1, 1, 1, 1];


(function testFlipPancakes() {
  const desired = [0, 0, 0, 1, 0, 0, 1];
  try {
    assert.deepEqual(desired, flipPancakes(randomSample));
  } catch (err) {
    console.error('flipPancakes test failed!');
  }
})();

(function testAllSmileUp() {
  try {
    assert.ok(allSmileUp(smileUpSample));
  } catch (err) {
    console.error('*** allSmileUp test failed! ***')
  }
})();

(function testAllSame() {
  const allSmileUpResult = allSame(smileUpSample);
  const allBlankUpResult = allSame(blankUpSample);
  const notSame = allSame(randomSample);

  try {
    assert.equal(allSmileUpResult, allBlankUpResult);
    assert.notEqual(allSmileUpResult, notSame);
  } catch (err) {
    console.log('*** allSame test failed! ***')
  }
})();
