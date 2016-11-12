import { Vector2 } from 'three';

export default class Bullet {
	constructor(player, x, y) {
		this.player = player;
		this.x = player.x;
		this.y = player.y - player.r/3;
		this.r = 5;
		this.color = 'gold';
		this.v = 3;
		this.trail = [];
		this.launched = false;
		this.launchParticles = [];
		this.launchParticlesActive = false;
		this.direction = new Vector2(x - this.x, y - this.y ).normalize();
	}

	makeRand(min,max) {
	  return Math.floor(Math.random() * (max - min) + min)
	}

	render(ctx) {
		const { color, r } = this;

		this.renderParticles(ctx);
		this.createTrail();
		this.renderTrail(ctx);

		// ctx.globalCompositeOperation = 'multiply';
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(this.x += this.direction.x * this.v,this.y += this.direction.y * this.v,r,0,2*Math.PI);
		ctx.fill();
		ctx.globalCompositeOperation = 'source-over';

		const dist = Math.sqrt(Math.pow(this.player.x - this.x,2)+Math.pow(this.player.y - this.y,2));
		


		if (dist > this.player.r - this.r/2 && !this.launched) {
			// console.log('launched');
			
			this.createLaunchParticles(50);
			this.launched = true;
		}

	}

	createLaunchParticles(n) {
		// console.log(this.x);
		for (var i = n - 1; i >= 0; i--) {
			// console.log(n);
			const v = Math.random();
			const randPercent = 0.5;
			const newDx = (Math.random() < .5) ? this.direction.x - Math.random()*randPercent : this.direction.x + Math.random()*randPercent;
			const newY = (Math.random() < .5) ? this.direction.y - Math.random()*randPercent : this.direction.y + Math.random()*randPercent;
			const newDirection = new Vector2(newDx, newY).normalize();
			const particle = { x: this.x, y: this.y, v, direction: newDirection, opacity: 1 };
			this.launchParticles.push(particle);
		}
		this.launchParticlesActive = false;
	}

	renderParticles(ctx) {
		for (var i = this.launchParticles.length - 1; i >= 0; i--) {
			this.launchParticles[i].opacity -= .02;
			// console.log(this.launchParticles[i].opacity);
			const x = this.launchParticles[i].x += this.launchParticles[i].direction.x * this.launchParticles[i].v;
			const y = this.launchParticles[i].y += this.launchParticles[i].direction.y * this.launchParticles[i].v ;
			ctx.beginPath();
			ctx.fillStyle=`hsla(120,61%,50%,${this.launchParticles[i].opacity})`;
			ctx.arc(x,y,1,0,2*Math.PI);
			ctx.fill();
			if (this.launchParticles[i].opacity < 0) {
				this.launchParticles.splice(i,1);
			}
		}
	}

	createTrail() {

		const randPercent = 0.5;
		const direction = new Vector2(this.direction.x*-1 - Math.random()*randPercent,this.direction.y*-1 - Math.random()*randPercent);

		this.trail.push({x: this.x, y: this.y, v: 1, direction: direction, opacity: 1});
		// this.trail.push({x: this.x - this.r/2, y: this.y - this.r/2, v: 1, direction: direction, life: this.makeRand(100,400), opacity: 1});
		// this.trail.push({x: this.x + this.r/2, y: this.y + this.r/2, v: 1, direction: direction, life: this.makeRand(100,400), opacity: 1});
		// this.trail.push({x: this.x + this.r/2, y: this.y - this.r/2, v: 1, direction: direction, life: this.makeRand(100,400), opacity: 1});
		// this.trail.push({x: this.x - this.r/2, y: this.y + this.r/2, v: 1, direction: direction, life: this.makeRand(100,400), opacity: 1});
	}

	renderTrail(ctx) {
		for (var i = this.trail.length - 1; i >= 0; i--) {
			const x = this.trail[i].x += this.trail[i].direction.x * this.trail[i].v;
			const y = this.trail[i].y += this.trail[i].direction.y * this.trail[i].v;
			this.trail[i].opacity -= 0.08;
			ctx.beginPath();
			ctx.fillStyle=`hsla(51,100%,20%,${this.trail[i].opacity})`;
			ctx.arc(x,y,6,0,2*Math.PI);
			ctx.fill();
			if (this.trail[i].opacity < 0) {
				this.trail.splice(i,1);
			}
		}
	}
}