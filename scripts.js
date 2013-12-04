$(document).ready(function() {
    separateTabs = $('.putTabsHere').separateTabs({
        sortBy: ['start', 'directory', 'single'],
//		sorting: function(a, b, sortBy) {
//			if (sortBy.indexOf(a.getType()) < sortBy.indexOf(b.getType()))
//		       return 1;
//		     if (sortBy.indexOf(b.getType()) > sortBy.indexOf(b.getType()))
//		       return -1;
//		     return 0;
//		}
    });

    separateTabs.addTab({type: 'directory'});
    separateTabs.addTab({type: 'directory'});
    separateTabs.addTab({type: 'single'});
    separateTabs.addTab({type: 'directory', tab_title: 'jakas nazwa'});
    separateTabs.addTab({type: 'start'});

    var tab = separateTabs.addTab({
        type: 'single'
    });

    var Controller = function(tab) {
        return {
            setNewName: tab.setName,
            test: function() {
                console.log(tab.tab_id)
            }
        }
    };

    theController = new Controller(tab);
    theController.setNewName('New Name');
    separateTabs.getAllTabs();
});
