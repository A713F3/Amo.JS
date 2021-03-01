let Amo = class {

	constructor(){
		this.grid = [];

		this.rows = 14;
		this.columns = 14;
		this.cell_size = 50;
		this.clear_grid();

		//this.x = int(random(2, this.rows - 2));
		//this.y = int(random(2, this.columns - 2));

		this.x = 6;
		this.y = 6;

		this.amo = 2;
		this.amo_color = 'rgba(62,209,225,1)';
		this.food = 1;
		this.food_color = 'rgba(237,50,54,1)';

		this.grid[this.y][this.x] = this.amo;
		
		//this.init_food();
		this.init_food_fix();

		this.brain = new NeuralNetwork(8,16,4);
		this.score = 0;

		this.startTime = performance.now();
	
		noStroke();
	
	}

	clear_grid(){
		for (var y = 0; y < this.rows; y++){
			this.grid[y] = [];
			for (var x = 0; x < this.columns; x++){
				this.grid[y][x] = 0;			
			}	
		}
	}

	init_food(){
		var i = 0;
		var done = false;
		while (!done){
			var food_x = int(random(2, this.rows - 2));
			var food_y = int(random(2, this.columns - 2));

			if ((food_x != this.x && food_y != this.y) && this.grid[food_y][food_x] != this.food){
				i ++;
				this.grid[food_y][food_x] = this.food;
			}
			if (i == 5){
				done = true;
			}
		}
	}

	init_food_fix(){
		this.grid[4][4] = 1;
		this.grid[4][6] = 1;
		this.grid[4][7] = 1;
		this.grid[4][9] = 1;
		this.grid[4][10] = 1;
		this.grid[9][4] = 1;
		this.grid[9][6] = 1;
		this.grid[9][7] = 1;
		this.grid[9][9] = 1;
		this.grid[9][10] = 1;
	}

	copy() {
    	return new Amo(this.brain);
  	}	


	Think(){
		var inputs = [];

		var j = 0;
		for (var i = -2; i < 3; i++){
			inputs[j] = this.grid[this.y + i][this.x];
			j++;
			inputs[j] = this.grid[this.y][this.x + i];
			j++;
		}

		inputs.splice(5,1);
		inputs.splice(4,1);

		var action = this.brain.query(inputs); 

		var index = argmax(action);

		this.Move(index);
	
	}

	Move(direction){
		//0:Up 1:Right 2:Down 3:Left
		this.grid[this.y][this.x] = 0;
		switch(direction){
			case 0:
				if (this.y != 2){
					this.y -= 1;
				} else if (this.y == 2){
					this.y = this.rows - 3;
				}
				break;

			case 1:
				if (this.x != this.columns - 3){
					this.x += 1;
				} else if(this.x == this.columns - 3){
					this.x = 2;
				}
				break;

			case 2:
			 	if (this.y != this.rows - 3){
			 		this.y += 1;
				 } else if(this.y == this.rows - 3){
				 	this.y = 2;
				 }
				break;

			case 3:
				if (this.x != 2){
					this.x -= 1;
				} else if(this.x == 2){
					this.x = this.columns - 3;
				}
				break;

			default:
				print("Invalid Direction!")
		}

		if (this.grid[this.y][this.x] == this.food){
			this.score ++;
		}

		this.grid[this.y][this.x] = this.amo;

	}


	Show(){
		this.draw_x = 2;
		this.draw_y = 2;

		for (var y = 2; y < this.rows - 2; y++){
			for (var x = 2; x < this.columns - 2; x++){

				if (this.grid[y][x] == this.amo){
					fill(this.amo_color);
					
					rect(this.draw_x, this.draw_y, this.cell_size, this.cell_size, 12)
				} else if (this.grid[y][x] == this.food){
					fill(this.food_color);
					
					rect(this.draw_x, this.draw_y, this.cell_size, this.cell_size, 12)
				}
 			

				this.draw_x += this.cell_size;
	
			}
			this.draw_y += this.cell_size;
			this.draw_x = 2;		
		}

	}
	

}
