//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor : 'green',
		layout : 'absolute',
	});

	// Create a Label.
	var HelloLabel = Ti.UI.createLabel({
		text : 'HELLO POLAND!!!',
		color : 'blue',
		font : {
			fontSize : 24
		},
		top : 100,
		textAlign : 'center'
	});
	// Add to the parent view.
	self.add(HelloLabel);

	var label2 = Ti.UI.createLabel({
		text : Ti.Platform.osname,
		bottom : 100
	});

	self.add(label2)

	Ti.App.fireEvent('showSpinner');
	Ti.App.addEventListener('showSpinner', function() {
		// pop open busy indicator
	});

	label2.addEventListener('click', function() {
		var aWebView = Ti.UI.createWebView({
			url : 'http://spring.io/projects/spring-boot',
			top: '50%'

		});
		aWebView.addEventListener('load', function(e) {
			Ti.API.info('webview loaded: ' + e.url);
		});

		// Add to the parent view.
		self.add(aWebView);

	});
	// Create a WebView

	// Add to the parent view.
	return self;
}

module.exports = FirstView;
