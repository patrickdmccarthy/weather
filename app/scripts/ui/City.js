var React = require('react');

var City = React.createClass({
  propTypes:{
    cities: React.PropTypes.number.isRequired,
    data: React.PropTypes.object.isRequired
    },
  getInitialState: function(){
    // console.log(this.props.data)
    return {
      showRemove: false,
      weather: [],
      }
  },
  componentWillMount: function(){

    getWeather(this.props.data.name, this);

  },
  componentDidMount: function(){
    var interval = this.props.data.interval;

    setInterval(function(){
        getWeather(this.props.data.name, this);
    }.bind(this), interval)
  },
  enableShowRemove: function(e){
    this.state.showRemove = true;
    console.log('entering', this.state.showRemove);
  },
  disableShowRemove: function(e){
    this.state.showRemove = false;
    console.log('leaving', this.showRemove);
  },
  render: function() {
    return <div className={'text-center col-lg-' + 12/this.props.cities}  onMouseEnter={this.enableShowRemove}  >
            <h2>{this.state.weather.city}</h2>
            <p className="lead">{this.state.weather.description}</p>
            <img src={"http://openweathermap.org/img/w/" + this.state.weather.icon +".png"}/>
            <p className="lead"><strong>{this.state.weather.temp}C</strong></p>
            <p><small>Last updated {this.state.weather.date}</small></p>

            <a onClick={this.disableShowRemove}><p><small>Remove City</small></p></a>
        </div>;
  }
});

function getWeather(city, ref){
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric', function(result) {
    var weather = result.weather[0];
    var d = new Date();

    ref.setState({
     weather: {
        description: weather.description,
        icon: weather.icon,
        city: result.name,
        date: d.toString(),
        temp: Math.floor(result.main.temp)
      }
    })
  }.bind(ref))
}

module.exports = City;