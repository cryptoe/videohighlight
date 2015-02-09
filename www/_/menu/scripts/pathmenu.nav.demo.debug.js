 /**
	 @license
	 Copyright @ 2012 Alessandro Zifiglio
	 http://www.typps.com
 */
(function(window){
window['GetTemplate'] = function GetTemplate(){
return '<div class="container{{^1024x768}}-fluid{{/1024x768}}">\
			<div class="row-fluid">\
				<h2>Path style menu 3.7</h2>\
			</div>\
			{{#1024x768}}\
			<!-- Navbar\
			================================================== -->\
			<ul class="nav-links">\
				<li><a href="#support">SUPPORT</a></li>\
				<li><a href="#products">PRODUCTS</a></li>\
				<li><a href="#about">ABOUT</a></li>\
				<li><a href="#mission">MISSION</a></li>\
			</ul>\
			{{/1024x768}}\
			<div class="row-fluid">\
				<div class="row-fluid breadcrumbs {{#1024x768}}span12{{/1024x768}}"><a href="#">HOME</a>{{#hascrumbs}} <span> &raquo; </span> <a href="#{{url}}">{{pagenameupper}}</a>{{/hascrumbs}}</div>\
				<div class="row-fluid {{#1024x768}}span12{{/1024x768}}">\
					<div {{#1024x768}}class="span8"{{/1024x768}}>\
						<div class="row-fluid">\
							<h2>{{pagename}}</h2>\
							<p>This is a simple website created to showcase our Path style navigation menu. To navigate throughout this site use the\
							Path menu you see in the bottom left corner of each page.</p>\
							<p>You may have also noticed a normal navigation menu in the header of each page. This is included to showcase how you can create responsive designs.</p>\
							<p>Note also that the normal navbar is not going to cut it on mobile and tablets as it takes up too much screen estate\
							and also because it\'s not touch friendly.</p>\
							<p>The path menu solves this by providing a simple navigation menu that is elegant and \
							responsive for click or touch enabled devices.</p>\
							<h2>Some of the features:</h2>\
							<ul>\
								<li>All icons are easily customizable through css. As simple as including the background css property.</li>\
								<li>The navigation menu supports an infinite level of sub menu items.</li>\
								<li>The navigation menu uses css3 for transitions. This means we use native browser functionality which allows us to maintain a light weight menu.</li>\
								<li>The code is light weight and does not depend on external libraries.</li>\
								<li>Degrades gracefully on lowlevel browsers without loss in functionality.</li>\
								<li>Full documentation on usage is provided.</li>\
							</ul>\
							</div>\
							<div class="row-fluid">\
								<h2>Responsive design</h2>\
								<p>If you used a conventional navigation menu system, you\'d have to redesign it or rethink your navigation on small screen screen devices.\
								The screen estate differs greatly across devices and this can impact your applications design greatly.</p>\
								<p>The path style navigation menu solves this problem\
								by allow maximum screen estate usage due to it placing all menu items in an arc diagonally on screen. More over, menu items are overlaid\
								over the pages content. This liberates a lot of space as you only need to account for the space required to place a single button only.</p>\
								<p>You can even target specific screen sizes for this menu to display in.\
								</p>\
								<p>Thanks for looking!</p>\
							</div>\
						</div>\
						{{^1024x768}}\
					</div>\
					<div class="row-fluid">\
						{{/1024x768}}\
						<div class="right-column {{#1024x768}}span4{{/1024x768}}">\
							{{#1024x768}}\
							<ul class="row-fluid sidebar-links">\
								<li><a href="#{{url}}" class="selected">{{pagename}}</a></li>\
								<li><a href="#">Sub menu 1</a></li>\
								<li><a href="#">Sub menu 2</a></li>\
								<li><a href="#">Sub menu 3</a></li>\
							</ul>\
							<br />\
							{{/1024x768}}\
							<div class="row-fluid">\
								<!--<div {{#1024x768}}class="widget"{{/1024x768}}>\
									<h4>Did you know?</h4>\
									<p>We now sport a wordpress plugin. Installing the Path style menu in your site couldn\'t get any easier.\
									There aren\'t many things to configure as well. You simply need to go in the plugins admin page and tell it what\
									navigation menu to associate with the Path menu. You can also customize the icons very easily.</p>\
								</div>-->\
								<div {{#1024x768}}class="widget"{{/1024x768}}>\
									<h4>Purchase</h4>\
									<div>\
										<p><a class="button" href="http://codecanyon.net/item/path-style-menu/2113415?ref=typps">Standalone version $8 Buy</a></p>\
										<p><a class="button" href="http://codecanyon.net/item/path-style-menu/2379678?ref=typps">Wordpress plugin $10 Buy</a></p>\
									</div>\
								</div>\
							</div>\
						</div>\
				</div>\
				{{^1024x768}}\
				</div>\
				{{/1024x768}}\
			</div>\
			<h4 class="footer">Designed, built {{#1024x768}}and maintained {{/1024x768}}by Alessandro Zifiglio <a href="http://twitter.com/zifiglio" target="_blank">@zifiglio</a></h4>\
		</div>';
}
})(window);
(function(window, document, $, Hogan, PathMenu){
	var template = '';
	$.addEvent(window, 'load', 
	function(){
		var myMenu = new PathMenu(
		{
			'elem': document.getElementById('menu1'), 
			'curve': 50,
			'padding': 10,
			'items': [
						{'command': 'home', 'title': 'Welcome'}, 
						{'command': 'mission', 'title': 'Mission'}, 
						{'command': 'about', 'title': 'About'}, 
						{'command': 'products', 'title': 'Products'}, 
						{'command': 'support', 'title': 'Support'}
					 ],
			'onSelectedItem': selectedItem,
			'enableUrlHash': true
		});
		//method fires when an item is clicked
		function selectedItem(e, value, depth, role, title){
			//Exclude parent menu items and main menu 
			if(role < 2/*PathMenu.Role.item*/){return;}
			//Processing only menu items
			navigate(value, title);
		}
	});
	
	//What follows is plumbing code to setup our demo pages.
	//This has nothing to do with the menu.
	//However it can help give you some ideas with your own integration.
	//Code is simplistic here and easy to follow.
	
	$.addEvent(window, 'resize', function(){
		fillBlocks(true);
		hashChanged();
	});
	$.addEvent(window, 'hashchange', function(){
		hashChanged();
	});
	$.addEvent(window, 'load', function(){
		fillBlocks();
		window.setTimeout(function(){
			hashChanged();
		}, 0);
	});
	
	function hashChanged(){
		var value = window.location.hash.substring(1),
		title = value.charAt(0).toUpperCase() + value.slice(1);
		if(!value){
			//default page
			value = 'home';
			title = 'Welcome';
		}
		navigate(value, title);
	}
	

	function checkMediaQuery(min, max){
		return $.mediaQuery([{'minWidth': min, 'maxWidth': max}]);
	}
	function navigate(value, title){
		if(!value){return;}
		var tokens = {
						'pagename': title, 
						'pagenameupper': title.toUpperCase(),
						'url': value.toLowerCase(), 
						'hascrumbs': (value !== 'home'),
						'320x480': checkMediaQuery(null, 640)/*assume iphone 3 <= 640*/,
						'640x960': checkMediaQuery(640, 1024)/*assume iphone 4 <= 1024*/,
						'1024x768': checkMediaQuery(1024, null)/*assume ipad & desktop >= 1024*/
					},
		newElem = document.getElementById(value),
		oldElem = document.querySelector('.block-show'),
		blockShowClassName = 'block-show',
		blockHideClassName = 'block-hide';
		
		if(!newElem){return;}
		if(!template){
			template = Hogan['compile'](window['GetTemplate']());
		}
		
		newElem.innerHTML = template['render'](tokens);

		if(oldElem){
			$.removeCssClass(oldElem, blockShowClassName);
			$.addCssClass(oldElem, blockHideClassName);
		}
		$.removeCssClass(newElem, blockHideClassName);
		$.addCssClass(newElem, blockShowClassName);
	}
	/**
		@function
		@description Prepares the layout of section and sizes them wide enough to fit the viewport.
		@param {boolean} [onResize=null] Determines if this method is called in response to the window resizing.
	*/
	function fillBlocks(onResize){
		var sections = document.getElementsByTagName('section'), 
		len = sections.length, 
		viewport = $.getViewport(),
		width = viewport['width'],
		height = viewport['height'],
		i, 
		elem,
		blockShowClassName = 'block-show',
		blockHideClassName = 'block-hide';
		
		for(i = 0; i < len; i++){
			elem = sections[i];
			if(!elem){continue;}
		}
	}
})(window, document, window['$m'], window['Hogan'], window['PathMenu']);
