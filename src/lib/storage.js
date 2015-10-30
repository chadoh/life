export default (storage = localStorage) => {
  return {
    get: k => {
      try {
        return JSON.parse(storage.getItem(k))
      }
      catch(e) {
        return null
      }
    },
    set: (k, v) => {
      storage.setItem(k, JSON.stringify(v))
    }
  }
}
