function listPosts(data) {
	var output='<ul data-role="listview" data-filter="true">';
	$.each(data.posts,function(key,val) {
	
		var tempDiv = document.createElement("tempDiv");
		tempDiv.innerHTML = val.excerpt;
		$("a",tempDiv).remove();
		var excerpt = tempDiv.innerHTML;	
	
		output += '<li>';
		output += '<a href="#blogpost" onclick="showPost(' + val.id + ')">';
		output += '<h3>' + val.title + '</h3>';
		
		output += (val.thumbnail) ?
			'<img src="' + val.thumbnail + '" alt="' + val.title + '" />':
			'<img src="images/viewsourcelogo.png" alt="View Source Logo" />';
		output += '<p>' + excerpt + '</p>';
		output += '</a>';
		output += '</li>';
	}); // go through each post
	output+='</ul>';
	$('#postlist').html(output);
} // lists all the posts


function showPost(id) {
	$.getJSON('http://iviewsource.com/?json=get_post&post_id=' + id + '&callback=?', function(data) {
		var output='';
		output += '<h3>' + data.post.title + '</h3>';
		output += data.post.content;
		$('#mypost').html(output);
	}); //get JSON Data for Stories
} //showPost


function listVideos(data) {	
	var output ='';
	for ( var i=0; i<data.feed.entry.length; i++) {

		var title = data.feed.entry[i].title.$t;
		var thumbnail = data.feed.entry[i].media$group.media$thumbnail[0].url;
		var description = data.feed.entry[i].media$group.media$description.$t;
		var id = data.feed.entry[i].id.$t.substring(38);
		
		var blocktype = ((i % 2)===1) ? 'b': 'a';
		
		output += '<div class="ui-block-' + blocktype + '">';

		output += '<a href="#videoplayer" data-transition="fade" onclick="playVideo(\'' +  id +'\',\'' + title + '\',\'' + escape(description) + '\')">';
		output += '<h3 class="movietitle">' + title + '</h3>';
		output += '<img src="' + thumbnail + '" alt="' + title + '" />';
		output +="</a>";
		output +="</div>";
	}
	
	$('#videolist').html(output);
}

function playVideo(id, title, description) {
	var output ='<iframe src="http://www.youtube.com/embed/'+ id +'?wmode=transparent&amp;HD=0&amp;rel=0&amp;showinfo=0&amp;controls=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>';
	output += '<h3>' + title + '</h3>';
	output += '<p>' + unescape(description) + '</p>';
	$('#myplayer').html(output);
}

function jsonFlickrFeed(data) {
	var output='';
	
	for (var i = 0; i < data.items.length; i++) {
		var title = data.items[i].title;
		var link = data.items[i].media.m.substring(0, 56);
		var blocktype =
			((i%3)===2) ? 'c':
			((i%3)===1) ? 'b':
			'a';
		output += '<div class="ui-block-' + blocktype + '">';
		output += '<a href="#showphoto" data-transition="fade" onclick="showPhoto(\'' + link +'\',\'' + title + '\')">';
		output += '<img src="' + link + '_q.jpg" alt="' + title + '" />';
		output += '</a>';
		output += '</div>';
	} // go through each photo
	$('#photolist').html(output);
} //jsonFlickrFeed

function showPhoto(link, title) {
	var output='<a href="#photos" data-transition="fade">';
	output += '<img src="' + link + '_b.jpg" alt="' + title +'" />';
	output += '</a>';
	$('#myphoto').html(output);
}




