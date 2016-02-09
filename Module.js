/** \file Module.js : The Module object */

/**
 * Module object, attributes and methods
 * */
function Module(x, y, positionTranslation, type, alpha, isMounted) {
	
	/** x coordinate */
	this.x = Math.floor(x);
	
	/** y coordinate*/
	this.y =  Math.floor(y);
	
	/** Module type */
	this.type = type;
	
	/** Position for the translation */
	this.position = -this.x+Canvas.width;
	
	/** Has the main square on its top */
	this.isMounted = isMounted;
	
	/** Shift for position translation */
	this.positionTranslation = Math.floor(positionTranslation);
	
	/** global alpha for context */
	this.alpha = alpha;
	
	/** Set the position */
	this.setPosition = function() {
		this.position += this.positionTranslation;
		this.x = Canvas.width-this.position;
	}
	
	/**
	 *  Adds an element to the Game.moduleArray when this one disapears 
	 * */
	this.pushModuleArray = function() {
		var lastOne;
		switch(Game.level) {
			case 0:
				lastOne = Game.moduleArray.length-1;
				/* While the module is not one beneath the line */
				while(Levels[0][Game.levelArrayCursor].y != +1) {
					Game.moduleArray.push(
						new Module(Game.moduleArray[lastOne].x + 2 * Measures.halfSquareWidth, 
							Measures.lineHeightCoef * Canvas.height + Levels[0][Game.levelArrayCursor].y * Measures.halfSquareHeight, 
							Levels[0][Game.levelArrayCursor].translation, Levels[0][Game.levelArrayCursor].type, 
							Levels[0][Game.levelArrayCursor].alpha, Levels[0][Game.levelArrayCursor].mounted
						));
					Game.levelArrayCursor++;
				}
				/* Pushing the empty module beneath the line */
				Game.moduleArray.push(
						new Module(Game.moduleArray[lastOne].x + 2 * Measures.halfSquareWidth, 
							Measures.lineHeightCoef * Canvas.height + Levels[0][Game.levelArrayCursor].y * Measures.halfSquareHeight, 
							Levels[0][Game.levelArrayCursor].translation, Levels[0][Game.levelArrayCursor].type, 
							Levels[0][Game.levelArrayCursor].alpha, Levels[0][Game.levelArrayCursor].mounted
						));
				Game.levelArrayCursor++;
				Game.levelArrayCursor = Game.levelArrayCursor % Levels[0].length;
				
				/* Shifting each module before this one */
				while(Game.moduleArray[0].y != this.y)
					Game.moduleArray.shift();
		
				/* Shifting the current one */
				Game.moduleArray.shift();
			break;
			
			default:
				lastOne = Game.moduleArray.length-1;
				/* While the module is not one beneath the line */
				while(Game.levelArrayCursor < Levels[Game.level].length-1 && Levels[Game.level][Game.levelArrayCursor].y != +1) {
					Game.moduleArray.push(
						new Module(Game.moduleArray[lastOne].x + 2 * Measures.halfSquareWidth, 
							Measures.lineHeightCoef * Canvas.height + Levels[Game.level][Game.levelArrayCursor].y * Measures.halfSquareHeight, 
							Levels[Game.level][Game.levelArrayCursor].translation, Levels[Game.level][Game.levelArrayCursor].type, 
							Levels[Game.level][Game.levelArrayCursor].alpha, 
							Levels[Game.level][Game.levelArrayCursor].mounted
						));
					Game.levelArrayCursor++;
				}
				if(Game.levelArrayCursor < Levels[Game.level].length-1)
				{
					/* Pushing the empty module beneath the line */
					Game.moduleArray.push(
							new Module(Game.moduleArray[lastOne].x + 2 * Measures.halfSquareWidth, 
								Measures.lineHeightCoef * Canvas.height + Levels[Game.level][Game.levelArrayCursor].y * Measures.halfSquareHeight, 
								Levels[Game.level][Game.levelArrayCursor].translation, Levels[Game.level][Game.levelArrayCursor].type, 
								Levels[Game.level][Game.levelArrayCursor].alpha, 
								Levels[Game.level][Game.levelArrayCursor].mounted
							));
					Game.levelArrayCursor++;
				}
				
				/* Shifting each module before this one */
				while(Game.moduleArray[0].y != this.y)
				{
					Game.moduleArray.shift();
					Game.scoreCounter++;
				}
				/* Shifting the current one */
				Game.moduleArray.shift();
				Game.scoreCounter++;
			break;
		}
		Game.updateScore();
	};
	 
	/**
	 *  Draws the object on the canvas 
	 * */
	this.draw = function() {
		
		/* Increasing the transparency for a disapearing effect */
		if(this.x <=  Math.floor(2 * Measures.lineWidthCoef * Canvas.width) && this.alpha > 0) {
			this.alpha -= 0.04;
			if(this.alpha < 0)
				this.alpha = 0;
			if(this.x < 0)
				this.alpha = 0;
		}
		
		/* Decreasing the transparency for an apparition effect */
		if(this.x >=  Math.floor(Canvas.width - 3 * Measures.lineWidthCoef * Canvas.width) && this.x <= Canvas.width && this.alpha < 1) {
			this.alpha += 0.04;
			if(this.alpha > 1)
				this.alpha = 1;
			if(this.x <= Canvas.width - 3 * Measures.lineWidthCoef * Canvas.width)
				this.alpha = 1;
		}
		
		this.setPosition();
		
		/* If the module has passed away */
		if(this.x - Measures.halfSquareWidth < 0 && this.type == EMPTY) {
			this.pushModuleArray();
		}
		
		if(this.type == EMPTY) {
			/* Must be verified */
			Ctx.beginPath();
			Ctx.fillStyle = "black";
			Ctx.strokeStyle = "white"; 
			Ctx.globalAlpha = this.alpha;
			Ctx.lineWidth = 1;
			Ctx.beginPath();
			Ctx.moveTo(this.x+Measures.halfDiagonalSquare*Math.cos(Math.PI/4), 
				this.y+Measures.halfDiagonalSquare*Math.sin(Math.PI/4));
			Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.sin(Math.PI/4), 
				this.y+Measures.halfDiagonalSquare*Math.cos(Math.PI/4));
			Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.cos(Math.PI/4), 
				this.y-Measures.halfDiagonalSquare*Math.sin(Math.PI/4));
			Ctx.lineTo(this.x+Measures.halfDiagonalSquare*Math.sin(Math.PI/4), 
				this.y-Measures.halfDiagonalSquare*Math.cos(Math.PI/4));
			Ctx.closePath();
		}
		
		/* Drawing a black square */
		else if(this.type == SQUARE) {
			if(Game.mode == NORMAL){
				Ctx.fillStyle = "black";
				Ctx.strokeStyle = "white";    
				Ctx.globalAlpha = this.alpha;
				Ctx.lineWidth = 1;
				Ctx.beginPath();
				Ctx.moveTo(this.x+Measures.halfDiagonalSquare*Math.cos(Math.PI/4), 
					this.y+Measures.halfDiagonalSquare*Math.sin(Math.PI/4));
				Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.sin(Math.PI/4), 
					this.y+Measures.halfDiagonalSquare*Math.cos(Math.PI/4));
				Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.cos(Math.PI/4), 
					this.y-Measures.halfDiagonalSquare*Math.sin(Math.PI/4));
				Ctx.lineTo(this.x+Measures.halfDiagonalSquare*Math.sin(Math.PI/4), 
					this.y-Measures.halfDiagonalSquare*Math.cos(Math.PI/4));
				Ctx.closePath();
				Ctx.fill();
				Ctx.stroke();
			}
			else
			{
				/* drawing but not strikinG it */
				Ctx.beginPath();
				Ctx.moveTo(this.x+Measures.halfDiagonalSquare*Math.cos(Math.PI/4), 
					this.y+Measures.halfDiagonalSquare*Math.sin(Math.PI/4));
				Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.sin(Math.PI/4), 
					this.y+Measures.halfDiagonalSquare*Math.cos(Math.PI/4));
				Ctx.lineTo(this.x-Measures.halfDiagonalSquare*Math.cos(Math.PI/4), 
					this.y-Measures.halfDiagonalSquare*Math.sin(Math.PI/4));
				Ctx.lineTo(this.x+Measures.halfDiagonalSquare*Math.sin(Math.PI/4), 
					this.y-Measures.halfDiagonalSquare*Math.cos(Math.PI/4));
				Ctx.closePath();
				/* drawing the image */
				var img = new Image();
				img.src = "Images/ampli.png";
				Ctx.drawImage(img,this.x-Measures.halfDiagonalSquare*Math.cos(Math.PI/4),
					this.y-Measures.halfDiagonalSquare*Math.sin(Math.PI/4));
			}
		}
		
		/* Drawing a black triangle */
		else if(this.type == TRIANGLE) {
			if(Game.mode == NORMAL) {
				/* Drawing from the center */
				Ctx.fillStyle = "black";
				Ctx.strokeStyle = "white";
				Ctx.globalAlpha = this.alpha;
				Ctx.lineWidth = 1;
				Ctx.beginPath();
				Ctx.moveTo(this.x - Measures.halfSquareHeight, this.y + Measures.halfSquareHeight);
				Ctx.lineTo(this.x, this.y - Measures.halfSquareHeight);
				Ctx.lineTo(this.x + Measures.halfSquareHeight, this.y + Measures.halfSquareHeight);
				Ctx.closePath();
				Ctx.fill();
				Ctx.stroke();
			}
			else {
				/* drawing but not striking it */
				Ctx.beginPath();
				Ctx.moveTo(this.x - Measures.halfSquareHeight, this.y + Measures.halfSquareHeight);
				Ctx.lineTo(this.x, this.y - Measures.halfSquareHeight);
				Ctx.lineTo(this.x + Measures.halfSquareHeight, this.y + Measures.halfSquareHeight);
				Ctx.closePath();
				/* drawing the image */
				var img = new Image();
				img.src = "Images/pedale.png";
				Ctx.drawImage(img,this.x-Measures.halfDiagonalSquare*Math.cos(Math.PI/4),
					this.y-Measures.halfDiagonalSquare*Math.sin(Math.PI/4));
			}
		}
		
		/* Drawing a black triangle */
		else if(this.type == INV_TRIANGLE) {
			if(Game.mode == NORMAL) {
				/* Drawing from the center */
				Ctx.fillStyle = "black";
				Ctx.strokeStyle = "white";
				Ctx.globalAlpha = this.alpha;
				Ctx.lineWidth = 1;
				Ctx.beginPath();
				Ctx.moveTo(this.x - Measures.halfSquareHeight, this.y - Measures.halfSquareHeight);
				Ctx.lineTo(this.x + Measures.halfSquareHeight, this.y - Measures.halfSquareHeight);
				Ctx.lineTo(this.x, this.y + Measures.halfSquareHeight);
				Ctx.closePath();
				Ctx.fill();
				Ctx.stroke();
			}
			else {
				/* drawing but not striking it */
				Ctx.beginPath();
				Ctx.moveTo(this.x - Measures.halfSquareHeight, this.y - Measures.halfSquareHeight);
				Ctx.lineTo(this.x + Measures.halfSquareHeight, this.y - Measures.halfSquareHeight);
				Ctx.lineTo(this.x, this.y + Measures.halfSquareHeight);
				Ctx.closePath();
				/* drawing the image */
				var img = new Image();
				img.src = "Images/pedale.png";
				Ctx.save();
				Ctx.translate(this.x,this.y); /* move to the center fo the image */
				Ctx.rotate(Math.PI);
				Ctx.drawImage(img,-Measures.halfDiagonalSquare*Math.cos(Math.PI/4),-Measures.halfDiagonalSquare*Math.sin(Math.PI/4));
				Ctx.restore();
			}
		}
		
	};
}

