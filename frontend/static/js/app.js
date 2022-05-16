$(document).on('load', $.getJSON( "api/weather/locations/", function(data) {
  if(data){
    $('#locations').append(data.map(selectbox => `<option>${selectbox.city}</option>`))
  } else{
    $('document').body.append('selectoptions');
  }
  }))
  
    $(document).on('load', $.getJSON( "api/weather/locations/", function(data) {
  if(data){
    $('#locations_update').append(data.map(selectbox => `<option>${selectbox.city}</option>`))
  } else{
    $('document').body.append('selectoptions');
  }
  }))
  
  $(document).on('load', $.getJSON( "api/weather/locations/", function(data) {
  if(data){
    $('#locations_delete').append(data.map(selectbox => `<option>${selectbox.city}</option>`))
  } else{
    $('document').body.append('selectoptions');
  }
  }))
  
  $(document).on('load', $.getJSON( "api/weather/users/", function(data) {
  if(data){
    $('#users').append(data.map(selectbox => `<option>${selectbox.username}</option>`))
  } else{
    $('document').body.append('selectoptions');
  }
  }))
  
  $(document).on('load', $.getJSON( "api/weather/users/", function(data) {
  if(data){
    $('#users_update').append(data.map(selectbox => `<option>${selectbox.username}</option>`))
  } else{
    $('document').body.append('selectoptions');
  }
  }))
  
  $(document).on('load', $.getJSON( "api/weather/users/", function(data) {
  if(data){
    $('#users_delete').append(data.map(selectbox => `<option>${selectbox.username}</option>`))
  } else{
    $('document').body.append('selectoptions');
  }
  }))
  
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    $(document).ready(function(){
  
  
    // add location
    $('#post_button').on('click', function(e){
      var value_inbox = $('#text_input').val()
      e.preventDefault()
  
    $.ajax({
      type: 'POST',
      url: "api/weather/locations/create/",
      data: JSON.stringify({city: value_inbox}),
      headers: {
        'X-CSRFToken': csrftoken,
        "Accept": "application/json"},
      error: function(err) {
        console.log(err); // console'a değil ekrana yazacak
      },
      dataType: "json",
      contentType: "application/json"
    });
    })
  
    // update location
    $('#update_button').on('click', function(e){
      var value_selected_update = $('#locations_update').val()
      var value_inbox_update = $('#text_input_update').val()
      e.preventDefault()
  
  
    $.ajax({
      type: 'PUT',
      url: `api/weather/locations/${value_selected_update}/update/`,
      data: JSON.stringify({city: value_inbox_update}),
      headers: {
        'X-CSRFToken': csrftoken,
        "Accept": "application/json"},
      error: function(err) {
        console.log(err); // console'a değil ekrana yazacak
      },
      dataType: "json",
      contentType: "application/json"
    });
    })
  
    // delete location
    $('#delete_button').on('click', function(e){
      var value_selected_delete = $('#locations_delete').val()
      e.preventDefault()
  
    $.ajax({
      type: 'DELETE',
      url: `api/weather/locations/${value_selected_delete}/delete/`,
      headers: {
        'X-CSRFToken': csrftoken,
      },
      error: function(err) {
        console.log(err); // console'a değil ekrana yazacak
      },
    });
    })
  
    // add user
    $('#user_post_button').on('click', function(e){
      var value_username = $('#user_input_post_username').val()
      var value_password = $('#user_input_post_password').val()
      var value_admin = $('#user_input_post_admin').val()
      e.preventDefault()
  
    $.ajax({
      type: 'POST',
      url: "api/weather/users/create/",
      data: JSON.stringify({username: value_username, password: value_password, is_staff: value_admin}),
      headers: {
        'X-CSRFToken': csrftoken,
        "Accept": "application/json"},
      error: function(err) {
        console.log(err); // console'a değil ekrana yazacak
      },
      dataType: "json",
      contentType: "application/json"
    });
    })
  
    // update user
    $('#user_update_button').on('click', function(e){
      var value_selected_update_user = $('#users_update').val()
      var value_username_upd = $('#user_input_update_username').val()
      var value_password_upd = $('#user_input_update_password').val()
      var value_admin_upd = $('#user_input_update_admin').val()
      e.preventDefault()
  
    $.ajax({
      type: 'PATCH',
      url: `api/weather/users/${value_selected_update_user}/update/`,
      data: JSON.stringify({username: value_username_upd, password: value_password_upd, is_staff: value_admin_upd}),
      headers: {
        'X-CSRFToken': csrftoken,
        "Accept": "application/json"},
      error: function(err) {
        console.log(err); // console'a değil ekrana yazacak
      },
      dataType: "json",
      contentType: "application/json"
    });
    })
  
    // delete user
    $('#user_delete_button').on('click', function(e){
      var value_selected_delete_user = $('#users_delete').val()
      e.preventDefault()
  
    $.ajax({
      type: 'DELETE',
      url: `api/weather/users/${value_selected_delete_user}/delete/`,
      headers: {
        'X-CSRFToken': csrftoken,
      },
      error: function(err) {
        console.log(err); // console'a değil ekrana yazacak
      },
    });
    })
  
    // option select on change show weather
    $("#locations").on("change", function(){
      var selectedVal = $("#locations option:selected").val();
      $.getJSON(`https://api.openweathermap.org/data/2.5/weather?appid=02a69e2a05969cc2aa72d672bfe47a3d&units=metric&lang=tr&q=${selectedVal}`, function(data) {
        console.log(data); // console'a değil ekrana yazacak
      })
    })
  
    // option select on change show user details
    $("#users").on("change", function(){
      var selectedUser = $("#users option:selected").val();
      $.getJSON(`api/weather/users/${selectedUser}`, function(data) {
        console.log(data); // console'a değil ekrana yazacak
      })
    })
  
  })