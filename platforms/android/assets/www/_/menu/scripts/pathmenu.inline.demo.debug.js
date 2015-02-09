 /**
	 @license
	 Copyright @ 2012 Alessandro Zifiglio
	 http://www.typps.com
 */
 (function(window, document, $, PathMenu){
	var myMenu, expandPattern;
	window['$m_DEBUG'] = true;//enables console logging
	$.addEvent(window, 'load', 
		function(){
			expandPattern = document.getElementById('expandpattern');
			writeJS();
			myMenu = new PathMenu(
			{
				'elem': document.getElementById('menu1'), 
				'items': ['photo','people','place', 
					'music', 'thought', 'composer'],
				'onSelectedItem': selectedItem,
				'expandPattern': 0
			});
			$.addEvent(expandPattern, 'change', expandPatternChanged);
		}
	);

	var selectedItem = function(e, value, depth, role){
		$.log(value);
	},
	expandPatternChanged = function(){
		var option = expandPattern.options[expandPattern.selectedIndex], 
		pattern = parseInt(option.value, 10);
		myMenu.collapseAll();
		myMenu.set_expandPattern(pattern);
		myMenu.snap();
		writeJS();
	},
	writeJS = function(){
		var option = expandPattern.options[expandPattern.selectedIndex], 
		selectedPattern = parseInt(option.value, 10);
		document.getElementById('syntax').innerHTML = 
			$.formatString('var expandPattern = PathMenu.ExpandPattern.{0};', $.parseEnum(PathMenu.ExpandPattern, selectedPattern));
		window['prettyPrint']();
	};
}(window, document, window['$m'], window['PathMenu']));
