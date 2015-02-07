/** @jsx React.DOM */

var React = window.React = require('react'),
    Timer = require("./ui/Timer"),
    TodoList = require("./ui/TodoList"),
    // MyModal = require("./ui/AddCityModal"),
    AddCityForm = require("./ui/AddCityForm"),
    City = require("./ui/City"),
    mountNode = document.getElementById("app"),
    Modal = require('react-bootstrap').Modal,
    Button = require('react-bootstrap').Button, 
    ModalTrigger = require('react-bootstrap').ModalTrigger


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
        // },
        // {
        // name: 'New York',
        // interval: 10000
        // },
        // {
        // name: 'Berlin',
        // interval: 15000
        // },
        // {
        // name: 'New York',
        // interval: 10000
        // },
        // {
        // name: 'Berlin',
        // interval: 15000
        }

        ],
    }
  },
  addCity: function(){
    // var newCity = {
    //   name: name,
    //   interval: interval
    // }
    console.log('ji')

  },
  removeCity: function(i){
    var remaining = this.state.cities.filter(function(city){
        return this.state.cities.indexOf(city) !== i;
    }, this);
    console.log(remaining)
    this.setState({cities: remaining});

  },
  render: function() {

    return (
      <div className="text-center clearfix">
        <div className="city clearfix">
        {this.state.cities.map(function(item, i){
        return <City data={item} cities={this.state.cities.length} index={i} key={i} remove={this.removeCity} ref={'item' + i} />
        }, this)}
        </div>
        <AddCityForm addCity={this.addCity}/>
      </div>
    );
  }
});

React.render(
  <WeatherApp />,
  mountNode
);
