//Application Window Component Constructor
function ApplicationWindow() {
	
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		navBarHidden: false
	});
		//construct UI
	//load component dependencies
	var ScheduleView = require('ui/common/ScheduleView');
	var scheduleView = new ScheduleView();
	self.add(scheduleView);
	
// 	
	// var FirstView = require('ui/common/FirstView');
	// var firstView = new FirstView();
	// self.add(firstView);


	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
