/**

    Maybe you can keep this application structure? It's not a mandatory,
    maybe you can suggest the better one? :)
    At first, please, look at the inline comments below.

                                   |---------------------------|
                                   |                           |
                                   |                           |
                                   |            APP            |
                                   |                           |
                                   |                           |
                                   |---------------------------|
                                                 |
                                                 |
              |---------------------------------------------------------------------|
              |                                  |                                  |
              |                                  |                                  |
|---------------------------|      |---------------------------|      |---------------------------|
|                           |      |                           |      |                           |
|                           |      |                           |      |                           |
|      Cities counter       |      |         CitiesList        |      |        AddCityForm        |
|                           |      |                           |      |                           |
|                           |      |                           |      |                           |
|---------------------------|      |---------------------------|      |---------------------------|
                                                 |
                                                 |
                                   |---------------------------|
                                   |                           |
                                   |                           |
                                   |            City           |
                                   |                           |
                                   |                           |
                                   |---------------------------|

*/

var React = window.React = require('react/addons'),
    _ = require('underscore'),
    AddCityForm = require("./ui/AddCityForm"),
    City = require("./ui/City"),
    Button = require('react-bootstrap').Button,
    mountNode = document.getElementById("app");

/**
    App should be an entry point where you require components you need.
    Please, move to the separate components <Layout>, <List of the cities> and <City> itself
*/

var WeatherApp = React.createClass({

  getInitialState: function() {
    return {
      //   Use collections/models to store and fetch data (or flux pattern)?
      cities: []
    }
  },
  componentWillMount: function(){
    // Please, look at the comment in {addCity} method
    this.interval = {};
  },
  addCity: function(city){
   var cities = this.state.cities;

   getWeather(city, this)

   /**
        In that case <City> Component should update its data by itself.
        There would be some benefits, like you can set different update interval
        for different cities without storing update interval in the City model (please, don't mix component properties with data).

        Or if you want to improve performance update all <City> components per one request.
        In that case component <List of the cities> should make a request and update it's children.
   */
   this.interval[city.name] = setInterval(function(){
      if(_.find(this.state.cities, city) !== undefined){

        updateWeather(city, this)
      }
      else{
        // Related to the comment above.
        // You should clear interval when you are removing city.
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
        /**
            Not good. Please, look at the http://facebook.github.io/react/docs/class-name-manipulation.html
        */
        { (!this.state.cities.length) ? <h2>Please add a city below</h2> : ''}

        <div className="city clearfix center text-center">
        {this.state.cities.map(function(item, i){

        return <City data={item} cities={this.state.cities.length} key={i} remove={this.removeCity} />
        }, this).sort()}
        </div>
        /**
            Not good. Please, look at the http://facebook.github.io/react/docs/class-name-manipulation.html
        */
        { (this.state.cities.length < 6) ? <AddCityForm addCity={this.addCity}/>: <h4>You've hit the maximum number of cities! Why don't you delete one?</h4>}
      </div>
    );
  }
});

function getWeather(city, ref){

    /**
        Please, don't use jQuery to fetch data.
    */
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    dataType: 'jsonp',
    data: {q: city.name, units: 'metric'},
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'getWeather',
    success: function(result){

      var cities = this.state.cities;
      var weather = result.weather[0];
      var d = new Date();

      /**
        Please, don't mutate data.
        If you want to mutate, please parse data inside model (or use flux pattern)
        (in that case when you will have issues with data structure you will exactly know the place where it happened)
      */
      var cityWeather = {
        description: weather.description,
        icon: weather.icon,
        date: d.toString(),
        temp: Math.floor(result.main.temp)
      }

      _.extend(city, cityWeather)

      cities.push(city);

      /**
        Use bind instead of passing ref to the function.
      */
      ref.setState({cities: cities})
    }.bind(ref)
  })
}


/**
    All the same here.
*/
function updateWeather(city, ref){
  var update = React.addons.update,
      cities = ref.state.cities,
      cityIndex;

  for( i = 0; i < cities.length; i++ ){
    if(city.name === cities[i].name){
      cityIndex = i;
    }
  }

  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    dataType: 'jsonp',
    data: {q: city.name, units: 'metric'},
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'update',
    success: function(result){
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
    }
  })
}


React.render(
  <WeatherApp />,
  mountNode
);
