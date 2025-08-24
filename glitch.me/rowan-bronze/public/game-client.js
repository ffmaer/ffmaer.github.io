$(function() {
  
  
  $.get('/status', function(status) {
    var boxes = document.querySelector("#boxes").querySelectorAll("a-box");
    console.log(status);
    boxes.forEach(function(box){
      var index = Number.parseInt($(box).data("index"));
      if(status[index]==1){
        $(box).attr("color","#EF2D5E");
      }
      
    });
  });


});
