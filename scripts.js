$(document).ready(function() {
	separateTabs = $('.putTabsHere').separateTabs({
		sortBy: ['start', 'directory', 'single'],
		// sorting: function(a, b, sortBy) {
		// 	if (sortBy.indexOf(a.type) < sortBy.indexOf(b.type))
		//       return 1;
		//     if (sortBy.indexOf(b.type) > sortBy.indexOf(b.type))
		//       return -1;
		//     return 0;
		// }
	});

	separateTabs.addTab({type: 'directory'});
	separateTabs.addTab({type: 'directory'});
	separateTabs.addTab({type: 'single'});
	separateTabs.addTab({type: 'directory', tab_title: 'jakas nazwa'});
	separateTabs.addTab({type: 'start'});

	var x = separateTabs.addTab({
			type: 'single'
		});

	var Controller = function(tab) {
		return {
			setNewName: tab.setName
		}
	};

	theController = new Controller(x);
	theController.setNewName('New Name');
	separateTabs.getAllTabs();
});
