const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

const path = require('path')
const webpack = require('webpack')

const appData = require("./data.json");
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;
// __dirname 表示的是项目的目录
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    //publicPath: process.env.NODE_ENV === "production" ? "/vue-cube-master-template" : "/",
    //基本路径
    publicPath: "/",
    //输出文件目录
    outputDir: "mall",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    //assetsDir: "static",
    //以多页模式构建应用程序。
    pages: undefined,
    //是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
    parallel: require("os").cpus().length > 1,
    //生产环境是否生成 sourceMap 文件，一般情况不建议打开
    productionSourceMap: false,
    configureWebpack: (config) => {
        config.plugins.push(new SkeletonWebpackPlugin({
            webpackConfig: {
                entry: {
                    app: path.join(__dirname, './src/components/v-skeleton/skeleton.js')
                }
            },
            minimize: true,
            quiet: true
        }))
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        //extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // 启用 CSS modules for all css / pre-processor files.
        modules: false,
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': [
                    './src/theme'
                ]
            }
        }
    },
    devServer: {
        host: 'localhost',
        host: '0.0.0.0', //host
        port: 8090, // 端口号
        open: true, //配置自动启动浏览器
        hotOnly: true, // 热更新
        // proxy: {
        //     "/api": {
        //         //axios的配置：当遇到apis时替换成为target内的内容
        //         target: "http://192.168.1.117:9002", // target host
        //         //ws: true, // proxy websockets
        //         changeOrigin: true, // needed for virtual hosted sites
        //         // pathRewrite: {
        //         //     "^/apis": "" // rewrite path
        //         // }
        //     }
        // },
        before(app) {
            app.get("/api/seller", (req, res) => {
                    res.json({
                        errno: 0,
                        data: seller
                    });
                }),
                app.get("/api/goods", (req, res) => {
                    res.json({
                        errno: 0,
                        data: goods
                    });
                }),
                app.get("/api/ratings", (req, res) => {
                    res.json({
                        errno: 0,
                        data: ratings
                    });
                });
                //获取分类页的分类接口
                app.get('/api/classify', (req, res) => {
                    switch (req.query.type) {
                        case '0':
                            res.json({
                                data: [{
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                                        label: '华为'
                                    },
                                    {
                                        image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                                        label: '荣耀'
                                    },
                                    {
                                        image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                                        label: '雪梨手机'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                                        label: '华为'
                                    },
                                    {
                                        image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                                        label: '荣耀'
                                    },
                                    {
                                        image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                                        label: '雪梨手机'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                                        label: '华为'
                                    },
                                    {
                                        image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                                        label: '荣耀'
                                    },
                                    {
                                        image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                                        label: '雪梨手机'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                                        label: '华为'
                                    },
                                    {
                                        image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                                        label: '荣耀'
                                    },
                                    {
                                        image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                                        label: '雪梨手机'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                                        label: '华为'
                                    },
                                    {
                                        image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                                        label: '荣耀'
                                    },
                                    {
                                        image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                                        label: '雪梨手机'
                                    },

                                ]
                            });
                            break;
                        case '1':
                            res.json({
                                data: [{
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                ]
                            });
                            break;
                        case '2':
                            res.json({
                                data: [{
                                        image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                                        label: '华为'
                                    },
                                    {
                                        image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                                        label: '华为'
                                    },
                                    {
                                        image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                                        label: '华为'
                                    },
                                    {
                                        image: '//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                                        label: '华为'
                                    }
                                ]
                            });
                            break;
                        case '3':
                            res.json({
                                data: [{
                                        image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                                        label: '荣耀'
                                    },
                                    {
                                        image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                                        label: '荣耀'
                                    },
                                    {
                                        image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                                        label: '荣耀'
                                    },
                                    {
                                        image: '//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                                        label: '荣耀'
                                    },
                                ]
                            });
                            break;
                        case '4':
                            res.json({
                                data: [{
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                ]
                            });
                            break;
                        case '5':
                            res.json({
                                data: [{
                                        image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                                        label: '雪梨手机'
                                    },
                                    {
                                        image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                                        label: '雪梨手机'
                                    },
                                    {
                                        image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                                        label: '雪梨手机'
                                    },
                                    {
                                        image: '//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                                        label: '雪梨手机'
                                    },
                                ]
                            });
                            break;
                        case '6':
                            res.json({
                                data: [{
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                    {
                                        image: '//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                                        label: '小米'
                                    },
                                ]
                            });
                            break;
                    }
                });
        }
    },
    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: true
        }
    },
    // 配置webpack目录别名
    chainWebpack(config) {
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('router', resolve('src/router'))
            .set('api', resolve('src/api'))
            .set('common', resolve('src/common'))
            .set('config', resolve('src/config'))
        config.plugin('context')
            .use(webpack.ContextReplacementPlugin,
                [/moment[\/\\]locale$/, /zh-cn/])
    }
}
