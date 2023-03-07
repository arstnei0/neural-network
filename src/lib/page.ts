type Point = {
	x: number
	y: number
}

const canvasScale = {
	x: 10,
	y: 10,
}

const fn = (point: Point): boolean => point.x > point.y

export namespace Point {
	export const draw = (canvas: CanvasRenderingContext2D, point: Point) => {
		const color = fn(point) ? "green" : "red"
		canvas.fillStyle = color
		canvas.beginPath()
		canvas.arc(point.x * canvasScale.x, point.y * canvasScale.y, 5, 0, 2 * Math.PI)
		canvas.fill()
	}
}

const random = () => Math.random() * 100

const points = Array.from({ length: 1000 }, () => ({ x: random(), y: random() } as Point))

const canvasEl = document.createElement("canvas")
canvasEl.width = 100 * canvasScale.x
canvasEl.height = 100 * canvasScale.y
document.body.appendChild(canvasEl)

const canvas = canvasEl.getContext("2d") as CanvasRenderingContext2D

points.map((p) => Point.draw(canvas, p))

type Perceptron = { weights: [number, number] }
const perceptron: Perceptron = {
	weights: [1, 1],
}

const sign = (n: number): boolean => n < 0

let learningRate = 0.1

const update = (perceptron: Perceptron, point: Point) => {
	const guess = sign(perceptron.weights[0] * point.x + perceptron.weights[1] * point.y)
	const guessN = guess ? 1 : -1
	const expected = fn(point)
	const expectedN = expected ? 1 : -1
	const error = expectedN - guessN
	perceptron.weights[0] += error * point.x * learningRate
	perceptron.weights[1] += error * point.y * learningRate
	console.log(perceptron.weights[0], perceptron.weights[1])
}

const results = points.map((point) => update(perceptron, point))
console.log(results)
