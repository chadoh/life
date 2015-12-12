import Immutable from 'immutable'

export default {
  map(props, propName, componentName) {
    if(props[propName] && !Immutable.Map.isMap(props[propName]))
      return new Error(`${componentName} expected '${propName}' prop to be an Immutable.Map!`)
  },
  requiredMap(props, propName, componentName) {
    if(!Immutable.Map.isMap(props[propName]))
      return new Error(`${componentName} expected '${propName}' prop to be an Immutable.Map!`)
  },
}