function listTweets(data) {
	console.log(data);
	var output = '<ul data-role="listview" data-theme="a">';
	
	$.each(data, function(key, val) {
		var text = data[key].text;
		var thumbnail = data[key].user.profile_image_url;
		var name = data[key].user.name;
		
		text=text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(i) {
			var url=i.link(i);
			return url;
		});
		
		text=text.replace(/[@]+[A-Za-z0-9-_]+/g, function(i) {
			var item = i.replace("@",'');
			var	url = i.link("http://twitter.com/"+ item);
			return url;
		});
		
		text=text.replace(/[#]+[A-Za-z0-9-_]+/g, function(i) {
			var item = i.replace("#", '%23');
			var url = i.link("http://search.twitter.com/search?q="+item);
			return url;
		});
		
		output += '<li>';
		output += '<img src="' + thumbnail +'" alt="Photo of ' + name + '">';
		output += '<div>' + text + '</div>';
		output += '</li>';		
	}); //go through each tweet
	output += '</ul>';
	$('#tweetlist').html(output);
}

	function scrollU(){
		 $("html, body").animate({ scrollTop: 0 }, 600);
		return false;

	}
	
	function getItemFromStorage(v)
		{
				return jQuery("#"+v).val();
		}
		
		
		
	jQuery(document).ready(function() {
	
		if(jQuery("#s").val()!=""){
					var cc = new CanvasCarousel("myCanvas", "circle.php?id="+jQuery("#sapakID").val()+"&s="+jQuery("#s").val()+"&hasPortfolioMovies="+jQuery("#hasPortfolioMovies").val()+"&hasPortfolioImages="+jQuery("#hasPortfolioImages").val()+"&w=320&height=200");
					var cc2 = new CanvasCarousel("myCanvas2", "circle.php?id="+jQuery("#sapakID").val()+"&s="+jQuery("#s").val()+"&hasPortfolioMovies="+jQuery("#hasPortfolioMovies").val()+"&hasPortfolioImages="+jQuery("#hasPortfolioImages").val()+"&w=480&height=320");
				}
				else{
					var cc = new CanvasCarousel("myCanvas", "circle.php?id="+jQuery("#sapakID").val()+"&hasPortfolioMovies="+jQuery("#hasPortfolioMovies").val()+"&hasPortfolioImages="+jQuery("#hasPortfolioImages").val()+"&w=320&height=200");
					var cc2 = new CanvasCarousel("myCanvas2", "circle.php?id="+jQuery("#sapakID").val()+"&hasPortfolioMovies="+jQuery("#hasPortfolioMovies").val()+"&hasPortfolioImages="+jQuery("#hasPortfolioImages").val()+"&w=480&height=320");
				}
				var numberOfChapters=jQuery("#numberOfChapters").val();
				
				if(numberOfChapters>0)
				setInterval( "slideSwitch('slideshow0')", 5350 );
				if(numberOfChapters>1)
					setInterval( "slideSwitch('slideshow1')", 4200 );
				if(numberOfChapters>2)
					setInterval( "slideSwitch('slideshow2')", 6300 );
				if(numberOfChapters>3)
					setInterval( "slideSwitch('slideshow3')", 2100 );		
				if(numberOfChapters>4)
					setInterval( "slideSwitch('slideshow4')", 2800 );
				if(numberOfChapters>5)
					setInterval( "slideSwitch('slideshow5')", 6800 );
				if(numberOfChapters>6)
					setInterval( "slideSwitch('slideshow6')", 2000 );
				if(numberOfChapters>7)
					setInterval( "slideSwitch('slideshow7')", 7300 );
				if(numberOfChapters>8)
					setInterval( "slideSwitch('slideshow8')", 4500 );
				if(numberOfChapters>9)
					setInterval( "slideSwitch('slideshow9')", 3200 );	
				
				//portfolio
				var numberOfChaptersPortfolio=jQuery("#numberOfChaptersPortfolio").val();
			
				if(numberOfChaptersPortfolio>0)
				setInterval( "slideSwitch('slideshowportfolio0')", 5350 );
				if(numberOfChaptersPortfolio>1)
					setInterval( "slideSwitch('slideshowportfolio1')", 4200 );
				if(numberOfChaptersPortfolio>2)
					setInterval( "slideSwitch('slideshowportfolio2')", 6300 );
				if(numberOfChaptersPortfolio>3)
					setInterval( "slideSwitch('slideshowportfolio3')", 2100 );		
				if(numberOfChaptersPortfolio>4)
					setInterval( "slideSwitch('slideshowportfolio4')", 2800 );
				if(numberOfChaptersPortfolio>5)
					setInterval( "slideSwitch('slideshowportfolio5')", 6800 );
				if(numberOfChaptersPortfolio>6)
					setInterval( "slideSwitch('slideshowportfolio6')", 2000 );
				if(numberOfChaptersPortfolio>7)
					setInterval( "slideSwitch('slideshowportfolio7')", 7300 );
				if(numberOfChaptersPortfolio>8)
					setInterval( "slideSwitch('slideshowportfolio8')", 4500 );
				if(numberOfChaptersPortfolio>9)
					setInterval( "slideSwitch('slideshowportfolio9')", 3200 );						
					
					
	    jQuery("#selective-nav").on('click touchstart', function() {
	        jQuery("#overly-menu").fadeIn(500);
	    });

	    jQuery("#overly-menu .close").on('click touchstart', function() {
	        if (jQuery("#overly-menu").is(":visible")) {
	            jQuery("#overly-menu").fadeOut(500);
	        }
			
	    });

	        jQuery("#overly-menu ul li a").click(function() {
				var str = $(this).text();
				//jQuery("#selective-nav").html("<span class='down-arow'></span> <strong>"+ str +"</strong>");
				jQuery("#selective-nav").html("<span class='down-arow'></span>");
								
				jQuery("#overly-menu").fadeOut(500);
				

	        });
	});


	
	
	
	$(document).on('pageinit', '#login', function(){  
        $(document).on('click', '#submit', function() { // catch the form's submit event
            if($('#username').val().length > 0){
                // Send data to server through the ajax call
                // action is functionality we want to call and outputJSON is our data
				
                    $.ajax({url: 'info/checkuser.php',
                        data: {action : 'login', user : $('#username').val(),s:jQuery("#s").val()},
                        type: 'post',                   
                        async: 'true',
                                                 dataType: 'json',
                        beforeSend: function() {
						$.mobile.loading('show'); // This will show ajax spinner
							$('#submit').attr("disabled", true);							
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.loading('hide'); // This will hide ajax spinner
							$('#submit').attr("disabled", false);
                        },
                        success: function (result) {
                            if(result.sucess=="true") {					
								location.reload();
															
                            } else {
								jQuery("#message").html("סיסמא לא נכונה - "+$('#username').val()); 
                            }
							$('#submit').attr("disabled", false);
                        },
                        error: function (request,error) {
                            jQuery("#message").html("Network error has occurred");   
							$('#submit').attr("disabled", false);
                        }
                    });                   
            } else {
				jQuery("#message").html("אנא הזינו סיסמא");  
            }           
            return false; // cancel original event to prevent form submitting
        });    
});

	function shareSource(source)
	{
		var url="http://wedup.net/promo/"+getItemFromStorage("g");
		
		if(source=="facebook")
			window.location="http://www.facebook.com/sharer.php?u="+url;
		if(source=="twitter")
			window.location="https://twitter.com/intent/tweet?url="+url;
		if(source=="linkedin")
			window.location="http://www.linkedin.com/shareArticle?mini=true&title=<?php echo $sapakName?>&summary=סרטון פרומו לחתונה שלי מבית היוצר של <?php echo $sapakName?>&source=WedUp.co.il&url="+url;
		if(source=="whatsup")
			window.location="whatsapp://send?text=My Wedding "+url;
		if(source=="email")
			window.location="mailto:?Subject=סרטון פרומו לחתונה שלי&Body="+url;	
		if(source=="google")
			window.location="https://plus.google.com/share?url="+url;	
		if(source=="pintress")
			window.location="http://pinterest.com/pin/create/link/?url="+url;	
			
	}
	
	function changeYouTubeSource(source,i)
	{

		//jQuery('.rp_playlist li').removeClass( "rp_currentVideo" );
		document.getElementById('you').src = "http://www.youtube.com/embed/"+source+"?autoplay=0&amp;autohide=2&amp;rel=1&amp;theme=dark&amp;color=white&amp;showinfo=1&amp;vq=medium";
		$('body').scrollTop(0);
		//jQuery("#k"+i).addClass( "rp_currentVideo" );
		//$("#k"+i).css('background-color', '#4a4a4a');
		
	}
	function showVideoPortfolio(index) {

		document.getElementById("videoPortfolio"+index).play();
	    return false;
	}
	
	function showVideo(index) {

		document.getElementById("video"+index).play();
	    return false;
	}
