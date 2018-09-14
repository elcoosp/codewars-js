function* faroShuffle(deckSize) {
	let i = 1
	while (true) yield (2 * i++) % deckSize
}
const faroCount = deckSize => {
	let count = 0
	for (const i of faroShuffle(deckSize)) {
		if (i === 0) return count
		count++
	}
}

console.log(faroCount(52))
