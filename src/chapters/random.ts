import p5 from 'p5';

export const sketch = (p: p5) => {
	const targetFps = 1024 * 10;

	const translateOriginCordinates = () => {
		const [tx, ty] = [p.width / 2, p.height / 2];
		const [mx, my] = [p.mouseX - tx, p.mouseY - ty];
		return { tx, ty, mx, my };
	};

	const acceptreject = () => {
		while (true) {
			let r1 = p.random(1);
			let probability = r1 * r1;
			let r2 = p.random(1);

			if (r2 < probability) {
				return r1;
			}
		}
	};
	type RGB = [number, number, number];

	class Walker {
		x: number;
		y: number;
		constructor() {
			this.x = p.width / 2;
			this.y = p.height / 2;
		}

		show(rgb: RGB = [0, 0, 0]) {
			const [r, g, b] = rgb;
			p.stroke(r, g, b);
			p.point(this.x, this.y);
		}

		step() {
			this.x += p.random(-1, 1);
			this.y += p.random(-1, 1);
		}
	}

	class DynamicWalker extends Walker {
		show(rgb: RGB = [0, 0, 0]) {
			const [r, g, b] = rgb;
			p.strokeWeight(2);
			p.stroke(r, g, b);
			p.point(this.x, this.y);
		}

		step() {
			const { mx, my } = translateOriginCordinates();
			// Randomly decide between mouse-following or random movement
			if (p.random() < 0.5) {
				// 50% chance: Move toward mouse
				if (p.random() < 0.5) {
					this.x += this.x < mx ? 1 : -1;
				} else {
					this.y += this.y < my ? 1 : -1;
				}
			} else {
				const directions = [
					[1, 0],
					[-1, 0],
					[0, 1],
					[0, -1],
				];
				const [dx, dy] = directions[p.floor(p.random(4))];
				this.x += dx;
				this.y += dy;
			}
		}
	}

	// custom distribution
	class MonteCarloWalker extends Walker {
		step() {
			let step = 5;
			let xstep = acceptreject() * step;
			if (p.random([false, true])) {
				xstep *= -1;
			}
			let ystep = acceptreject() * step;
			if (p.random([false, true])) {
				ystep *= -1;
			}
			this.x += xstep;
			this.y += ystep;
		}
	}

	class PerlinNoiseWalker extends Walker {
		tx: number;
		ty: number;

		constructor() {
			super();
			this.tx = 200;
			this.ty = 10000;
		}

		step() {
			// x- and y-position mapped from noise
			this.x = p.map(p.noise(this.tx), 0, 1, 0, p.width);
			this.y = p.map(p.noise(this.ty), 0, 1, 0, p.height);
			// Move forward through time.
			this.tx += 0.01;
			this.ty += 0.01;
		}
	}

	p.setup = () => {
		p.createCanvas(window.innerWidth, window.innerHeight);
		p.background(220);
	};

	const walker = new Walker();
	const dynamicWalker = new DynamicWalker();
	const montecarloWalker = new MonteCarloWalker();
	const perlinNoiseWalker = new PerlinNoiseWalker()

	p.draw = () => {
		const { tx, ty } = translateOriginCordinates();

		p.translate(tx, ty);
		p.stroke(0);

		p.line(-tx, 0, tx, 0); // X-axis
		p.line(0, -ty, 0, ty); // Y-axis

		if (p.frameCount >= targetFps) {
			p.noLoop();
		}

		walker.step();
		walker.show([255, 0, 0]);

		dynamicWalker.step();
		dynamicWalker.show([255, 0, 255]);

		montecarloWalker.step();
		montecarloWalker.show([0, 0, 0]);

		perlinNoiseWalker.step();
		perlinNoiseWalker.show([0, 0, 0]);
	};
};

export default () => new p5(sketch, document.getElementById('app')!);
