$(document).on('turbolinks:load',function() {

  var search_list = $("#user-search-result");
  var add_list = $(".js-add-user");

  function appendUser(user) {
    var html =`<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${user.name}</p>
                 <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
               </div>`
    search_list.append(html);
  }

  function addUser(user_id,user_name) {
    var html =`<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
      add_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(user) {
      if (user.length !== 0) {
      user.forEach(function(user){
        appendUser(user);
      });
    }

      else {
        alert('一致するユーザーはいません');
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on("click",".chat-group-user .user-search-add", function(user_id,user_name){
    $(this).parent().remove();
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name");
    addUser(user_id,user_name);
  });

  $(document).on("click",".user-search-remove", function(){
    $(this).parent().remove();
  });

});
