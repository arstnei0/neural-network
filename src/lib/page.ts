import { activate } from "./activate"
import { Perceptron, Point } from "./perceptron"

const fn = (x: number): number => x * 0.9 + 90
const scale = 5

function timeout(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

const points = Array.from({ length: 80000 }, () => Point.random())

const drawLine = (canvas: CanvasRenderingContext2D, p1: Point, p2: Point) => {
	canvas.beginPath()
	canvas.moveTo(p1.x * scale, p1.y * scale)
	canvas.lineTo(p2.x * scale, p2.y * scale)
	canvas.stroke()
}

const displayFn = (canvas: CanvasRenderingContext2D, fn: (x: number) => number) => {
	const pointOne = new Point(0, fn(0))
	const pointTwo = new Point(100, fn(100))
	drawLine(canvas, pointOne, pointTwo)
}

{
	const canvasEl = document.createElement("canvas")
	canvasEl.width = 100 * scale
	canvasEl.height = 100 * scale
	document.body.appendChild(canvasEl)

	const canvas = canvasEl.getContext("2d") as CanvasRenderingContext2D
	displayFn(canvas, fn)
	points.map((p) => {
		p.draw(canvas, scale, activate(fn(p.x) - p.y) < 0.5)
	})
}

{
	const canvasEl = document.createElement("canvas")
	canvasEl.width = 100 * scale
	canvasEl.height = 100 * scale
	document.body.appendChild(canvasEl)

	const canvas = canvasEl.getContext("2d") as CanvasRenderingContext2D
	const perceptron = new Perceptron()

	for (const p of points) {
		const guess = perceptron.guess(p)
		const error = perceptron.learn(p, guess, activate(fn(p.x) - p.y))
		displayFn(canvas, perceptron.fn.bind(perceptron))
		p.draw(canvas, scale, 0 - error > 0.1)
		canvas.globalAlpha = 0.008
		canvas.fillStyle = "white"
		canvas.fillRect(0, 0, canvasEl.width, canvasEl.height)
		canvas.globalAlpha = 1
		await timeout(0.01)
	}
}
