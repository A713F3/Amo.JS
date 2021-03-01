var Fitnesses = [];
var BestFitnessEver = 0;
var Population = [];
var allPopulation =[];
var BestAmoEver;

var populationSize = 5;
var generation = 0;
var time = 2;

var h2_gen;
var h2_pop;
var h2_score;


var run_best_amo = false;

function run_best_amo(run){
	run_best_amo = run;
}

function newGeneration(){
	var best_amo = allPopulation[argmax(Fitnesses)];

	var possible_best_fitness = Fitnesses[argmax(Fitnesses)];
	if (possible_best_fitness >= BestFitnessEver){
		BestFitnessEver = possible_best_fitness;
		BestAmoEver = best_amo;
	}
	
	h2_score.html(BestFitnessEver);
	/*Population = [];
	allPopulation = [];
	Fitnesses = [];*/

	for (var i = 0; i < populationSize; i++){
		var new_amo = best_amo.copy();
		new_amo.brain.mutate();

		Population[i] = new_amo;
		allPopulation[i] = new_amo;

	}
	

	generation++;
}

var h2_pop;
var h2_gen;
var h2_score
var speedSpan;

function setup(){
	var canvas = createCanvas(504,504);
	/*h2_pop = createElement("h2").html("Population Size: " + populationSize);
	h2_gen = createElement("h2");
	h2_score = createElement("h2");*/

	h2_pop = select("#h2_pop").html(populationSize);
	h2_gen = select("#h2_gen");
	h2_score = select("#h2_score");

	speedSlider = select('#speedSlider');

	speedSpan = select('#speed');



	background(220);

	canvas.parent("script-div");

	for (var i = 0; i < populationSize; i++){
		var amo = new Amo();
		Population[i] = amo;
		allPopulation[i] = amo;
	}
	generation++;

}


function draw(){

	background(245);

	var cycles = speedSlider.value();
 	speedSpan.html(cycles);

	for (var i = 0; i < cycles; i++){
	

		h2_gen.html(generation);


		if (Population.length != 0 && !run_best_amo){

			for (var i = 0; i < Population.length; i++){
				Population[i].Show();
				Population[i].Think();

				Fitnesses[i] = Population[i].score;

				var currentTime = performance.now();

				if (currentTime - Population[i].startTime > time*1000){
					Population.splice(i,1);
				}
			}
		} else if (run_best_amo){
			BestAmoEver.Show();
			BestAmoEver.Think();
		}
		else {
			newGeneration();
		}
	}
}