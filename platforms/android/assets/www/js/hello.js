$(document).ready(function() {


		   $('a[href="#forum"]').on('click', function() {       
        var forumDiv = $('#forum_content');
        if (forumDiv.html().trim() === "") {
            forumLoad();
        }
    }); 
		   
});