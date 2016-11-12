import Bullet from './Bullet';
import shoot from './audio/shoot.mp3';

export default class Player {
	constructor(ctx,r) {

		this.audio = new Audio(shoot);
		const w = ctx.canvas.width;
		const h = ctx.canvas.height;


		this.x = w/2;
		this.y = h/2;
		this.targetX = w/2;
		// this.preY = h + r/3;
		this.r = r;
		this.color = 'hsla(120,60%,50%,1)';
		this.bullets = [];
		this.v = 5;
		// this.moving = 0;
	}

	renderBullets(ctx) {
		for (var i = this.bullets.length - 1; i >= 0; i--) {
			this.bullets[i].render(ctx);
			if (this.bullets[i].x > ctx.canvas.width || this.bullets[i].x < 0 || this.bullets[i].y > ctx.canvas.height || this.bullets[i].y < 0) {
				this.bullets.splice(i,1);
			}
		}
	}

	render(ctx) {

		const { color, x, y, r } = this;

		this.renderBullets(ctx);
		
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x,y,r,0,2*Math.PI);
		// if (this.moving === 0) {
			
		// 	ctx.arc(x,y,r,0,2*Math.PI);
			
		// } else if(this.moving === -1) {
		// 	ctx.arc(this.x-=this.v,y,r,0,2*Math.PI);
		// 	if (this.targetX >= this.x ) {
		// 		this.moving = 0;
		// 	}
		// } else if(this.moving === 1) {
		// 	ctx.arc(this.x+=this.v,y,r,0,2*Math.PI);
		// 	if (this.targetX <= this.x ) {
		// 		this.moving = 0;
		// 	}
		// }
		ctx.fill();


	}

	move(direction,x) {
		// if (Math.abs(this.x - x) > 10) {
		// 	this.targetX = x;
		// 	this.moving = this.x - x < 0 ? 1 : -1;
		// }
		if(direction < 0) {

			this.x -= x;
		} else {
			this.x += x;
		}
	}

	fire(x,y) {
		// console.log(x,y);
		// this.audio.load();
		const sound = new Audio(shoot);
		sound.play();
		this.bullets.push(new Bullet(this,x,y));
		// this.audio.play();
		// console.log(this.bullets);
	}

	screenResize(ctx) {
		const w = ctx.canvas.width;
		const h = ctx.canvas.height;

		this.x = w/2;
		this.y = h/2;
	}
}