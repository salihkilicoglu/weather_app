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

$(document).on('load', $.getJSON( "api/weather/users/", function(data) {
  if(data){
    $('#users_log').append(data.map(selectbox => `<option>${selectbox.id}</option>`))
  } else{
    $('document').body.append('selectoptions');
  }
  }))

$(document).on('load', $.getJSON( "api/weather/locations/", function(data) {
  if(data){
    $('#locations_users_log').append(data.map(selectbox => `<option>${selectbox.city}</option>`))
  } else{
    $('document').body.append('selectoptions');
  }
  }))


const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
$(document).ready(function(){

  // add location
  $('#post_button').on('click', function(e){
    var value_inbox = $('#text_input').val()

  $.ajax({
    type: 'POST',
    url: "api/weather/locations/create/",
    data: JSON.stringify({city: value_inbox}),
    headers: {
      'X-CSRFToken': csrftoken,
      "Accept": "application/json"},
    error: function(err) {
      alert(JSON.stringify(err.responseText));
    },
    dataType: "json",
    contentType: "application/json",
    success: function () { location.reload() }
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
        alert(JSON.stringify(err.responseText));
      },
      dataType: "json",
      contentType: "application/json",
      success: function () { location.reload(),window.scrollTo('#first-divison') }
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
    success: function () { location.reload() },
    error: function(err) {
      alert(JSON.stringify(err.responseText));
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
      alert(JSON.stringify(err.responseText));
    },
    dataType: "json",
    contentType: "application/json",
    success: function () { location.reload(),window.scrollTo($('#second-div').offset().top()) }
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
      alert(JSON.stringify(err.responseText));
    },
    dataType: "json",
    contentType: "application/json",
    success: function () { location.reload() }
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
    success: function () { location.reload() },
    error: function(err) {
      alert(JSON.stringify(err.responseText));
    },
  });
  })
  

  // weather_button on click show weather
  $("#weather_button").on("click", function(){
    var startTime = performance.now();
    var deneme = $('#deneme');
    deneme.css('display','block')
    window.selectedVal = $("#locations option:selected").val();
    $.getJSON(`api/weather/api/?q=${window.selectedVal}`, function(data) {
      var myjson = data;
      if(data.cod == 404){
        deneme.html(`
        <p class="weather-info-text" style="text-transform:capitalize;font-weight:bold;color:#FF0000;">${data.message}</p>
        `)
        var query_success = false;
        var query_time = 0;
        $.ajax({
          type: 'POST',
          url: "api/weather/logs/create/",
          data: JSON.stringify({location_id: window.selectedVal, query_result: myjson, query_time: query_time, query_success: query_success}),
          headers: {
            'X-CSRFToken': csrftoken,
            "Accept": "application/json"},
          error: function(err) {
            alert(JSON.stringify(err.responseText));
          },
          dataType: "json",
          contentType: "application/json"
        })
        return false;
      }
      else{

        deneme.html(`
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="100" />
        <p class="weather-info-text"><span>Sıcaklık:</span> ${data.main.temp}℃</p>
        <p class="weather-info-text"><span>Hissedilen Sıcaklık:</span> ${data.main.feels_like}℃</p>
        <p class="weather-info-text"><span>Maksimum Sıcaklık:</span> ${data.main.temp_max}℃</p>
        <p class="weather-info-text"><span>Minimum Sıcaklık:</span> ${data.main.temp_min}℃</p>
        <p class="weather-info-text"><span>Basınç:</span> ${data.main.pressure}</p>
        <p class="weather-info-text"><span>Nem Oranı:</span> %${data.main.humidity}</p>
        <p class="weather-info-text"><span>Rüzgar Hızı:</span> ${data.wind.speed}</p>
        <p class="weather-info-text"><span>Rüzgar Derecesi:</span> ${data.wind.deg}</p>
        `) ;

      var query_success = true;
      var endTime = performance.now();
      var query_time = endTime - startTime;
      
      $.ajax({
        type: 'POST',
        url: "api/weather/logs/create/",
        data: JSON.stringify({location_id: window.selectedVal, query_result: myjson, query_time: query_time, query_success: query_success}),
        headers: {
          'X-CSRFToken': csrftoken,
          "Accept": "application/json"},
        error: function(err) {
          alert(JSON.stringify(err.responseText))
        },
        dataType: "json",
        contentType: "application/json"
      })
    }
    })
  })

  // option select on click show user details
  $("#user_button").on("click", function(){
    var selectedUser = $("#users option:selected").val();
    $.getJSON(`api/weather/users/${selectedUser}`, function(data) {
      var userJson = $('#user_json');
      userJson.css('display','none');
      userJson.text(JSON.stringify(data, undefined, 2));
      userJson.css('display','table');
    })
  })

  // user_log_post_button on click show logs
  $("#user_log_post_button").on("click", function(){
    var selectedValLog = $("#users_log option:selected").val();
    $.getJSON(`api/weather/logs/?user_id=${selectedValLog}`, function(data) {
      if(data){
        var logJson = $('#logs_json');
        logJson.css('display','none');
        logJson.text(JSON.stringify(data, undefined, 2));
        logJson.css('display','table');
      }
      else{
      return false
      }

    })
  })

  // user_log_1_minute on click show logs
  $("#user_log_1_minute").on("click", function(){
    var selectedValLog2 = $("#users_log option:selected").val();
    $.getJSON(`api/weather/logs/?query_date=1&user_id=${selectedValLog2}`, function(data) {
      if(data){
        var logJson = $('#logs_json');
        logJson.css('display','none');
        logJson.text(JSON.stringify(data, undefined, 2));
        logJson.css('display','table');      }
      else{
      return false
      }

    })
  })

  // user_log_5_minutes on click show logs
  $("#user_log_5_minutes").on("click", function(){
    var selectedValLog3 = $("#users_log option:selected").val();
    $.getJSON(`api/weather/logs/?query_date=5&user_id=${selectedValLog3}`, function(data) {
      if(data){
        var logJson = $('#logs_json');
        logJson.css('display','none');
        logJson.text(JSON.stringify(data, undefined, 2));
        logJson.css('display','table');      }
      else{
      return false
      }

    })
  })

  // user_log_5_minutes on click show logs
  $("#user_log_5_minutes").on("click", function(){
    var selectedValLog4 = $("#users_log option:selected").val();
    $.getJSON(`api/weather/logs/?query_date=5&user_id=${selectedValLog4}`, function(data) {
      if(data){
        var logJson = $('#logs_json');
        logJson.css('display','none');
        logJson.text(JSON.stringify(data, undefined, 2));
        logJson.css('display','table');      }
      else{
      return false
      }

    })
  })

  // locations_user_log_button on click show logs
  $("#locations_user_log_button").on("click", function(){
    var selectedValLog5 = $("#locations_users_log option:selected").val();
    var selectedValLog6 = $("#users_log option:selected").val();
    $.getJSON(`api/weather/logs/?location_id=${selectedValLog5}&user_id=${selectedValLog6}`, function(data) {
      if(data){
        var logJson = $('#logs_json');
        logJson.css('display','none');
        logJson.text(JSON.stringify(data, undefined, 2));
        logJson.css('display','table');
      }
      else{
      return false
      }

    })
  })

  // locations_user_log_button on click show logs +++
  $("#locations_user_log_success_button").on("click", function(){
    var selectedValLog7 = $("#success_user_log option:selected").val();
    var selectedValLog8 = $("#users_log option:selected").val();
    $.getJSON(`api/weather/logs/?query_success=${selectedValLog7}&user_id=${selectedValLog8}`, function(data) {
      if(data){
        var logJson = $('#logs_json');
        logJson.css('display','none');
        logJson.text(JSON.stringify(data, undefined, 2));
        logJson.css('display','table');
      }
      else{
      return false
      }

    })
  })

})