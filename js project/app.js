var vremea={};

var APPID="505e0a43d2be3f3d760a69d22483128d";


function updateByZip(zip){
  var url="http://api.openweathermap.org/data/2.5/weather?"
  +"zip="+zip
  +"&APPID="+APPID;
  sendRequest(url);
}
function updateByGeo(lat,lon){
  var url="http://api.openweathermap.org/data/2.5/weather?"
  +"lat="+lat+"&lon="+lon+"&APPID="+APPID;
  sendRequest(url);
}



function sendRequest(url){
  var xmlhttp= new XMLHttpRequest();
  xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
      var data=JSON.parse(xmlhttp.responseText);
      var weather={};
      weather.icon=data.weather[0].id;
      weather.humidity=data.main.humidity;
      weather.wind=data.wind.speed;
      weather.direction=data.wind.deg;
      weather.loc=data.name;
      console.log(weather);
      weather.temp=KtoC(data.main.temp);
      update(weather);

    }
  };
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}
function KtoC(d){
    return Math.round(d-273.15);
}

function update(weather) {
  vremea.wind.innerHTML=weather.wind;
  vremea.direction.innerHTML=weather.direction;
  vremea.humidity.innerHTML=weather.humidity;
  vremea.loc.innerHTML=weather.loc;
  vremea.temp.innerHTML=weather.temp;
  vremea.icon="imgs/codes"+weather.icon+".png";

}
function showPosition(position){
  updateByGeo(position.coords.latitude, position.coords.longitude);
}

window.onload=function() {
  vremea.temp=document.getElementById('temperature');
  vremea.loc=document.getElementById('location');
  vremea.icon=document.getElementById('icon');
  vremea.humidity=document.getElementById('humidity');
  vremea.wind=document.getElementById('wind');
  vremea.direction=document.getElementById('direction');

/*  var weather={};
  weather.wind=3.5;
  weather.direction="N";
  weather.humidity=55;
  weather.loc="Bucuresti";
  weather.temp="45";
  weather.icon=200;

  update(weather)*/
//  updateByZip(10020);
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
  }else {
    var zip =window.prompt("Nu am putut gasi locatia. Introduceti codul postal: ");
    updateByZip(zip);
  }
}
