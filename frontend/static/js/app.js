$.getJSON( "http://localhost:8000/api/weather/locations", function(data) {
  if(data){
    $('#deneme').append(data.map(asd => `<option>${asd.city}</option>`))
  } else{
    $('document').body.append('asdasd');
  }
});