/** @jsx React.DOM */

var React = window.React = require('react'),
    Timer = require("./ui/Timer"),
    TodoList = require("./ui/TodoList"),
    MyModal = require("./ui/AddCityModal"),
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
        }],
    }
  },
  render: function() {

    return (
      <div className="text-center">
      {this.state.cities.map(function(item, i){
      return <City data={item} cities={this.state.cities.length} key={i} />
      }, this)}
          <div className="center col-lg-12">
            <ModalTrigger modal={<MyModal />} className="text-center center">
              <Button bsStyle="primary" className="text-center center">Add A City</Button>
            </ModalTrigger>
          </div>
      </div>
    );
  }
});

React.render(
  <WeatherApp />,
  mountNode
);
