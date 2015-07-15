import React from 'react';
import ReactMixin from 'react-mixin';

export default class LifeLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dots: 0 };
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
      dots.push(<span className="past" key={i}>●</span>)
    }
    return (
      <div>
        <p>Each dot represents a week.</p>
        <div className="life">
          {dots}
        </div>
      </div>
    );
  }
}

ReactMixin(LifeLoading.prototype, React.addons.PureRenderMixin);
