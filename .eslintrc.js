module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 缩进是否检查
        "indent": [2, 4, {
            "SwitchCase": 1
        }],
        'no-trailing-spaces': 0,
        'eol-last': 0,
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
