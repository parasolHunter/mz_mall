module.exports = {
  plugins: {
    //autoprefixer: {},
    'postcss-design-convert': {
      multiple: 2,
      units: ['px'],
      selector: /^\.cube-/
    },
    'postcss-px2rem': {
      remUnit: 75
    }
  }
}
