$(function(){ 
  function buildHTML(message){
    if ( message.content && message.image ) {
      var html =
        `<div class="main-chat__message-list__massage" data-message-id=${message.id}>
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
          <img class="lower-message__image" src="${message.image}">
        </div>`
    } else if (message.content){
      var html =
        `<div class="main-chat__message-list__massage" data-message-id=${message.id}>
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
    }else if (message.image){
      var html = `<div class="main-chat__message-list__massage" data-message-id="${message.id}">
      <div class="main-chat__message-list__massage__upper-info">
      <p class="main-chat__message-list__massage__upper-info__talker">
      ${message.user_name}
      </p>
      <p class="main-chat__message-list__massage__upper-info__date">
      ${message.created_at}
      </p>
      </div>
      <p class="main-chat__message-list__massage__text">
      <img class="lower-message__image" src="${message.image}" alt="Eunfllfucayj17z">
      </p>
      </div>`
    };
    return html;
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
  var reloadMessages = function() {
    var last_message_id = $('.main-chat__message-list__massage:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".submit-btn").prop("disabled", false);
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});