function redirectToVideo(url)
{
	window.location=url;
}
	
function slideSwitch(id) { 
    var $active = $('#'+id+' IMG.active');
    if ( $active.length == 0 ) $active = $('#'+id+' IMG:last');
    // use this to pull the images in the order they appear in the markup
    var $next =  $active.next().length ? $active.next()
        : $('#'+id+' IMG:first');
    $active.addClass('last-active');
      $active.css({'z-index':9});
	    $next.css({'z-index':10});
    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {		
	    $next.css({opacity:1.0});
            $active.removeClass('active last-active');
        });
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function showGallery()
	{
		var slider = TouchNSwipe.getSlider("g2");
		var gallery = TouchNSwipe.get('g2'); 
		gallery.show(true);
	}
	
		var addToHomeConfig = {
			message: 'להתקנת האפליקציה לחצו כאן %icon.'+" והוסף למסך הבית"
		};
		
	function insertParam(key, value)
	{
		key = encodeURI(key); value = encodeURI(value);
		var kvp = document.location.search.substr(1).split('&');
		var i=kvp.length; var x; while(i--) 
		{
			x = kvp[i].split('=');
			if (x[0]==key)
			{
				x[1] = value;
				kvp[i] = x.join('=');
				break;
			}
		}

		if(i<0) {kvp[kvp.length] = [key,value].join('=');}

		//this will reload the page, it's likely better to store this until finished
		document.location.search = kvp.join('&'); 
	}
	
	
	
	
	function logout()
	{
			jQuery("#g").val("");
			jQuery("#b").val("");
			jQuery("#bl").val("");
			
		  $.ajax({url: 'info/logout.php',
                        data: {action : 'logout',s:jQuery("#s").val()},
                        type: 'post',                   
                        async: 'true',
                        dataType: 'json',
                        beforeSend: function() {
						$.mobile.loading('show'); 						
                        },
                        complete: function() {
                            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1,window.location.href.indexOf("?")-window.location.href.lastIndexOf("/"));
							window.location=filename+"usernamePrefix="+jQuery("#usernamePrefix").val()+"&s="+jQuery("#s").val();
                        }
                    });      
		
	}
	
	 function redirectPage(page)
	 {
			 if((getItemFromStorage("g")=="")&&(page!="#youtube")&&(page!="#home"))
			 {
				$(':mobile-pagecontainer').pagecontainer('change', '#login', {
														transition: 'flip',
														changeHash: false,
														reverse: true,
														showLoadMsg: true
													});
			 }
			 else
			 {
			  $(':mobile-pagecontainer').pagecontainer('change', page, {
														transition: 'flip',
														changeHash: false,
														reverse: true,
														showLoadMsg: true
													});
			  } 
	 }










