 /**
	 @license
	 Copyright @ 2012 Alessandro Zifiglio
	 http://www.typps.com
 */
(function(window, document, $, PathMenu){

var domain = 'http://openlibrary.org',
	/**@type {Object}*/
	bookBrowser, 
	/**@type {Array.<string>}*/
	subjects = ['/subjects/adventure', 
				'/subjects/horror', 
				'/subjects/humor', 
				'/subjects/romance', 
				'/subjects/sci-fi', 
				'/subjects/suspense'],
	/**@type{Array.<number>}*/
	workCounts = [0,0,0,0,0,0],
	/**@type {string}*/
	subjectUrl = domain + '{0}.json?limit={1}&offset={2}&has_fulltext=false&sort=editions&callback={3}',
	/**@type {number}*/	
	limit = 6,
	/**@type {number}*/
	level = 0,
	/**@type {number}*/
	offset = 0,
	/**@type {string}*/
	coverUrl = 'http://covers.openlibrary.org/b/id/{0}-{1}.jpg',
	/**@type {string}*/
	workUrl = 'http://openlibrary.org{0}',
	/**@type {number}*/
	subjectIndex = 0,
	/**@type {string}*/
	httpResponseSubjectsToString = 'httpResponseSubjects',
	/**@type {string}*/
	httpResponseSubjectToString = 'httpResponseSubject',
	/**@type {Element}*/
	statusElement = document.getElementById('status'),
	/**@type {boolean}*/
	flag = false,
	/**@type {Element}*/
	content = document.getElementById('content'),
	/**@type {Object}*/
	currentItem,
	/**@type {number}*/
	maxChars = 9,
	/**@type {string|null}*/
	timeout = null,
	/**@type {number}*/
	duration = 10000,
	/**@type{Element}*/
	script,
	/**
		@function
		@description First time initialization. 
		Appends script tags required to query the openlibrary api and loads subjects. We use script tags to workaround
		browser security restrictions since we are querying an external resource.
	*/
	init = function(){
		var subject = subjects[subjectIndex], 
		url = $.formatString(subjectUrl, subject, 0, 0, httpResponseSubjectsToString);
		//export to the outside callback methods
		window[httpResponseSubjectsToString] = httpResponseSubjects;
		window[httpResponseSubjectToString] = httpResponseSubject;
		
		jsonp(url, subject);
	},
	/**
		@function
		@description Shows a loading status when true.
		@param {boolean} val A value of true shows the loading status message while a value of false hides it.
		@param {string} [message=null] The message to show.
	*/
	status = function(val, message){
		var s = 'showstatus';
		if(message){
			statusElement.innerHTML = $.formatString('Loading {0}...', message);
			window.focus();
		}
		if (val){
			$.addCssClass(statusElement, s);
		}else{
			$.removeCssClass(statusElement, s);
		}
	},
	/**
		@function
		@description Allows making cross domain requests using the script element workaround.
		@param {string} url The url to make the request to.
		@param {string} message The message to display during the http request.
	*/
	jsonp = function(url, message) {
		bookBrowser.set_lock(true);//lock UI during a callback.

		var head = document.getElementsByTagName('head')[0];
		if(script){
			head.removeChild(script);
		}
		script = document.createElement('script');
		status(true, message);
		
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url);

		head.appendChild(script);
		  
		timeout = window.setTimeout(function(){
			lapse(message);
		}, duration);
    },
	lapse = function(message){
		statusElement.innerHTML = $.formatString('Failed to load {0}. The server is taking too long to respond. Try again.', message);
		bookBrowser.set_lock(false);
	},
	clearTimer = function(){
		if(timeout){
			window.clearTimeout(timeout);
		}
		timeout = null;
	},
	/**
		@function
		@description The callback in response to a subject from the list of subjects being requested.
		@param {Object} data JSON data result 
	*/
	httpResponseSubjects = function(data){
		var url, key = data['key'], name = data['name'], workCount = data['work_count'];
		
		clearTimer();
		
		bookBrowser.add_item({
								'command': key, 
								'text': $.formatString('{0} <br />{1}', name, workCount),
								'title': $.formatString('{0} {1} books found.', workCount, name)
							});
		workCounts[subjectIndex] = workCount;
		if (subjectIndex < subjects.length - 1){
			key = subjects[++subjectIndex];
			url = $.formatString(subjectUrl, key, 0, 0, httpResponseSubjectsToString);
			jsonp(url, key);
		}else {
			status(false);
			bookBrowser.render();//finished so render
		}
	},
	/**
		@function
		@description The callback in response to a subject being requested.
		@param {Object} data JSON data result 
	*/
	httpResponseSubject = function(data){
		if(currentItem['items']){return;}
		var work, works = data['works'], 
		i, 
		j, 
		authorNames = [], 
		authors, 
		workCount = workCounts[subjectIndex], 
		key, 
		coverId, 
		backgroundUrl, 
		insertMask = true,
		title,
		text = null,
		command = currentItem['command'];
		
		clearTimer();
		
		for(i in works){
			work = works[i];
			authors = work['authors'];
			for(j in authors){
				authorNames.push(authors[j]['name']);
			}
			key = work['key'];
			coverId = work['cover_id'];
			insertMask = coverId !== null;
			title = work['title'];
			if(coverId === null){
				backgroundUrl = null;//'assets/images/app/404.png';
				text = title;
				if(text.length > maxChars){
					text = (text.substr(0, maxChars) + '...').split(' ').join('<br />');
				}
			}
			else{
				backgroundUrl = $.formatString(coverUrl, coverId, 'S');
				text = null;
			}
			bookBrowser.add_item({
				'command': key,
				'text': text,
				'title': $.formatString('{0} written by {1}.', title, authorNames.join(',')),
				'backgroundUrl': backgroundUrl,
				'insertMask': insertMask
			}, currentItem);
		}
		if ((offset + limit) < workCount){
			bookBrowser.add_item({
				'command': 'next' + key,
				'data': 'next',
				'title': 'Get the next 6 books from Openlibrary',
				'text': 'Next 6 >>'
			}, currentItem);
		}
		status(false);
		bookBrowser.render(command);//finished so render
		//reset
		currentItem = null;
		offset = 0;
	},
	/**
		@function
		@description Tests for ie8 and below.
	*/
	supportsCanvas = function(){
		return (!!document.createElement('canvas').getContext);
	},
	/**
		@function
		@description A callback function that is fired when a menu item is selected.
		@param {Object} e A DOMEvent in response to a click event.
		@param {string} value The command of the button clicked. This is a unique value set on the path menu item that raised this event.
		@param {number} role The role of the menu item. It can be either 0, 1, 3 which stand for 
		1) menu ( the main menu button), 
		2) parent ( specifies that the element is a parent), 
		3) item ( a normal menu item that is not the main button nor is it a parent).
		@param {string} title The title of the path menu item button that raised this event.
		@param {Object|string} data A piece of context information you want preserved. Useful when you want to pass an argument that you can pickup when a menuitem is clicked.
		@param {number} index The index of the menu item clicked within the current level. Indexes in each menu level are zero based.
		@param {Object} item The item in the path menus items collection. This is useful when we want to add new submenu items dynamically. 
		Objects in javascript are reference types, so any changes to this object will reflect on the PathMenu's main copy for the current instance.
		@see #httpResponseSubject
	*/
	bookBrowserButtonClicked = function(e, value, depth, role, title, data, index, item){
		var url, message, workCount, subject, hasSubjectValue = subjects.join(',').indexOf(value) !== -1;
		
		if(item['items'] || value === 'menu'){
			//item already has 
			//submenus retrieved, so do nothing.
			return;
		}
		
		if (hasSubjectValue){
			subjectIndex = subjects.indexOf(value);
		}
		
		workCount = workCounts[subjectIndex];
		subject = subjects[subjectIndex];
			
		if (hasSubjectValue || data === 'next'){
			//save the current item so that we may reference it after the callback
			//to append menu items to it (see httpResponseSubject)
			currentItem = item;
			
			offset = (depth + 1) * limit;
			
			if (offset > workCount && (offset - limit) <= 0){
				return;
			}
			
			message = $.formatString('records between {0} - {1} offset result of {2} from OpenLibrary.org', offset - limit, offset, subject);
			url = $.formatString(subjectUrl, subject, limit, offset, httpResponseSubjectToString);
			jsonp(url, message);
		}else if (value.indexOf('/works/') === 0){
			url = $.formatString(workUrl, value);
			window.open(url, '_blank');
			window.focus();
		}
	};
	$.addEvent(window, 'load', 
		function(){
		window['$m_DEBUG'] = true;//enables console logging
		if(!supportsCanvas()){
			//we do not support ie8 and below on this demo. Sorry ie8 
			$.removeCssClass(document.getElementById('nosupport'), 'hide');
			$.addCssClass(document.getElementById('intro'), 'hide');
			return;
		}
		bookBrowser = new PathMenu(
		{
			'elem': document.getElementById('menu1'), 
			'onSelectedItem': bookBrowserButtonClicked,
			'radius': 50,
			'expandPattern': 0
		});
		init();
	});

})(window, document, window['$m'], window['PathMenu']);
