(function ($) {

    $.fn.separateTabs = function (opts) {
        var tabList = [],
            defaults, options, templates, tab,
            isFunction, generateUniqueTabId, defaultSort, applySorting,
            clearHTMLelement, setActive, updateTabName, addListeners,
            renderNavStrip, renderPane, removeNav, removePane,
            getAllTabs, addTab, removeTab, init;

        defaults = {
            dataCollection: false,
            sortBy: false,
            sorting: false,
            effect: 'fade',
            duration: 'fast',

            /* css selectors for plugin */
            navContainerClass: 'nav-container',
            paneContainerClass: 'pane-container',
            navItem: 'nav-item',
            paneItem: 'pane-item'
        };

        options = $.extend({}, defaults, opts);

        templates = {
            navContainer: function () {
                return '<ul class="' + options.navContainerClass + '"></ul>';
            },
            paneContainer: function () {
                return '<div class="' + options.paneContainerClass + '"></div>';
            },
            nav: function (tab_id, name, closing) {
                var close = '';
                if (closing) {
                    close = this.close();
                }

                return '<li data-id="' + tab_id + '" class="' + tab_id + ' ' + options.navItem + '">' + name + close + '</li>';
            },
            pane: function (tab_id, name) {
                return '<div class="' + tab_id + ' ' + options.paneItem + '">' + name + '</div>';
            },
            close: function () {
                return ' <span>[x]</span>';
            }
        };

        isFunction = function (possibleFunction) {
            return (typeof(possibleFunction) == typeof(Function));
        };

        defaultSort = function (a, b) {
            if (options.sortBy.indexOf(a.getType()) > options.sortBy.indexOf(b.getType())) {
                return 1;
            }
            if (options.sortBy.indexOf(b.getType()) < options.sortBy.indexOf(b.getType())) {
                return -1;
            }
            return 0;
        };

        applySorting = function () {
            if (!options.sortBy) {
                return;
            }

            if (isFunction(options.sorting)) {
                tabList.sort(function (a, b) {
                    return options.sorting(a, b, options.sortBy);
                });
                return;
            }

            tabList.sort(function (a, b) {
                return defaultSort(a, b);
            });
        };

        getAllTabs = function () {
            console.log('All Tabs', tabList);
        };

        updateTabName = function (tab_id, name, closing) {
            var close = '';
            if (closing) {
                close = templates.close();
            }

            this.el.find('li.' + tab_id).first()[0].innerHTML = name + close;
        };

        tab = function (params) {
            var tab_title = params.tab_title,
                tab_id = params.tab_id,
                closeTab = params.closeTab,
                type = params.type;

            this.getId = function () {
                return tab_id;
            };

            this.getTabTitle = function () {
                return tab_title;
            };

            this.getTabClose = function () {
                return closeTab;
            };

            this.getType = function () {
                return type;
            };

            this.setName = function (newTabTitle) {
                tab_title = newTabTitle || '';
                updateTabName(tab_id, newTabTitle, closeTab);
            };
        };

        generateUniqueTabId = function () {
            return new Date().getTime() + tabList.length;
        };

        clearHTMLelement = function (element) {
            element[0].innerHTML = '';
        };

        renderNavStrip = function () {
            var navContent = '',
                name;

            clearHTMLelement(this.el.find('.' + options.navContainerClass));
            $.each(tabList, function (index, item) {
                name = item.getTabTitle() || item.getType();
                navContent += templates.nav(item.getId(), name, item.getTabClose());
            });

            this.el.find('.' + options.navContainerClass)[0].innerHTML = navContent;
        };

        renderPane = function (tabID, name) {
            var current = '';
            current += this.el.find('.' + options.paneContainerClass)[0].innerHTML;
            current += templates.pane(tabID, name);

            this.el.find('.' + options.paneContainerClass)[0].innerHTML = current;
            return true;
        };

        removeNav = function (tab_id) {
            this.el.find('.' + options.navContainerClass).first().find('.' + tab_id).fadeOut().remove();
            getAllTabs();
        };


        removePane = function (tab_id) {

        };

        setActive = function (tabId) {
            this.el.find('.active').each(function (index, item) {
                $(item).removeClass('active');
            });
            this.el.find('.' + tabId).addClass('active');
        };

        addListeners = function () {
            this.el.find('.' + options.navContainerClass).on('click', 'li', function (item) {
                var tab_id = $(item.target).data('id');
                setActive(tab_id);
            });

            this.el.find('.' + options.navContainerClass).on('click', 'li span', function (item) {
                var tab_id = $(item.target).parent().data('id');
                removeTab(tab_id);
            });
        };

        addTab = function (params) {
            var tab_id = generateUniqueTabId(),
                newTab = new tab({
                    tab_id: tab_id,
                    type: params.type,
                    closeTab: params.closeTab || true,
                    tab_title: params.tab_title || ''
                });

            tabList.push(newTab);
            applySorting();

            var theName = params.tab_title || params.type;

            renderNavStrip();
            if (!renderPane(tab_id, theName)) {
                return false;
            }

            setActive(tab_id);
            return newTab;
        };

        removeTab = function (tab_id) {
            removeNav(tab_id);
            removePane(tab_id);
        };

        init = function (element) {
            this.el = $(element);
            this.el[0].innerHTML = templates.navContainer() + templates.paneContainer();

            addListeners();
        };

        this.addTab = addTab;
        this.getAllTabs = getAllTabs;
        this.removeTab = removeTab;

        return this.each(function () {
            return init(this);
        });
    };

}(jQuery));