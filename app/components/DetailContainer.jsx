import React from 'react'

export default class DetailContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animate: false,
      height: this.props.old ? 'auto' : 0,
    }
  }

  componentDidMount () {
    this.animate()
    this.scrollToTop()
  }

  componentWillReceiveProps () {
    this.setState({animate: true})
  }

  componentDidUpdate() {
    if (this.state.animate) {
      this.animate()
      this.setState({animate: false})
    }
    this.scrollToTop()
  }

  scrollTo(y, n, ms, ease) {
    let offset = window.scrollY,
      steps = n || 7,
      i = steps,
      time = ms || 250,
      ydiff = y - offset,
      fx = ease ? ease : (i, steps) => {
        return Math.pow(2, i);
      };

    let scrollInterval = setInterval(() => {
      i -= 1;
      var divisor = fx(i, steps);

      window.scroll(0, ydiff / divisor + offset);

      // last step
      if (0 === i) {
        clearInterval(scrollInterval);
        window.scroll(0, y);
      }
    }, time / steps);
  }

  scrollToTop() {
    setTimeout(() => {
      this.scrollTo(this.refs.top.offsetTop - 140)
    },10)
  }

  animate () {
    const height = this.refs.container.offsetHeight
    this.setState({height}, () => {
      if (this.props.old) {
        this.setState({height: 0})
      }
    })
  }

  render() {
    const styles = {
      height: this.state.height,
      transition: 'height 500ms ease',
      overflow: 'hidden',
    }
    return (
      <div className="detail" style={styles} ref="top">
        {React.cloneElement(this.props.children, {ref: "container"})}
      </div>
    )
  }
}
