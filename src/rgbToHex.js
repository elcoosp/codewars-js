// Utils
const mod = x => y => y % x
const div = x => y => Math.floor(y / x)
const divAndMod = x => y => [div(x)(y), mod(x)(y)]
const reduceStr = f => a => a.reduce((acc, x) => (acc += f(x)), '')
const gather = f => (...args) => f(args)
const map = f => a => a.map(f)
const pipe = (...fns) => init => fns.reduce((acc, f) => f(acc), init)

// Constant
const HEX = [
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G'
]

// Core
const decimalToHex = pipe(
	divAndMod(16),
	reduceStr(n => HEX[n])
)

const normalize = x => (x < 0 ? 0 : x > 255 ? 255 : x)

const rgb = gather(
	pipe(
		map(normalize),
		reduceStr(decimalToHex)
	)
)
