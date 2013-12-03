(function ( $ ) {

	$.fn.tabPlugin = function (opts) {
		var tabList = [],
			tempTabList = [];

		var defaults = {
			pluginName: 'tabPlugin',
			groupBy: false,
			grouping: false,
			effect: 'fade',
			duration: 'fast',

			/* css selectors for plugin */
			navContainerClass: 'nav-container',
			paneContainerClass: 'pane-container',
			navItem: 'nav-item',
			paneItem: 'pane-item'
		};

		var options = $.extend({}, defaults, opts);


		var templates = {
			navContainer: function () {
				return '<ul class="'+options.navContainerClass+'"></ul>';
			},
			paneContainer: function() {
				return '<div class="'+options.paneContainerClass+'"></div>';
			},
			nav: function (tabID, name, close) {
				return '<li data-id="'+tabID+'" class="'+tabID+' '+options.navItem+'">NAV + '+name+'</li>';
			},
			pane: function (tabID, name) {
				return '<div class="'+tabID+' '+options.paneItem+'">'+name+'</div>';
			}
		};

		var generateUniqueID = function() {
			return new Date().getTime()+tabList.length;
		};

		var clearHTMLelement = function(element) {
			element[0].innerHTML = '';
		};

		var renderNavStrip = function() {
			var navContent = '',
				name;

			clearHTMLelement(this.el.find('.'+options.navContainerClass));
			$.each(tabList, function(index, item) {
				name = item.name || item.type;
				navContent += templates.nav(item.id, name);
			});

			this.el.find('.'+options.navContainerClass)[0].innerHTML = navContent;
		};

		var removeNav = function() {

		};

		var renderPane = function(tabID, name) {
			var current = '';
			current += this.el.find('.'+options.paneContainerClass)[0].innerHTML;
			current += templates.pane(tabID, name); 

			this.el.find('.'+options.paneContainerClass)[0].innerHTML = current;
		};

		var removePane = function()  {

		};

		var isFunction = function (possibleFunction) {
			return (typeof(possibleFunction) == typeof(Function));
		}

		this.getAllTabs = function() {
			console.log('All Tabs', tabList);
		};

		var setActive = function (id) {
			this.el.find('.active').each(function(index, item) {
				$(item).removeClass('active');
			});

			this.el.find('.'+id).addClass('active');
		};

		var applyGrouping = function() {
			var result = [];
			if(options.groupBy) {
				$.each(options.groupBy, function(index, sortOption) {
					tempTabList[sortOption] = $.grep(tabList, function(sortBy){
						return (sortBy.type === sortOption);
					});
				});

				$.each(options.groupBy, function(index, sortOption) {
					result = $.merge(result, tempTabList[sortOption]);
				});
				tabList = result;
			}
		};

		var clickOnTab = function () {
			this.el.find('.'+options.navContainerClass).on('click', 'li', function(item) {
				var id = $(item.target).data('id');
				setActive(id);
			})
		};

		this.addTab = function(type, name) {
			var id = generateUniqueID();
			tabList.push({type: type, id: id, name: name});

			if(isFunction(options.grouping)) {
				options.grouping();
			} else {
				applyGrouping();
			}	

			var theName = name || type;
			renderNavStrip();
			renderPane(id, theName);
			setActive(id);
			return id;
		};

		this.removeTab = function() {
			removeNav();
			removePane();
		};

		var init = function(element) {
			this.el = $(element);
			this.el[0].innerHTML = templates.navContainer() + templates.paneContainer();

			clickOnTab();
		};

		return this.each( function() {
			init(this);	
		});
	};

} ( jQuery ));
