// Yield an object with the current index (starting from end of every arrays passed as argument)
// And the values at each array ends
function* browseArraysByEnd(...arrs) {
  const xs = arrs.map(a => a.slice())
  while (xs.some(a => a.length)) yield xs.map(a => a.pop())
}

const sumStrings = (a, b) => {
  let detention = 0,
    result = ''
  for (const nums of browseArraysByEnd(...[a, b].map(s => s.split('')))) {
    const addition = nums.reduce((x, y) => x + (y ? +y : 0), 0) + detention

    if (addition > 10)
      (result = (addition - 10).toString() + result),
        (detention = addition - 10)
    else (result = addition.toString() + result), (detention = 0)
  }
  return result
}
console.log(sumStrings('99', '1'))
