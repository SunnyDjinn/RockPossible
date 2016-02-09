/** \file MainSquare.js : the MainSquare object */

function MainSquare(x, y, position, isDead, currentLine) {
	
	/** x position of the center of the square */
	this.x =  Math.floor(x);
	/** y position of the center of the square */
	this.y =  Math.floor(y);
	
	/** Y position (for jumping) */
	this.position = position;
	
	/** Is it jumping right now */
	this.onJump = false;
	
	/** Is it Falling right now */
	this.isFalling = false;
	
	/** Is the player still pressing the jump key */
	this.jumpAgain = false;
	
	/** To know if we must accelerate the fall */
	this.justLanded = false;
	
	/** Is it on top of a cube */
	this.onContact = true;
	
	/** Maximum jump height */
	this.jumpHeight;
	
	/** Is it dead right now */
	this.isDead = isDead;
	
	/** Current level of height */
	this.currentLine = currentLine;
	
	/** Rotation angle */
	this.angle = 0;
	
	/** Draws the main square and makes it move when needed */
	this.draw = function() {
		
		Game.updateScore();
		
		/* If it has not any mounted blocks (blocks on which it is) and 
		 * if it still "onContact", making it not on contact and decreasing 
		 * the line (it has just been on a higher line) */
		if(this.hasMountedBlock() == 0 && this.currentLine > 0) {
			this.onContact = false;
			this.currentLine--;
		}
			
		/* If it is on contact (it is on a block), setting its exact height */
		if(this.onContact)
			this.y = Measures.initialPos - Math.floor(this.currentLine * 2*Measures.halfSquareHeight);
		/* Otherwise, it is not on contact, so it is jumping (or falling), so making it jump (of fall) */
		else
			this.makeJump();
		
		/* drawing the mainSquare */
		
		if(Game.mode == NORMAL){
		/* Retrieving the gradient for drawing */
			if(CurrentSkin.localeCompare("original") == 0) { 
				var gradient = Ctx.createRadialGradient(
									x + Measures.squareWidthCoef * Canvas.width / 2, 
									y - Measures.squareHeightCoef * Canvas.height / 2, 
									1, x, y, 30);
				/* Adding colors to the gradient */
				gradient.addColorStop(0, "#FF9933");
				gradient.addColorStop(1, "#FF4400");
				/* Setting colors for drawing */
				Ctx.fillStyle = gradient;
				Ctx.strokeStyle = "black";
				/* Setting its transparency */
				Ctx.globalAlpha = 1;
				/* Drawing using each corner (diagonal), and an angle, so that it can rotate */
				Ctx.beginPath();
				Ctx.moveTo(this.x+Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle), 
					this.y+Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle));
				Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle), 
					this.y+Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle));
				Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle), 
					this.y-Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle));
				Ctx.lineTo(this.x+Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle), 
					this.y-Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle));
				Ctx.closePath();
				/* Filling the cube and stroking the line around it */
				Ctx.fill();
				Ctx.stroke();
			}
			else {
				Ctx.globalAlpha = 1;
				/* drawing the square but not striking it */
				Ctx.beginPath();
				Ctx.moveTo(this.x+Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle), 
					this.y+Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle));
				Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle), 
					this.y+Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle));
				Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle), 
					this.y-Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle));
				Ctx.lineTo(this.x+Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle), 
					this.y-Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle));
				Ctx.closePath();
				/* drawing the image */
				var img = new Image();
				img.src = CurrentSkin;
				/* here we'll handle the rotation of the image */
				Ctx.save();
				Ctx.translate(this.x,this.y); /* move to the center fo the image */
				Ctx.rotate(this.angle);
				Ctx.drawImage(img,-Measures.halfDiagonalSquare*Math.cos(Math.PI/4),-Measures.halfDiagonalSquare*Math.sin(Math.PI/4));
				Ctx.restore();
			}
		}
		else {
			Ctx.globalAlpha = 1;
			/* drawing the square but not striking it */
			Ctx.beginPath();
			Ctx.moveTo(this.x+Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle), 
				this.y+Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle));
			Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle), 
				this.y+Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle));
			Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle), 
				this.y-Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle));
			Ctx.lineTo(this.x+Measures.halfDiagonalSquare*Math.sin(Math.PI/4+this.angle), 
				this.y-Measures.halfDiagonalSquare*Math.cos(Math.PI/4+this.angle));
			Ctx.closePath();
			/* drawing the image */
			var img = new Image();
			img.src = CurrentSkin;
			/* here we'll handle the rotation of the image */
			Ctx.save();
			Ctx.translate(this.x,this.y); /* move to the center fo the image */
			Ctx.rotate(this.angle);
			Ctx.drawImage(img,-Measures.halfDiagonalSquare*Math.cos(Math.PI/4),-Measures.halfDiagonalSquare*Math.sin(Math.PI/4));
			Ctx.restore();
		}
		/* Here, its coordinates may have been changed the loop turn before, 
		 * and modules have moved, so we're testing any collide with the cube */
		/* Called with the previous context to test using isPointInPath method */
		this.handleCollide();
	};
	 
	/* Sets the main square jump height */
	this.setJumpHeight = function(extend) {
		var height;	
		
	    /* setting up a jumpHeight at two square Height */
	    height = 4*Measures.halfSquareHeight;
		
		/* Adding the extended height */
		height+=extend;
		this.jumpHeight = height;
	};
	
	/* Makes the cube jump, or fall */
	this.makeJump = function() {
		
		/* If it is on jump... */
		if(this.onJump) {
		
			if(this.angle >= 2*Math.PI)
				this.angle = 0;
				
			/* ...And it has traveled under 3/4 of it rise */
			if(this.position < 3/4 *this.jumpHeight) {
				/* Amending accordingly */
				this.y -= Math.floor(this.jumpHeight/Measures.heightLossWhenJump);
				this.position += Math.floor(this.jumpHeight/Measures.heightLossWhenJump);
				this.angle+=Measures.angleRotation;
			}
			/* ...And it has traveled over 3/4 of its rise... => Slowing down at the top */
			else if(this.position >= 3/4*this.jumpHeight && this.position < this.jumpHeight ) {
				/* Amending accordingly */
				this.y -=  Math.floor(this.jumpHeight/(2*Measures.heightLossWhenJump));
				this.position +=  Math.floor(this.jumpHeight/(2*Measures.heightLossWhenJump));
				this.angle+=Measures.angleRotation;
			}
			/* ...And it is on its falling stage */
			/*-this.jumpHeight/Measures.heightLossWhenJump so that it does 
			 * not go further that 2*this.jumpHeight and thus penetrates the ground */
			else if(this.position >=  this.jumpHeight && 
				this.position < 2*this.jumpHeight-(this.jumpHeight/Measures.heightLossWhenJump)) {
				/* Amending accordingly */
				this.y += Math.floor(this.jumpHeight/Measures.heightLossWhenJump);
				this.position +=  Math.floor(this.jumpHeight/Measures.heightLossWhenJump);
				this.angle+=Measures.angleRotation;
			}
			/* ... And it has traveled more than the total journey he needed to do => stoping the jump */
			else if (this.position >= 2*this.jumpHeight-(this.jumpHeight/Measures.heightLossWhenJump)) {
				/* after ending a jump travel distance */
				/* if it's not gonna touch a square means it's gonna fall */
				if(this.jumpAgain) {
					this.isFalling = true; /* if it doesn't touch any square, it'll stay to true */
					this.isItGonnaLand(); /* puts isFalling to false if touches a square */
				}
				if(this.isFalling) /* if it didn't touch any square */
					this.jumpAgain = false; /* we're falling we can't jump again */
				
				if(!Game.cheat)
					this.y+=(2*this.jumpHeight - this.position+2);
				
				/* Amending accordingly */
				if(!this.jumpAgain)
					this.onJump = false;
				 /* if the square spinned less than 1/4 */
				if(this.angle > 0 && this.angle <= (Math.PI/2 + Measures.angleTolerance))
					this.angle=Math.PI/2;
				/* if the square spinned between 1/4 and 1/2 */
				else if(this.angle > (Math.PI/2 + Measures.angleTolerance) && this.angle <= (Math.PI + Measures.angleTolerance))  
					this.angle=Math.PI;
				/* if the square spinned between 1/2 and 3/4 */
				else if(this.angle > (Math.PI + Measures.angleTolerance) && this.angle <= (3*Math.PI/2 + Measures.angleTolerance)) 
					this.angle=3*Math.PI/2;
				 /* if the square spinned between 3/4 and the full rotation */
				else
					this.angle = 0;
					
				this.justLanded = true;
				this.position = 0;
			}
		}
		
		/* Otherwise, it is not jumping, so it is falling from a higher block */
		else {
			
			if(this.angle >= 2*Math.PI)
				this.angle = 0;
				
			this.onJump = false;
			this.jumpAgain = false;
				
			if(!this.justLanded) {
				/* Adjusting its height (it is going down) */
				this.y += Math.floor(this.jumpHeight/Measures.heightLossWhenJump);
				/* Modifying the angle (yeah yeah, it rotates even when it falls !) */
				this.angle += Measures.angleRotation;
			}
			else {  /* it needs to accelarate as it has been falling for a while */
				/* if it's not gonna penetrate ground next iteration */
				if((this.y + 2*Math.floor(this.jumpHeight/Measures.heightLossWhenJump)) < Measures.initialPos) {
					/* Adjusting its height (it is going down) */
					this.y += 2*Math.floor(this.jumpHeight/Measures.heightLossWhenJump);
					/* Modifying the angle (yeah yeah, it rotates even when it falls !) */
					this.angle += Measures.angleRotation;
				}
				else { /* putting on ground */
					/* Adjusting its height (it is going down) */
					this.y = Measures.initialPos;
					/* Modifying the angle (yeah yeah, it rotates even when it falls !) */
					
					if(this.angle > 0 && this.angle <= (Math.PI/2 + Measures.angleTolerance))
						this.angle=Math.PI/2;
					/* if the square spinned between 1/4 and 1/2 */
					else if(this.angle > (Math.PI/2 + Measures.angleTolerance) 
						&& this.angle <= (Math.PI + Measures.angleTolerance))  
						this.angle=Math.PI;
					/* if the square spinned between 1/2 and 3/4 */
					else if(this.angle > (Math.PI + Measures.angleTolerance) 
						&& this.angle <= (3*Math.PI/2 + Measures.angleTolerance)) 
						this.angle=3*Math.PI/2;
				 	/* if the square spinned between 3/4 and the full rotation */
					else 
						this.angle = 0;
				}
			}
		}
		
	};
	
	/* Allows to find if there is any collide between the cube and modules, and makes the cube be dead when it touches another element */
	this.handleCollide = function() {
		var j;
		
		/* For each module */
		for(j = 0; j<Game.moduleArray.length; j++) {
			/* If the module is just before, on, or just after the main square (well, the cube, it's shorter) */
			if(this.x + 2 * Measures.halfSquareWidth >= Game.moduleArray[j].x && this.x - 2 * Measures.halfSquareWidth <= Game.moduleArray[j].x) {
				
				/* If the module is a triangle, the cube must die when it touches it */
				switch(Game.moduleArray[j].type) {
					case INV_TRIANGLE:
						/* Testing the left corner */
						if(Ctx.isPointInPath(Game.moduleArray[j].x - Measures.halfSquareWidth, 
							Game.moduleArray[j].y - Measures.halfSquareHeight))
							this.isDead = true;
						/* Testing the right corner */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x + Measures.halfSquareWidth, 
							Game.moduleArray[j].y - Measures.halfSquareHeight))
							this.isDead = true;
						/* Testing the center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x, Game.moduleArray[j].y))
							this.isDead = true;
						/* Testing the bottom corner */
						if(Ctx.isPointInPath(Game.moduleArray[j].x, 
							Game.moduleArray[j].y + Measures.halfSquareHeight))
							this.isDead = true;
					case TRIANGLE: 
						/* Testing the left corner */
						if(Ctx.isPointInPath(Game.moduleArray[j].x - Measures.halfSquareWidth, 
							Game.moduleArray[j].y + Measures.halfSquareHeight))
							this.isDead = true;
						/* Testing the top corner */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x, 
							Game.moduleArray[j].y - Measures.halfSquareHeight))
							this.isDead = true;
						/* Testing the center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x, Game.moduleArray[j].y))
							this.isDead = true;
						/* Testing the right corner */
						if(Ctx.isPointInPath(Game.moduleArray[j].x + Measures.halfSquareWidth, 
							Game.moduleArray[j].y + Measures.halfSquareHeight))
							this.isDead = true;
						
					break;
					
					/* If the module is a square, it may die, but not when it touches the top of it */
					case SQUARE:
						if(Game.moduleArray[j].isMounted == true)
							break;
						/* Testing the top left corner */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x - Measures.halfSquareWidth+Measures.tolerance, 
							Game.moduleArray[j].y - Measures.halfSquareHeight+Measures.tolerance))
							this.isDead = true;
						/* Testing the middle top left corner/top center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x - Math.floor(1/2 * Measures.halfSquareWidth)
							+ Measures.tolerance, Game.moduleArray[j].y - Measures.halfSquareHeight+Measures.tolerance))
							this.isDead = true;
						/* Testing the top center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x, 
							Game.moduleArray[j].y - Measures.halfSquareHeight+Measures.tolerance))
							this.isDead = true;
						/* Testing the middle top center/top right corner */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x + 
							Math.floor(1/2 * Measures.halfSquareWidth)-Measures.tolerance, 
							Game.moduleArray[j].y - Measures.halfSquareHeight+Measures.tolerance))
							this.isDead = true;	
						/* Testing the top right corner */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x + 
							Measures.halfSquareWidth-Measures.tolerance, 
							Game.moduleArray[j].y - Measures.halfSquareHeight+Measures.tolerance))
							this.isDead = true;
						/* Testing the bottom left corner */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x - 
							Measures.halfSquareWidth+Measures.tolerance, 
							Game.moduleArray[j].y + Measures.halfSquareHeight-Measures.tolerance))
							this.isDead = true;
						/* Testing the left center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x - 
							Measures.halfSquareWidth+Measures.tolerance, Game.moduleArray[j].y))
							this.isDead = true;
						/* Testing the center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x, Game.moduleArray[j].y))
							this.isDead = true;
						/* Testing the right center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x + 
							Measures.halfSquareWidth-Measures.tolerance, Game.moduleArray[j].y))
							this.isDead = true;
						/* Testing the bottom right corner */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x + 
							Measures.halfSquareWidth-Measures.tolerance, 
							Game.moduleArray[j].y + Measures.halfSquareHeight-Measures.tolerance))
							this.isDead = true;
							
						/* Here, the cube may very well be dead, that's why 
						 * we're testing if the collide has been on the top of the module */
						this.makeMountOn(j);
					break;
					
					/* If the module is empty, we just need to make the cube mount on, 
					 * especially when it's on the ground */
					case EMPTY:
						this.emptyIsMounted(j);
					break;
					
					/* If the module is unknown... Who knows, it might happen! */
					default:
					break;
				}
			}
		}
	};
	
	/* Tries to make the cube mount on the module indicated by the index passed in argument (in the module array) */
	this.makeMountOn = function(ind) {
		var i=1;
		/* If the cube is on top of the module (which is a square, remember) */
		if((this.y + Measures.halfDiagonalSquare) <= Game.moduleArray[ind].y && 
			(this.y - Measures.halfDiagonalSquare >= (Game.moduleArray[ind].y - 
			Measures.halfSquareHeight - (2 * Measures.halfDiagonalSquare) )) 
			&& this.x >= Game.moduleArray[ind].x - Measures.halfSquareWidth 
			&& this.x <= Game.moduleArray[ind].x + Measures.halfSquareWidth) {
			/* Then, if it isn't already mounted, make it happen */
			if(!Game.moduleArray[ind].isMounted)
				Game.moduleArray[ind].isMounted = true;
			/* If the cube is not already on contact, aaaaand that Game.moduleArray[ind] is not on the same line as the mainSquare */
			if(!this.onContact && (Game.moduleArray[ind].y - Measures.halfSquareHeight) 
				<= (Measures.initialPos - this.currentLine * 2 * Measures.halfSquareHeight)) {
				/* Increasing the current line and making it be on contact */
				this.currentLine++;
				if(!this.jumpAgain)
					this.onContact = true;
				this.isFalling = false;
				this.justLanded = false;
				/* If there is a module under it and the latter is not under the 
				 * "line" (happens only when the cube tries to jump 2 squares at a time)
				 * We need to do a while if the square is higher than 2 squares */       
				while(Game.moduleArray[ind+i].y <= Measures.initialPos 
					&& Game.moduleArray[ind+i].x == Game.moduleArray[ind].x) {
					/* Increasing again the current line */
					this.currentLine++;
					if(!this.jumpAgain)
						this.onContact = true;
					this.isFalling = false;
					i++;
				}
			}
			/* It's on contact, so it's not jumping anymore, and if it was 
			 * dead (any collide...), now it's not ! (because the collide was
			 * on top of the module) */
			if(!this.jumpAgain)
					this.onJump = false;
			this.isDead = false;
			
			/* There, the cube has spinned, setting its rotation so that it is straight now */
			/* if the square spinned less than 1/4 */
			if(this.angle > 0 && this.angle <= (Math.PI/2 + Measures.angleTolerance))
				this.angle=Math.PI/2;
				/* if the square spinned between 1/4 and 1/2 */
			else if(this.angle > (Math.PI/2 + Measures.angleTolerance) 
				&& this.angle <= (Math.PI + Measures.angleTolerance))  
				this.angle=Math.PI;
			/* if the square spinned between 1/2 and 3/4 */
			else if(this.angle > (Math.PI + Measures.angleTolerance) 
				&& this.angle <= (3*Math.PI/2 + Measures.angleTolerance)) 
				this.angle=3*Math.PI/2;
			 /* if the square spinned between 3/4 and the full rotation */
			else 
				this.angle = 0;
			
			this.position = 0;
		}
	};
	
	/* Marks the empty module as mounted when it is (in the module 
	 * array at the index "ind") */
	this.emptyIsMounted = function(ind) {
		
		/* if the empty bloc is below the ground, if the cube isn't on 
		 * jump(he just flied off) and it is on top of the module 
		 * (which is empty here) */
		if(Game.moduleArray[ind].y > Measures.initialPos && !this.onJump 
			&& ((this.y + Measures.halfDiagonalSquare) <= (Game.moduleArray[ind].y - 
			Math.floor(1/2 * Measures.halfSquareHeight))) && 
			(this.y - Measures.halfDiagonalSquare >= (Game.moduleArray[ind].y - 
			Measures.halfSquareHeight - (2 * Measures.halfDiagonalSquare) ))) {
			/* Marking the module as mounted */
			Game.moduleArray[ind].isMounted = true;
			/* And if it is mounted, the cube is not on jump anymore and skips to on contact */
			if(!this.jumpAgain){
				this.onContact = true;
				this.onJump = false;
			}
			this.isFalling = false;
			this.justLanded = false;
		}
		/* If it's on contact, setting its rotation so that it is straight now*/
		if(this.onContact) {
			/* if the square spinned less than 1/4 */
			if(this.angle > 0 && this.angle <= (Math.PI/2 + Measures.angleTolerance))
				this.angle=Math.PI/2;
			/* if the square spinned between 1/4 and 1/2 */
			else if(this.angle > (Math.PI/2 + Measures.angleTolerance) 
				&& this.angle <= (Math.PI + Measures.angleTolerance))  
				this.angle=Math.PI;
			/* if the square spinned between 1/2 and 3/4 */
			else if(this.angle > (Math.PI + Measures.angleTolerance) 
				&& this.angle <= (3*Math.PI/2 + Measures.angleTolerance)) 
				this.angle=3*Math.PI/2;
			/* if the square spinned between 3/4 and the full rotation */
			else 
				this.angle = 0;
			
			this.position = 0;
		}
	};
	
	/* Removes the "isMounted" status for each module wich is before the cube */
	this.removeIsMounted = function() {
		var i;
		/* For each module */
		for(i = 0; i<Game.moduleArray.length; i++)
			/* If the module is before the main square, it's not mounted anymore */
			if(this.x - Measures.halfSquareWidth > Game.moduleArray[i].x + Measures.halfSquareWidth)
				Game.moduleArray[i].isMounted = false;
	}
	
	/* Tests, for each module, if it is mounted (after removing the previous outdated status) */
	/* Returns 1 if at least one module is mounted, 0 otherwise */
	this.hasMountedBlock = function() {
		var i;
		this.removeIsMounted();
		for(i = 0; i<Game.moduleArray.length; i++)
			if(Game.moduleArray[i].isMounted == true)
				return 1;
		return 0;
	}

	/* this function is here to enable the square to jump without stopping due to keydown */
	this.isItGonnaLand = function() {
		var j;
		
		/* For each module */
		for(j = 0; j<Game.moduleArray.length; j++) {
			/* If the module is just before, on, or just after the main 
			 * square (well, the cube, it's shorter) */
			if(this.x + 2 * Measures.halfSquareWidth >= Game.moduleArray[j].x 
				&& this.x - 2 * Measures.halfSquareWidth <= Game.moduleArray[j].x) {
				
				/* If the module is a triangle, the cube must die when it touches it */
				switch(Game.moduleArray[j].type) {
					/* If the module is a square, it may die, but not when it touches the top of it */
					case SQUARE:
						/* Testing the top left corner */
						if(Ctx.isPointInPath(Game.moduleArray[j].x - 
							Measures.halfSquareWidth+Measures.tolerance, 
							Game.moduleArray[j].y - Measures.halfSquareHeight+Measures.tolerance)){
							this.isFalling = false;
							this.isDead = true;
						}
						/* Testing the middle top left corner/top center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x - Math.floor(1/2 * 
							Measures.halfSquareWidth)+Measures.tolerance, Game.moduleArray[j].y - 
							Measures.halfSquareHeight+Measures.tolerance)) {
							this.isFalling = false;
							this.isDead = true;
						}
						/* Testing the top center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x, Game.moduleArray[j].y - 
							Measures.halfSquareHeight+Measures.tolerance)) {
							this.isFalling = false;
							this.isDead = true;
						}
						/* Testing the middle top center/top right corner */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x + Math.floor(1/2 * 
							Measures.halfSquareWidth)-Measures.tolerance, Game.moduleArray[j].y - 
							Measures.halfSquareHeight+Measures.tolerance)){
							this.isFalling = false;
							this.isDead = true;
						}
						/* Testing the top right corner */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x + 
							Measures.halfSquareWidth-Measures.tolerance, 
							Game.moduleArray[j].y - Measures.halfSquareHeight+Measures.tolerance)) {
							this.isFalling = false;
							this.isDead = true;
						}
						/* Testing the bottom left corner */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x - 
							Measures.halfSquareWidth+Measures.tolerance, 
							Game.moduleArray[j].y + Measures.halfSquareHeight-Measures.tolerance)){
							this.isFalling = false;
							this.isDead = true;
						}
						/* Testing the left center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x - 
							Measures.halfSquareWidth+Measures.tolerance, 
							Game.moduleArray[j].y)) {
							this.isFalling = false;
							this.isDead = true;
						}
						/* Testing the center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x, Game.moduleArray[j].y)) {
							this.isFalling = false;
							this.isDead = true;
						}
						/* Testing the right center */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x + 
							Measures.halfSquareWidth-Measures.tolerance, 
							Game.moduleArray[j].y)) {
							this.isFalling = false;
							this.isDead = true;
						}
						/* Testing the bottom right corner */
						else if(Ctx.isPointInPath(Game.moduleArray[j].x + 
							Measures.halfSquareWidth-Measures.tolerance, 
							Game.moduleArray[j].y + Measures.halfSquareHeight-Measures.tolerance)){
							this.isFalling = false;
							this.isDead = true;
						}
							
						/* Here, the cube may very well be dead, that's why 
						 * we're testing if the collide has been on the top of the module */
					break;
					
					/* If the module is empty, we just need to make the 
					 * cube mount on, especially when it's on the ground */
					case EMPTY:
						/* the empty square needs to be closer enough to the mainsquare */
						if((Game.moduleArray[j].y - 3*Measures.halfSquareHeight) <= this.y)
							this.isFalling = false;
					break;
					
					/* If the module is unknown... Who knows, it might happen ! */
					default:
					break;
				}
			}
		}
	};
}
	
/* The framework object*/
function Framework(color1, color2, lineColor) {
	this.color1 = color1;
	this.color2 = color2;
	this.lineColor = lineColor;
	
	this.draw = function() {
		var gradient = Ctx.createLinearGradient(0, 0, 0, Canvas.height);
		gradient.addColorStop(0, color1);
		gradient.addColorStop(1, color2);
		Ctx.fillStyle = gradient;
		Ctx.globalAlpha = 1;
		Ctx.fillRect(0, 0, Canvas.width, Canvas.height);
		
		/* Bottom line of the background */
		Ctx.strokeStyle = lineColor;
		Ctx.lineWidth = 1;
		Ctx.beginPath();
		Ctx.moveTo(Measures.lineWidthCoef * Canvas.width, Measures.lineHeightCoef * Canvas.height);
		Ctx.lineTo((1 - Measures.lineWidthCoef) * Canvas.width, Measures.lineHeightCoef * Canvas.height);
		Ctx.stroke();
	};
}
