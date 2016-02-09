/** \file Game.js: contains the Game object */

/** 
 * A Game object: contains all information needed to play a game 
 * */
function Game(level, score, playerName) {
	
	/** The level the player has chosen */
	this.level = level;
	
	/** The score obtained by the player */
	this.score = score;
	
	/** Counts the number of modules that passed away (for the score) */
	this.scoreCounter = 0;
	
	/** An array of the top scores */
	this.topScores;
	
	/** The maximum length of the top scores array */
	this.topScoresLength = 5;
	
	/** number of empty block before the start of the level */
	this.emptyBeforeStart;
	
	/** The name of the player */
	this.playerName = playerName;
	
	/** The current cell of the level array */
	this.levelArrayCursor;
	
	/** The array containing each module to draw */
	this.moduleArray = new Array();
	
	/** The main square (the orange one) */
	this.mobile;
	
	/** Background of the game */
	this.background;
	
	/** Id for time intervals */
	this.id;
	
	/** Normal or RockPossible mode */
	this.mode;
	
	/** Is a level currently playing */
	this.isPlaying = false;
	
	/** Is the game won */
	this.won = false;
	
	/** 
	 * Pauses the game in progress
	 * */
	this.pause = function() {
		if(this.isPlaying == true) {
			window.cancelAnimationFrame(this.id);
			this.isPlaying = false;
			$("#"+Musics[Game.level].id)[0].pause(); // Pauses the music corresponding to the playing level
		}
		else if(this.isPlaying == false && this.level != 0 && this.won == false) {
			this.id = window.requestAnimationFrame(drawing_loop); 
			this.isPlaying = true;
			$("#"+Musics[Game.level].id)[0].play(); // Play the music
		}
	}
	
	/**
	 * Updates the score of the game in progress
	 * */
	this.updateScore = function () {
		var maxScore = (Levels[this.level].length+this.emptyBeforeStart-1);
		if(this.levelArrayCursor <= 0)
			this.score = 0;
		else
			this.score = Math.floor((this.scoreCounter/maxScore)*100); // Score is a percentage of the progression of the game
		if(this.level != 0 && this.score >= 100)
			you_won();
	}
}



