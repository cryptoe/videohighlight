 /**
	 @license
	 Copyright @ 2012 Alessandro Zifiglio
	 http://www.typps.com
 */
 
(function(window, document, $, PathMenu){
$.addEvent(window, 'load', 
	function(){
		window['$m_DEBUG'] = true;//enables console logging
		var expandPattern = document.querySelector('#expandpattern'),
		_x0 = document.querySelector('#x0'),
		_y0 = document.querySelector('#y0'),
		_x1 = document.querySelector('#x1'),
		_y1 = document.querySelector('#y1'),
		_x2 = document.querySelector('#x2'),
		_y2 = document.querySelector('#y2'),
		_x3 = document.querySelector('#x3'),
		elements = document.querySelectorAll('.item'), i, elem,
		ranges = document.querySelectorAll('ul>li>input'), output, range,
		myMenu = new PathMenu(
		{
			'elem': document.getElementById('menu2'), 
			'curve': 70,
			'items': [
							{command: 'whatsup',backgroundUrl: '_/share/images/bubble_whatsup_share_button2.png'},
							{command: 'facebook',backgroundUrl: '_/share/images/bubble_facebook_share_button2.png'},
							{command: 'twitter',backgroundUrl: '_/share/images/bubble_twitter_share_button2.png'},
							{command: 'linkedin',backgroundUrl: '_/share/images/bubble_linkedin_share_button2.png'},
							{command: 'google',backgroundUrl: '_/share/images/bubble_googleplus_share_button2.png'},
							{command: 'pintress',backgroundUrl: '_/share/images/bubble_pinterest_share_button2.png'},
							{command: 'email',backgroundUrl: '_/share/images/bubble_email_share_button2.png'}
						],
				'showLabel': true,
				'expanded': false,
				'expandTimeout': 4000,
				'expandPattern': 2,
			'onSelectedItem': selectedItem,
			'mainButton': { backgroundUrl: '_/share/images/bubble_share_core2.png'}

		}),
		rangeChanged = function(e){
			var elem, 
			srcElem,
			x0 = _x0.value,
			y0 = _y0.value,
			x1 = _x1.value, 
			y1 = _y1.value, 
			x2 = _x2.value, 
			y2 = _y2.value, 
			x3 = _x3.value,
			y3 = x0, 
			j, 
			k, 
			pos, 
			tPos, 
			length = elements.length;

			myMenu.set_bezierCurve({'x0':x0, 'y0':y0, 'x1':x1, 'y1':y1, 'x2':x2, 'y2':y2,'x3':x3});
			myMenu.snap(true, true);
			writeJS();
		},
		writeJS = function(){
		
		},
		expandPatternChanged = function(e){
			myMenu.set_bezierCurve(null);//reset
			var option = expandPattern.options[expandPattern.selectedIndex], 
			pattern = parseInt(option.value, 10);
			myMenu.collapseAll();
			myMenu.set_expandPattern(pattern);
			myMenu.snap();
			resetValues();
			writeJS();
		},
		resetClick = function(){
			myMenu.set_bezierCurve(null);//reset
			resetValues();
			myMenu.snap(true, true);
			writeJS();
		},
		resetValues = function(){
			var bezierCurve = myMenu.get_bezierCurve();
			_x0.value = bezierCurve['x0'];
			_y0.value = bezierCurve['y0'];
			_x1.value = bezierCurve['x1'];
			_y1.value = bezierCurve['y1'];
			_x2.value = bezierCurve['x2'];
			_y2.value = bezierCurve['y2'];
			_x3.value = bezierCurve['x3'];
		},
		ranger = function(){
		};
		writeJS();
		ranger();
		
		$.addEvent(expandPattern, 'change', expandPatternChanged);
		$.addEvent(document.querySelector('#reset'), 'click', resetClick);
		//method fires when an item is clicked
		function selectedItem(e, value, depth, role){
		
		var myPage = location.href.replace( /(.*)#.*/, "$1"); 
		
		
			if(value=="facebook")	
			{	
				shareSource('facebook');
			}
			if(value=="whatsup")	
			{	
				shareSource('whatsup');
			}
			if(value=="twitter")
			{
				shareSource('twitter');
			}
			if(value=="linkedin")
			{
				shareSource('linkedin');
			}
			if(value=="google")
			{
				shareSource('google');
			}
			if(value=="pintress")
			{
				shareSource('pintress');
			}
			if(value=="email")
			{
				shareSource('email');
			}
			
			//hideShowImages();
			//$.log(value);
		}
	});
}(window, document, window['$m'], window['PathMenu']));
