/** \file Impossible.js : main situation of the game => drawing loop and initialization */

/**
 * Starts a new game or loads one game
 * Called by a click on the play button 
 * */
function play(level, cursor) {
	
	Game.level = level;
	Game.isPlaying = true;
	Game.won = false;
	
	if(cursor == 0 || cursor == undefined) {
		cursor = 0;
		Game.score = 0;
	}
	
	if(cursor >= Levels[level].length + Game.emptyBeforeStart)
		Game.won = true;
	
	$("#score").show();
	
	/* Levels */
	if(level == 1)
		load_level1(cursor);
	else if(level == 2)
		load_level2(cursor);
	
	/* Setting parameters */
	init_keydown();
        
	/* Loop of drawing */
	drawing_loop();
}

/**
 * Initializes the up arrow key / w key / z key to make the square jump on keydown 
 * */
function init_keydown() {
	
	/* On keydown, making the main square jump */
	$("body").keydown(function(event) {
		
		if (event.keyCode == 38 || event.keyCode == 87 || event.keyCode == 90 ) { /* up arrow || w || z */
		
			/* If the main square is not already on jump */
   			if(Game.mobile.onJump == false && !Game.mobile.isFalling) {
				
				/* Making it jump, it is not on contact anymore */
				Game.mobile.onJump = true;
				Game.mobile.onContact =  false;
				Game.mobile.jumpAgain = true;
			}
  		}
  		
  			/* "p" key / pause mode */
		if(event.keyCode == 80) {
			/* simulating a click on the pause button */
			$("#pause").trigger("click"); 
		}
  	});
  	
  	/* On keyup, it stops jumping */
  	$("body").keyup(function(event) {
		if (event.keyCode == 38 || event.keyCode == 87 || event.keyCode == 90 ) { /* up arrow || w || z */
			Game.mobile.jumpAgain =	false;
		}
	});	
}

/**
 * Draws every element needed for the game 
 * */
function drawing_loop() {
	
	/* Displaying the score */
	$("#score").text("Score : " + Game.score + " %");
	
	if(Game.won == true) {
		manage_hall_of_fame();
		window.cancelAnimationFrame(Game.id);
		return;
	}
			
	/* Drawing the background */
	Game.background.draw();
	
	/* Drawing each module in the Module Array, and making them move */
	for(var i=Game.moduleArray.length-1; i>=0; i--) {
		Game.moduleArray[i].draw();
	}
	
	/* Drawing the main square only if it is not dead */
	if(!Game.mobile.isDead) {
		Game.mobile.draw();
		Game.id = window.requestAnimationFrame(drawing_loop); /* Caling the function as a loop to make an animation */
	}
	
	/* If the main square is dead */
	else {
		manage_hall_of_fame();
		if($("#"+Musics[Game.level].id).length != 0)
			$("#"+Musics[Game.level].id).trigger("pause");
		$("#"+Sounds[0].id).trigger("play");
	}
	
	/* Uncomment to place a breakpoint here on the JS console */
	//debugger;
}

/**
 * Displays the winning message and changes the state of the game 
 * */
function you_won() {
	if($("#youWon").length == 0) /* if it does not exist */
		$("#game").append("<h1 id='youWon'> YOU WON </h1>");
	Game.won = true;
}

