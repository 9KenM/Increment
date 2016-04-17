//Main object container
var INC = {};

$(window).load(function(){
	INC.init();
});

INC.init = function(){

	// 31557600 seconds in a year
	// 2592000 seconds in 30 days
	// 86400 seconds in 1 day
	// 3600 seconds in an hour
	// 60 seconds in a minute
	// 0.001 seconds in a millisecond

	INC.params = {
		start: {
			year: 2103,
			day: 273,
			hour: 0,
			minute: 0,
			second: 0
		},
		inc: 1 // number of seconds per second to increment
	}
	INC.run = false;

	INC.start = INC.params.start;//Date.parse(INC.params.start);
	INC.current = 0;
	INC.inc = INC.params.inc;
	INC.lastFrame = INC.realTime();

	INC.display();
	$('#controls #play').click(function(){
		if(INC.run) {
			INC.run = false;
			$(this).html('>');

			clearInterval(INC.interval);

		} else {
			INC.run = true;
			INC.inc = parseFloat( $('#controls #increment').val() );
			$(this).html('||');

			INC.lastFrame = INC.realTime();
			INC.interval = setInterval(function(){ INC.update() }, 1);

		}
	});

}

INC.display = function(){

	var current = INC.current +
		INC.start.year * 31557600000 +
		INC.start.day * 86400000 +
		INC.start.hour * 3600000 +
		INC.start.minute * 60000 +
		INC.start.second * 1000;

	var y = Math.floor(current / 31557600000);
	var	d = Math.floor(current / 86400000 - y * 365.25);
	var	h = Math.floor(current / 3600000 - d * 24 - y * 365.25 * 24);
	var	m = Math.floor(current / 60000 - h * 60 - d * 24 * 60 - y * 365.25 * 24 * 60);
	var	s = Math.floor(current / 1000 - m * 60 - h * 60 * 60 - d * 24 * 60 * 60 - y * 365.25 * 24 * 60 * 60);

	d = d < 10 ? '00'+d : d < 100 ? '0'+d : d;
	h = h < 10 ? '0'+h : h;
	m = m < 10 ? '0'+m : m;
	s = s < 10 ? '0'+s : s;

	$('#controls #current').val( y+'.'+d+' '+h+':'+m+':'+s);
	$('#controls #increment').val(INC.inc);	
}

INC.update = function() {
	if(INC.run) {
		var msNow = INC.realTime(),
			msElapsed = msNow - INC.lastFrame;

		INC.current = msElapsed * INC.inc + INC.current;
		INC.display();
		INC.lastFrame = INC.realTime();
	}
}

INC.realTime = function(){ return new Date().getTime(); }
