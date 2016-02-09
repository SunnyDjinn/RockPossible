/** \file the Measures.js file, contains all measures for the game (square size, 
 * triangle size, etc)
 * */
function Measures() {
	/** A square measures 1/20 of the canvas width */
	this.squareWidthCoef = 1/20;
	/** A square measures 1/13 of the canvas height */
	this.squareHeightCoef = 1/13;
	/** A triangle measures 1/20 of the canvas width */
	this.triangleWidthCoef = 1/20;
	/** A triangle measures 1/13 of the canvas height */
	this.triangleHeightCoef = 1/13;
	/** The bottom line is positioned at 1/7 of the canvas width (for each side) */
	this.lineWidthCoef = 1/7;
	/** The bottom line is positioned at 2/3 of the canvas height (from the top) */
	this.lineHeightCoef = 2/3;
	
	/** Half of a square (and triangle) height */
	this.halfSquareHeight;
	/** Half of a square (and triangle) width */
	this.halfSquareWidth;
	/** The length of a diagonal of a square */
	this.halfDiagonalSquare;
	
	/** Height loss of the main square when it jumps */
	this.heightLossWhenJump = 10;
	/** Rotation for each iteration */
	this.angleRotation = Math.PI/24;
	/** Over rotation tolarate before it acutally puts the square at the upper x*Math.PI/2 value */
	this.angleTolerance = Math.PI/6;
	/** Initial position of the main square */
	this.initialPos;

	/** Defines how many pixels you can penatrate the modules(so that ypu can pass between two squares) */
	this.tolerance;
	
}
