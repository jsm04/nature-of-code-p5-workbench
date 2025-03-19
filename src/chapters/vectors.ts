import p5 from 'p5';

export const sketch = (p: p5) => {
	let position: p5.Vector, velocity: p5.Vector;

	p.setup = () => {
		p.createCanvas(window.innerWidth, window.innerHeight);

		position = p.createVector(100, 100);
		velocity = p.createVector(1, 3.3);
	};

	p.draw = () => {
		const [tx, ty] = [p.width, p.height];

		p.background(220);

		position.add(velocity);

		if (position.x > tx || position.x < 0) {
			velocity.x = velocity.x * -1;
		}
		if (position.y > ty || position.y < 0) {
			velocity.y = velocity.y * -1;
		}

		p.stroke(0);
		p.fill(127);
		p.circle(position.x, position.y, 48);
	};
};

export default () => new p5(sketch, document.getElementById('app')!);
