$(document).ready(function() {


		      
      //  var forumDiv = $('#forum_content');
   
            forumLoad();
       
    

});


var isForumLoading = false;
var forumUrl = "http://wedup.net/index.php?usernamePrefix=highlight&s=09599423-4DE9-4120-ACD0-4B4DCC8F537B&native=true";
function forumLoad() {
    var forumDiv = $('#forum_content');
  
   
    	console.log(forumUrl);
        $('#forum_content').load(forumUrl);
    
}
