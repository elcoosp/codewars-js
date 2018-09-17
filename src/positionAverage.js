const head = ([first]) => first
const percentage = (fixed, n) => +(n * 100).toFixed(fixed)
const sum = (a, b) => a + b
const eq = x => y => x === y

function multiReduce(reducer, init, ...arrs) {
	let i = 0,
		acc = init
	while (i < arrs[0].length) (acc = reducer(acc, arrs.map(a => a[i]))), i++
	return acc
}

const pairs = a =>
	a.reduce((acc, x, i) => acc.concat(a.slice(i + 1).map(y => [x, y])), [])

const samePositions = (...arrs) =>
	multiReduce(
		(acc, values) => (values.every(eq(head(values))) ? acc + 1 : acc),
		0,
		...arrs
	)

const posAverage = s => {
	const strings = s.split(', ').map(numStr => numStr.split(''))
	const paired = pairs(strings)
	return percentage(
		10,
		paired
			.map(pair => samePositions(...pair) / head(strings).length)
			.reduce(sum, 0) / paired.length
	)
}
