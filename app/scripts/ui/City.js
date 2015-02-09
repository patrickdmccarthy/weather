var React = require('react');

var City = React.createClass({
  propTypes:{
    cities: React.PropTypes.number.isRequired,
    data: React.PropTypes.object.isRequired
    },
  getInitialState: function(){

    return {}
  },
  componentWillMount: function(){


  },
  componentDidMount: function(){

  },
  componentWillUnmount: function(){
    clearInterval(this.refresh); 
  },
  enableShowRemove: function(e){
    this.setState({showRemove : true});
  },
  disableShowRemove: function(e){
    this.setState({showRemove : false});
  },
  render: function() {
    return (
      <div className={'text-center col-lg-' + Math.floor(12/this.props.cities)}  onMouseEnter={this.enableShowRemove} onMouseLeave={this.disableShowRemove} >
        <h2>{this.props.data.name}</h2>
        <p className="lead">{this.props.data.description}</p>
        <img src={"http://openweathermap.org/img/w/" + this.props.data.icon +".png"}/>
        <p className="lead"><strong>{this.props.data.temp}C</strong></p>
        <p><small>Last updated {this.props.data.date}</small></p>

        { this.state.showRemove ? <a onClick={this.props.remove.bind(null, this.props.index)}><p><small>Remove City</small></p></a> : ''}
      </div>
      );
  }
});



module.exports = City;