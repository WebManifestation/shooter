import { Vector2 } from 'three';

export default class Bullet {
	constructor(player, x, y) {

		this.player = player;
		this.x = player.x;
		this.y = player.y;
		this.r = 5;
		this.color = 'tomato';
		this.v = 3;
		this.launched = false;
		this.target = new Vector2(x,y);
		this.bullet = new Vector2(this.x,this.y);
		this.direction = new Vector2(this.target.x - this.bullet.x,this.target.y - this.bullet.y ).normalize();
		// console.log('distanceTo',this.player.distanceTo(this.target));
		// console.log('target normalize',this.target.normalize());
		// console.log('direction',this.direction );
		// console.log('px,py',player.x,player.y);
		// console.log('angle',this.player.angle());
	}

	render(ctx) {
		const { color, r } = this;

		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(this.x += this.direction.x * this.v,this.y += this.direction.y * this.v,r,0,2*Math.PI);
		ctx.fill();
		const dist = Math.sqrt(Math.pow(this.player.x - this.x,2)+Math.pow(this.player.y - this.y,2));
		// console.log(dist);
		if (dist > this.player.r && !this.launched) {
			// console.log('launched');
			this.launched = true;
		}
	}
}