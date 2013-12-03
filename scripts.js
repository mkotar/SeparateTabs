$(document).ready(function() {
	console.log('ready');
	tabPlugin = $('.putTabsHere').tabPlugin({
		groupBy: ['start', 'directory', 'single'],
		// grouping: function( ) {
		// 	console.log('hurra');
		// }
	});
	tabPlugin.getAllTabs();
	tabPlugin.addTab('directory');
	tabPlugin.addTab('directory');
	tabPlugin.addTab('single');
	tabPlugin.addTab('directory', 'jakas nazwa');
	tabPlugin.addTab('start');
	tabPlugin.addTab('single');

	tabPlugin.getAllTabs();
});
