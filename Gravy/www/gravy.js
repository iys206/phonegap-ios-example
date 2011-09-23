(function($){
 
 var enpointURL;
 
 $(document).ready(function(){ $(document).bind('deviceready', function(){ onDeviceReady() })});   
 
 function onDeviceReady(){
    window.plugins.app47.info(["app started up"]);
 
    window.plugins.app47.getValue("PG", "endpoint_2", 
        function(result){
          enpointURL = result;
        }, 
        function(error){
          enpointURL =  "http://localhost:8080/";
        });
 }

 $(function(){

    $("#submit_deal").submit(function(event, info) {
        var descp = $("input[id=description]", this);
        var tgs = $("input[id=tags]", this);
                             
        descp.blur();
        tgs.blur();
        
        var timedEventID = 0;

        window.plugins.app47.startTimedEvent(["deal submission"],  
                    function(result){  timedEventID = result; });
                             
        $.ajax({
              type: "PUT",
              url: enpointURL,
              data: JSON.stringify({ deal_description: descp.val() , all_tags: tgs.val() }),
              contentType: 'application/json', // format of request payload
              dataType: 'json', // format of the response
              success: function(msg) { 
                $('#notice').empty();
                $("#notice").fadeIn(3, function() { 
                    $("#notice").append("<ul><li>Deal submitted!</li></ul>");
                    $('form :input').val("");	        
                    $("#notice").fadeOut(3200);
                     
                });
                window.plugins.app47.sendGenericEvent(["deal submitted"]);                        
                window.plugins.app47.endTimedEvent([timedEventID]); 
              }
        });
        return false;       
    });
 });
 
})(jQuery);