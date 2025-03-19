import p5 from 'p5';

export const sketch = (p: p5) => {
	const targetFps = 1024 * 10;

	const translateXYCoordOrigin = () => [p.width / 2, p.height / 2];

	const translateMouseOriginCoords = () => {
		const [tx, ty] = translateXYCoordOrigin();
		const [mx, my] = [p.mouseX - tx, p.mouseY - ty];
		return { mx, my };
	};

	p.setup = () => {
		p.createCanvas(window.innerWidth, window.innerHeight);
		p.background(220);
	};

	p.draw = () => {
		const [tx, ty] = translateXYCoordOrigin();
		p.translate(tx, ty);
		p.stroke(0);

		p.line(-tx, 0, tx, 0); // X-axis
		p.line(0, -ty, 0, ty); // Y-axis

		if (p.frameCount >= targetFps) {
			p.noLoop();
		}

		p.ellipse(0, 0, 80, 80);
	};
};

export default () => new p5(sketch, document.getElementById('app')!);
