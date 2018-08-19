// Yield an object with the current index (starting from end of every arrays passed as argument)
// And the values at each array ends
function* browseArraysByEnd(...arrs) {
  const xs = arrs.map(a => a.slice())
  let index = 0
  while (xs.some(a => a.length))
    yield { values: xs.map(a => a.pop()), index }, index++
}

// Add zerosNum 0 to a number
const zeroPad = (zerosNum, n) =>
  zeros === 0 ? n : +(n.toString() + '0'.repeat(zeros))

const sumStrings = (a, b) => {
  let detention = 0,
    result = 0
  for (const { values, index } of browseArraysByEnd(
    ...[a, b].map(s => s.split(''))
  )) {
    console.log(values)

    // Add while adding zeros depedning on current index
    const addition = values.reduce(
      (x, y) => zeroPad(index, x) + zeroPad(index, +y),
      0
    )
    // TODO: make 10 depending on index
    if (addition > 10) result += addition - 10
    else result += addition
  }
  return result
}
