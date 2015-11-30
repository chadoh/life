import alt from '../lib/alt'
import ResizeActions from '../actions/ResizeActions'

const isMobileWidth = () => window.innerWidth < 700;

class IsMobileStore {
  constructor() {
    this.bindActions(ResizeActions)
    this.state = {
      isMobile: isMobileWidth()
    }
  }

  resize() {
    this.setState({isMobile: isMobileWidth()})
  }
}

export default alt.createStore(IsMobileStore, 'IsMobileStore')
