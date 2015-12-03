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
    this.scrollTo()
  }

  componentWillReceiveProps () {
    this.setState({animate: true})
  }

  componentDidUpdate() {
    if (this.state.animate) {
      this.animate()
      this.setState({animate: false})
    }
  }

  scrollTo() {
    setTimeout(() => {
      window.scroll(0, this.refs.top.offsetTop - 140)
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
