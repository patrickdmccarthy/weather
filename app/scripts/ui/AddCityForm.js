var React = require('react'),
    Input = require('react-bootstrap').Input,
    Button = require('react-bootstrap').Button;


var AddCityForm = React.createClass({
  // getInitialState: function() {
  //   return {
  //     cities: [{
  //       name: 'New York',
  //       interval: 10000
  //       },
  //       {
  //       name: 'Berlin',
  //       interval: 15000
  //       }],
  //   }
  // },
  handleChange: function(field, e) {
    var nextState = {};
    nextState[field] = e.target.value;
    this.setState(nextState)
    console.log(this.state);

  },
  render: function() {
    return (
      <div className="center text-center">
        <form className="form-horizontal">
          <Input type="text" label="City" labelClassName="col-xs-4" wrapperClassName="col-xs-4" required={true} onChange={this.handleChange.bind(null, 'city')}/>
          <Input type="text" label="Refresh Interval" labelClassName="col-xs-4" wrapperClassName="col-xs-4" required={true} onChange={this.handleChange.bind(null, 'interval')}/>
        </form>

        <Button bsStyle="success" onClick={this.props.addCity}>Add City</Button>
      </div>
      );
  }
});


module.exports = AddCityForm;
