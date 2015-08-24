import React from 'react';
import ReactMixin from 'react-mixin';

export default class LifeLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dots: 1750 }; // ~1/3 of a life
  }

  componentDidMount() {
    this.dotIncrementer = setInterval(() => this.setState({dots: this.state.dots + 1}), 100)
  }

  componentWillUnmount() {
    clearInterval(this.dotIncrementer)
  }

  render() {
    var dots = [];
    for(var i = 0; i < this.state.dots; i++) {
      dots.push(<span key={i}>●</span>)
    }
    return (
      <div style={{clear: 'both'}}>
        <p>Each dot represents a week. Wait for it... (faster loading coming soon!)</p>
        <div className="life">
          {dots}
        </div>
      </div>
    );
  }
}

ReactMixin(LifeLoading.prototype, React.addons.PureRenderMixin);
