/** @jsx React.DOM */

var React = window.React = require('react/addons'),
    _ = require('underscore'),
    AddCityForm = require("./ui/AddCityForm"),
    City = require("./ui/City"),
    Button = require('react-bootstrap').Button, 
    mountNode = document.getElementById("app");



var WeatherApp = React.createClass({

  getInitialState: function() {
    return {
      cities: []
    }
  },
  componentWillMount: function(){
    this.interval = {};
  },
  addCity: function(city){
   var cities = this.state.cities;

   getWeather(city, this)


   this.interval[city.name] = setInterval(function(){
      if(_.find(this.state.cities, city) !== undefined){

        updateWeather(city, this)
      }
      else{
        clearInterval(this.interval[city.name])
      }

   }.bind(this), city.interval)
  },
  removeCity: function(name){

    var remaining = this.state.cities.filter(function(city){
        return city.name !== name;
    }, this);

    this.setState({cities: remaining});
  },
  render: function() {
    return (
      <div className="text-center clearfix">
        { (!this.state.cities.length) ? <h2>Please add a city below</h2> : ''}

        <div className="city clearfix center text-center">
        {this.state.cities.map(function(item, i){

        return <City data={item} cities={this.state.cities.length} key={i} remove={this.removeCity} />
        }, this).sort()}
        </div>
        { (this.state.cities.length < 6) ? <AddCityForm addCity={this.addCity}/>: <h4>You've hit the maximum number of cities! Why don't you delete one?</h4>}
      </div>
    );
  }
});


function getWeather(city, ref){
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city.name + '&units=metric', function(result) {
    var cities = this.state.cities;
    var weather = result.weather[0];
    var d = new Date();

    var cityWeather = {
      description: weather.description,
      icon: weather.icon,
      date: d.toString(),
      temp: Math.floor(result.main.temp)
    }

    _.extend(city, cityWeather)

    cities.push(city);
    ref.setState({cities: cities})

  }.bind(ref))
}

function updateWeather(city, ref){
  var update = React.addons.update, 
      cities = ref.state.cities;
  // var toBeUpdated = _.find(ref.state.cities, city)
  var cityIndex;

  for( i = 0; i < cities.length; i++ ){
    if(city.name === cities[i].name){
      cityIndex = i;
    }
  }

  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city.name + '&units=metric', function(result) {
    var weather = result.weather[0];
    var d = new Date();


    var cityWeather = {
      description: weather.description,
      icon: weather.icon,
      date: d.toString(),
      temp: Math.floor(result.main.temp)
    }

    _.extend(city, cityWeather)

    var newCities = update(cities, {
      $splice: [[cityIndex, 1, city]]
    })

    ref.setState({cities: newCities})
  })

}



React.render(
  <WeatherApp />,
  mountNode
);
