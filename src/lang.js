import idiom from 'idiom.js'

const lang = idiom({
  'default': {
    'welcome': 'Test'
  }
})

export default lang(window.navigator.language)
