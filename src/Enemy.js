import { Vector2 } from 'three';

export default class Enemy {
	constructor(ctx,x, y, size) {

		// this.ctx = ctx;
		this.size = size;
		this.s = this.makeRand(10,60);
		this.x = x - size/2;
		this.y = y - size/2;
		this.color = 'tomato';
		this.v = 1;
		this.direction = new Vector2(0,0).normalize();
		// console.log('distanceTo',this.player.distanceTo(this.target));
		// console.log('target normalize',this.target.normalize());
		// console.log('direction',this.direction );
		// console.log('px,py',player.x,player.y);
		// console.log('angle',this.player.angle());
		console.log(ctx);
	}

	makeRand(min,max) {
		return Math.floor(Math.random() * (max - min) + min)
	}

	changeDirection(bullets){

		for (var i = bullets.length - 1; i >= 0; i--) {
			//selelt a bullet to focus on
			const focus = bullets[0];
			//change direction as per colosed bullet
			if (focus.x < this.x - this.size/2) {
				
				this.direction = new Vector2(-1,0).normalize();

			} else if(focus.x > this.x - this.size/2) {
				this.direction = new Vector2(1,0).normalize();
			}

		}
		// this.direction.x = (Math.random() < 0.5) ? -Math.random() : Math.random();
	}

	move() {
		this.x += this.v * this.direction.x;
		this.y += this.v * this.direction.y;
	}

	hitDetection(bullets) {
		for (var i = bullets.length - 1; i >= 0; i--) {
			if (bullets[i].x + bullets[i].r >= this.x &&
				bullets[i].x - bullets[i].r <= this.x + this.size &&
				bullets[i].y - bullets[i].r <= this.y + this.size &&
				bullets[i].y + bullets[i].r >= this.y) {
				console.log('hit');
				// this.color = 'black';
				return true;
			} else {
				return false;
			}
			// console.log(this.x,this.y);
			// console.log(bullets[i].x,bullets[i].y);
		}
	}

	render(ctx) {
		// this.move();
		const { color, size, x, y } = this;
		ctx.beginPath();
		ctx.rect(x,y,size,size);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}