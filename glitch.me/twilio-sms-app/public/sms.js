$(document).ready(function() {
  $("#ssss").keyup(function(event) {
    if (event.keyCode == 13) {
      $("#get").click();
    }
  });
  $("#get").click(function() {
    var ssss = $("#ssss").val();
    $.post("/get-sms", { ssss: ssss }, function(data) {
      if (data.messagesReceived) {
        $("#info").html("");
        $("#ul").empty();
        data.messagesReceived.forEach(function(message) {
          $("#ul").append(
            `<li>
            <span class='dateSent'>${message.dateSent}</span>
            <span class='from'>${message.from}</span>
            <span class='arrow'> ----> </span>
            <span class='to'>${message.to}</span>
            <span class='body'>${message.body}</span>
            </li>`
          );
        });
      } else {
        $("#info").html("No data received.");
      }
    });
  });
});
