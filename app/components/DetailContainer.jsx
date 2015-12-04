import React from 'react'

let scrollTimers = [];

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

  scrollToTop() {
    if(this.props.old) return;
    if(scrollTimers[0]) clearTimeout(scrollTimers[0]);

    scrollTimers.push(
      setTimeout(() => this.scrollTo(this.refs.top.offsetTop - 115), 100)
    )
  }

  scrollTo(to) {
    if(this.alreadyVisible()) return;

    window.scroll(0, to)
  }

  alreadyVisible() {
    return this.refs.top.offsetTop > document.body.scrollTop &&
      this.refs.top.offsetTop < document.body.scrollTop + window.innerHeight
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
