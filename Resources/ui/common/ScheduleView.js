//FirstView Component Constructor
var _ = require('/lib/underscore');
function ScheduleView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		layout : 'vertical'
	});

	var tableView = Ti.UI.createTableView({
		height : Ti.UI.FILL,
		backgroundColor: 'white'
	});

	function createTableViewRowsSlow(entry) {
		var row = Ti.UI.createTableViewRow({
			className : 'scheduleData', // used to improve table performance
			selectedBackgroundColor : 'white',
			//rowIndex : i, // custom property, useful for determining the row during events
			height : 100,
			hasChild : true
		});

		var speakerName = Ti.UI.createLabel({
			color : 'blue',

			text : entry.speakerNames,
			left : 10,
			top : 10,
			font : {
					fontSize : 24
				}
		});
		row.add(speakerName);

		var sessionName = Ti.UI.createLabel({
			color : 'black',
			text : entry.title,
			left : 10,
			right : 10,
			bottom : 10,
			
		});
		row.add(sessionName);
		return row;
	}

	var tableData = [];
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'data/show1.json');
	var speakerJson = JSON.parse(file.read().text);

	// slow, first example
	function example1() {
		var data = [];
		_.each(speakerJson, function(entry) {
			data.push(createTableViewRowsSlow(entry));
		});
		return data;
	}

	// fast
	function example2() {
		var data = [];
		data = _.map(speakerJson, function(entry) {
			return {
				title : entry.speakerNames + ': ' + entry.title,
				hasChild : true,
				font : {
					fontSize : 14
				},
				height : 60
			};
		});
		
		return data;
	}
	
	

	// 3rd example
	function example3() {
		var data = [];
		var previousTimeSlot = "";
		data = _.flatten(_.map(speakerJson, function(entry) {
			var rowData = [];
			if (previousTimeSlot == entry.startTimeString) {
				// do nothing

			} else {
				rowData.push({
					title : entry.startTimeString,
					backgroundColor : 'blue',
					color : 'white',
					font : {
						fontSize : 14
					}
				});
				previousTimeSlot = entry.startTimeString;
			}

			rowData.push({
				title : entry.speakerNames + ': ' + entry.title,
				hasChild : true,
				font : {
					fontSize : 14
				},
				height : 60
			});
			return rowData;
		}));
		return data;
	}

	function example4() {
		var data = [];
		
		var sortedSpeakerJson = _.sortBy(speakerJson, 'startTime');
		
		var previousTimeSlot = "";
		data = _.flatten(_.map(sortedSpeakerJson, function(entry) {
			var rowData = [];
			Ti.API.info(tableData);
			if (previousTimeSlot == entry.startTimeString) {
				// do nothing

			} else {
				rowData.push({
					title : entry.startTimeString,
					backgroundColor : 'blue',
					color : 'white',
					font : {
						fontSize : 14
					}
				});
				previousTimeSlot = entry.startTimeString;
			}

			rowData.push({
				title : entry.speakerNames + ': ' + entry.title,
				hasChild : true,
				font : {
					fontSize : 14
				},
				height : 60
			});
			return rowData;
		}));
		return data;
	}

	tableData = example4();
	Ti.API.info(tableData);
	tableView.data = tableData;
	self.add(tableView);
	return self;
}

module.exports = ScheduleView;
