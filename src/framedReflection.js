const starLine = x => '*'.repeat(x)

const greatestLength = xs =>
	xs.reduce((acc, x) => (x.length > acc && (acc = x.length), acc), 0)

const reversedWordLine = (minLength, x) => {
	const baseReverse = `* ${x
		.split('')
		.reverse()
		.join('')} *`
	const delta = minLength - baseReverse.length

	return delta === 0
		? baseReverse
		: baseReverse.slice(0, -1) + ' '.repeat(delta) + '*'
}

const toReversedLines = (minLength, xs) =>
	xs
		.reduce((acc, x) => (acc += reversedWordLine(minLength, x) + '\n'), '')
		.trim()

const mirror = text => {
	const splitted = text.split(' ')
	const lineLength = greatestLength(splitted) + 4
	const startEndLine = starLine(lineLength)
	return `${startEndLine}\n${toReversedLines(
		lineLength,
		splitted
	)}\n${startEndLine}`
}

console.log(mirror('aurtnfq vhwp bcqokgq jlzddea hqowtz cvx'))
