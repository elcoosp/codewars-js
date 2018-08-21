function* browseArraysByEnd(arrs) {
  const xs = arrs.map(a => a.slice())
  while (xs.some(a => a.length)) yield xs.map(a => a.pop())
}

const sumStrings = (a, b) => {
  let detention = 0
  let result = ''

  for (const nums of browseArraysByEnd(
    [a, b].map(s => s.replace(/^0+/, '').split(''))
  )) {
    const addition = nums.reduce((x, y) => x + (y ? +y : 0), 0) + detention

    if (addition >= 10)
      (result = (addition - 10).toString() + result), (detention = 1)
    else (result = addition.toString() + result), (detention = 0)
  }

  return detention ? detention.toString() + result : result
}
console.log(sumStrings('99', '1'))
