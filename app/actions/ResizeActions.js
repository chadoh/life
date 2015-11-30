import alt from '../lib/alt';

class ResizeActions {
  constructor() {
    this.generateActions('resize')
  }
}

export default alt.createActions(ResizeActions)
