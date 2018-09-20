function* reverse(xs) {
	let i = xs.length - 1
	while (i >= 0) yield xs[i--]
}

const countWhile = pred => xs => {
	let count = 0
	for (const x of xs) {
		if (pred(x)) break
		count++
	}
	return count
}

const rot = s => {
	let result = ''
	for (const c of reverse(s)) result += c
	return result
}

const isSpace = x => x === '\n'

const ifSpace = trueValue => c => (isSpace(c) ? trueValue : c)

const selfieAndRot = s => {
	const dots = '.'.repeat(countWhile(isSpace)(s))
	let result = ''
	for (const c of s) result += ifSpace(dots + '\n')(c)
	result += dots + '\n' + dots
	for (const c of reverse(s)) result += ifSpace('\n' + dots)(c)
	return result
}

const oper = (f, s) => f(s)
// console.log(selfieAndRot('xZBV\njsbS\nJcpN\nfVnP'))
console.log('wvlVdrvdnskD'.length === '............'.length)
