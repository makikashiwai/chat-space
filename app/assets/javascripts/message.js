$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="main-chat__message-list__massage">
          <div class="main-chat__message-list__massage__upper-info">
            <p class="main-chat__message-list__massage__upper-info__talker">
              ${message.user_name}
            </p>
            <p class="main-chat__message-list__massage__upper-info__date">
              ${message.created_at}
            </p>
          </div>
          <p class="main-chat__message-list__massage__text">
            ${message.content}
          </p>
          <img src=${message.image} >
        </div>`
    } else {
      var html =
        `<div class="main-chat__message-list__massage">
          <div class="main-chat__message-list__massage__upper-info">
            <p class="main-chat__message-list__massage__upper-info__talker">
              ${message.user_name}
            </p>
            <p class="main-chat__message-list__massage__upper-info__date">
              ${message.created_at}
            </p>
          </div>
          <p class="main-chat__message-list__massage__text">
            ${message.content}
          </p> 
        </div>`
      return html;
    };
  }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-chat__message-list').append(html);
    $('.new_message')[0].reset();
    $('.submit-btn').prop('disabled', false);
    $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
})
});