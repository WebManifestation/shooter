import React, { Component } from 'react';
import './App.css';
import Player from './Player';
import Enemy from './Enemy';

class App extends Component {
	componentDidMount() {
		this.c = this.refs.myCanvas;
		this.w = this.c.width = window.innerWidth;
		this.h = this.c.height = window.innerHeight;
		this.ctx = this.c.getContext('2d');
		this.bgColor = 'black';
		this.tick = 0;
		this.animationId = requestAnimationFrame( this.loop.bind(this) );

		// window.addEventListener('resize', () => {
		// 	this.w = this.c.width = window.innerWidth;
		// 	this.h = this.c.height = window.innerHeight;
		// 	this.shooter.screenResize(this.ctx);
		// });

		// window.addEventListener('keydown',this.handelKeyPress.bind(this));

		// console.log(Player);
		this.shooter = new Player(this.ctx,100);
		this.enemies = [];
		this.enemies.push(new Enemy(this.ctx,this.w/2,this.h/4,30));
		this.enemies.push(new Enemy(this.ctx,this.w/4,this.h/4,30));
		this.enemies.push(new Enemy(this.ctx,this.w/1.25,this.h/4,30));

		// this.enemies.push(new Enemy(this.ctx,this.w/2,this.h/2,30));
		// this.enemies.push(new Enemy(this.ctx,this.w/4,this.h/2,30));
		// this.enemies.push(new Enemy(this.ctx,this.w/1.25,this.h/2,30));
	}

	handelClick(e) {
		const {clientX,clientY} = e;
		// console.log(this.shooter.shoot(clientX,clientY));
			// this.shooter.move(clientX);
			this.shooter.fire(clientX,clientY);
	}

	handelTap(e) {
		e.preventDefault();
		const {clientX,clientY} = e.nativeEvent.touches[0];
		// console.log(e.nativeEvent.touches[0]);
		this.shooter.fire(clientX,clientY);	
	}

	handelKeyPress(e) {
		if (e.key === 'a') {
			this.shooter.move(-1,this.shooter.v);
		}
		if (e.key === 'd') {
			this.shooter.move(1,this.shooter.v);
		}
	}

	loop() {

		this.animationId = requestAnimationFrame( this.loop.bind(this) );
		++this.tick;
		this.ctx.fillStyle = this.bgColor;
		this.ctx.fillRect(0,0,this.w,this.h);

		for (var i = this.enemies.length - 1; i >= 0; i--) {
			this.enemies[i].changeDirection(this.shooter.bullets);
			this.enemies[i].render(this.ctx);
			const isHit = this.enemies[i].hitDetection(this.shooter.bullets);
			if (isHit) {
				this.enemies.splice(i,1);
			}
		}

		this.shooter.render(this.ctx);
	}

  render() {
    return (
      <canvas onKeyPress={this.handelKeyPress.bind(this)} onTouchStart={this.handelTap.bind(this)} onClick={this.handelClick.bind(this)} style={{position: 'absolute', top: 0, left: 0}} ref="myCanvas"/>
    );
  }
}

export default App;
