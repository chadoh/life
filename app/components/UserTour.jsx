import Tour from "react-tourist";

const tourItems = [{
  component: 'Life', ref: 'tour', content: 'Hello World!', getStyle: Tour.IndicatorStyles.pulse,
  getElement: refNode => refNode.children[0]
}]

export default new Tour(tourItems)
