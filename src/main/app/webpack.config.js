'use strict';
var path = require('path');
var fs  = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var autoprefixer = require('autoprefixer');
var lessToJs = require('less-vars-to-js');

var themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

module.exports = function (env) {
    const isProduction = env && env.production === true;

    return {
        context: path.resolve(__dirname, "src"),
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
			publicPath: '/',
            filename: 'static/js/[name].[hash].js'
        },

        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src'),
                    loader: "eslint-loader",
                    options: {
                        failOnError: true,
                        fix: true
                    }
                },
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, 'src'),
                    loader: 'babel-loader',
                    query: {
                        babelrc: false,
                        presets: [require.resolve('babel-preset-react-app')],
                    },
                },
				{
					test: path.join(__dirname, '.'),
					exclude: /(node_modules|public)/,
					use: [{
						loader: 'babel-loader',
						options: {
							presets: ["@babel/preset-env", "@babel/preset-react"],
							plugins: [
							  ['import', { libraryName: "antd", style: true }]
							]
						}
					}]
				},
				{
					test: /\.less$/,
					use: [
						{loader: "style-loader"},
						{loader: "css-loader"},
						{loader: "less-loader",
							options: {
								modifyVars: themeVariables,
								javascriptEnabled: true
							}
						}
					]
				},
                {
                    test: /\.css$/,
                    loader: isProduction ?
                        ExtractTextPlugin.extract({ fallback: 'style-loader', use: [
                            {
                                loader: require.resolve('css-loader')
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9',
                                            ],
                                            flexbox: 'no-2009',
                                        }),
                                    ],
                                },
                            }
                        ] }) :
                        [ 'style-loader', 'css-loader', ]
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.svg$/,
                    loader: 'file-loader',
                    query: {
                        name: 'static/media/[name].[hash:8].[ext]'
                    }
                }
            ]
        },
        /**
         * plugin 是 webpack 完成各种复杂功能的核心
         * 比如，这里面用的 HtmlWebpackPlugin，即可将生成的 js，生成 script 标签插入到指定的 html 里
         * 又比如，ExtractTextPlugin 可以加 css 生成 link 插入
         * https://webpack.js.org/concepts/plugins/
         */
        plugins: [
            new InterpolateHtmlPlugin({
                PUBLIC_URL: '' // 用于替换 index.html 里面的 %PUBLIC_URL%
            }),
            new HtmlWebpackPlugin({
                inject: true,
                template: '../public/index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                }
            }),
            new ExtractTextPlugin('static/css/[name].[hash].css'),
            new webpack.HotModuleReplacementPlugin(), // 用于热加载
            // 可以替换代码中的变量
            // https://webpack.js.org/plugins/define-plugin/#use-case-service-urls
            new webpack.DefinePlugin({
                'SERVICE_URL': isProduction ?
                    JSON.stringify("http://pro.example.com") :
                    JSON.stringify("http://dev.example.com"),
                "process.env": {
                    NODE_ENV: isProduction ?
                        JSON.stringify("production") :
                        JSON.stringify("development")
                }
            })
        ],
        /**
         * webpack 自带的开发 server，配合 webpack-dev-server 命令使用
         * https://webpack.js.org/guides/development/#webpack-dev-server
         * https://webpack.js.org/configuration/dev-server/
         */
        devServer:{
            hot: true,
            contentBase: path.join(__dirname, "public"),
            compress: true,
            port: 9000,
            publicPath: '/',
            proxy: {
            '/api/**': {
                target: 'http://localhost:8082/',
                    pathRewrite: { '^/api': '/apis' },
                secure: false,
                    logLevel: 'debug'
            }
            }
        },
        // 为压缩以后的代码提供 source map 方便调试
        // https://webpack.js.org/configuration/devtool/
        devtool: isProduction ?
            'hidden-source-map' :
            'cheap-module-eval-source-map',
    };
}
