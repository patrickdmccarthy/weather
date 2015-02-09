/** @jsx React.DOM */

var React = window.React = require('react/addons'),
    AddCityForm = require("./ui/AddCityForm"),
    City = require("./ui/City"),
    mountNode = document.getElementById("app"),
    Modal = require('react-bootstrap').Modal,
    Button = require('react-bootstrap').Button, 
    ModalTrigger = require('react-bootstrap').ModalTrigger,
    _ = require('underscore');


var WeatherApp = React.createClass({

  getInitialState: function() {
    return {
      cities: [{
        name: 'New York',
        interval: 10000
        },
        {
        name: 'Berlin',
        interval: 15000
        }
        ],
    }
  },
  componentWillMount: function(){
    this.cities =[];

    this.state.cities.forEach(function(city, i){
      getWeather(city, i, this);

      var interval = {};

      interval[city] = setInterval(function(){

        if(_.find(this.state.cities, city) !== undefined){
          getWeather(city, i, this)
        }
        else{
          clearTimeout(interval[city])
        }
      }.bind(this), city.interval)

    }, this)
      
    this.cities =[];


  },
  componentDidMount: function(){


  },  
  addCity: function(city){
   var cities = this.state.cities;
   cities.concat([city]);
   var index = cities.length;

   getWeather(city, index, this)

  },
  removeCity: function(i){


    var remaining = this.state.cities.filter(function(city){
        return this.state.cities.indexOf(city) !== i;
    }, this);
    this.setState({cities: remaining});

  },
  render: function() {
    return (
      <div className="text-center clearfix">
        <div className="city clearfix center text-center">
        {this.state.cities.map(function(item, i){

        return <City data={item} cities={this.state.cities.length} index={i} key={i} remove={this.removeCity} />
        }, this)}
        </div>
        <AddCityForm addCity={this.addCity}/>
      </div>
    );
  }
});


function getWeather(city, i, ref){
  console.log(city)

  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city.name + '&units=metric', function(result) {
    var weather = result.weather[0];
    var d = new Date();

    var cityWeather = {
      description: weather.description,
      icon: weather.icon,
      date: d.toString(),
      temp: Math.floor(result.main.temp)
    }

    //Create a copy so I don't modify this.state directly
    var updated = _.clone(city)
    _.extend(updated, cityWeather)

    this.cities[i] = updated;
    ref.setState({cities: ref.cities})

  }.bind(ref))
}



React.render(
  <WeatherApp />,
  mountNode
);
