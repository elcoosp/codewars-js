var basket = '1 hamburger, 4 hotdog, 2 coke, 4 milk'
var data = {
	2014: { hamburger: 1.25, hotdog: 1, coke: 0.5, milk: 0.4 },
	2015: { hamburger: 1.25, hotdog: 1.25, coke: 0.7, milk: 0.5 },
	2016: { hamburger: 2.5, hotdog: 1, coke: 1, milk: 0.6 }
}

const CPI = (pricesPerYear, rawBasket, yearStart, yearEnd) => {
	const basket = rawBasket.split(', ').reduce((acc, item) => {
		const [qty, itemName] = item.split(' ')
		acc[itemName] = +qty
		return acc
	}, {})

	const getBasketCost = (basket, prices) =>
		Object.entries(basket).reduce((acc, [itemName, qty]) => {
			return acc + prices[itemName] * qty
		}, 0)

	const prices = {
		before: getBasketCost(basket, pricesPerYear[yearStart]),
		after: getBasketCost(basket, pricesPerYear[yearEnd])
	}

	const cpi = (prices.after / prices.before) * 100

	return +(cpi - 100).toFixed(2)
}
