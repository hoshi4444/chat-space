$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    
  var img = message.image !== null ? `<img src=${message.image} class: message__text__image >` : ""

  var html = `<div class="message" data-message_id='${message.id}'>
                <div class="message__upper-info">
                  <div class="message__upper-info__talker">
                   ${message.user_name}
                  </div>
                  <div class="message__upper-info__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message__text">
                  ${message.content}
                  ${img}
                </div>
              </div>`
  return html;
  }
  
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var href = window.location.href
      $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
    .done(function(data){
      var html = buildHTML(data)
      $('.messages').append(html).animate({scrollTop:$('.messages')[0].scrollHeight},'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('input').removeAttr("disabled");
      });
  })

  
  if(document.URL.match("/messages")) {
   var reloadMessages = function() {
     last_message_id = $('.message:last').data('message_id')
     $.ajax({
       url: 'api/messages',
       type: 'get',
       dataType: 'json',
       data: {id: last_message_id}
     })
     .done(function(messages) {
       var insertHTML = '';
       messages.forEach(function(message){
       insertHTML = buildHTML(message)
       })
       $('.messages').append(insertHTML).animate({scrollTop:$('.messages')[0].scrollHeight},'fast');
     })
     .fail(function() {
       alert('通信に失敗しました。')
     });
   };
   setInterval(reloadMessages, 5000)
  }
});