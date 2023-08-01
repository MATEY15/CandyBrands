const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const fs = require("fs");
const glob = require("glob")

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

// const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const filename = (ext) => isDev ? `[name].${ext}` : `[name].${ext}`;

const PATHS = {
    src: path.resolve(__dirname, './src'),
};
const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.njk'));

let getFiles = function (dir, files_, extension) {
    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    let regular = new RegExp('.\\.' + extension + '$');

    for (let i in files) {

        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_, extension);
        } else if (regular.test(name)) {
            files_.push(name);
        }

    }
    return files_;
};

// Js
let jsEntryArray = [path.resolve(__dirname, './src/js/main.js')];
getFiles(path.resolve(__dirname, './src/blocks'), jsEntryArray, 'js');

// Css
let styleEntryArray = [];
getFiles(path.resolve(__dirname, './src/blocks'), styleEntryArray, 'scss');
getFiles(path.resolve(__dirname, './src/blocks'), styleEntryArray, 'css');

let fullFiles = jsEntryArray.concat(styleEntryArray)
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    // entry: './js/main.js',
    entry: {
        main: fullFiles,
    },
    output: {
        filename: `js/${filename('js')}`,
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        assetModuleFilename: (pathData) => {
            const filepath = path
                .dirname(pathData.filename)
                .split("/")
                .slice(1)
                .join("/")
            return `${filepath}/[name][ext][query]?[hash:8]`;
        },
    },
    resolve: {
        // Для указания путей
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@pathSquare': path.resolve(__dirname, './'),
        }
    },
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /\/katalog/, to: '/katalog.html' },
            ]
        },
        static: {
            directory: path.join(__dirname, "build")
        },
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins: [
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            minify: false,
            filename: `./${page.replace(/\.njk/, '.html')}`,
            scriptLoading: "blocking"
        })),
        // Folder page
        // new HtmlWebpackPlugin({
        //     template: `${PAGES_DIR}/download/images.njk`,
        //     minify: false,
        //     filename: `download/images.html`,
        //     scriptLoading: "blocking",
        // }),

        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `css/${filename('css')}`,
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'static'), to: path.resolve(__dirname, 'build') },
                { from: path.resolve(__dirname, 'src/php'), to: path.resolve(__dirname, 'build/php') },
                // { from: path.resolve(__dirname, 'src/img/download'), to: path.resolve(__dirname, 'build/img/download') },
                // { from: path.resolve(__dirname, 'src/pages/download/.htaccess'), to: path.resolve(__dirname, 'build/download') },
            ],
        }),
    ],
    devtool: isProd ? false : 'source-map',
    module: {
        rules: [
            {
                test: /\.html$|njk|nunjucks/,
                use: [
                    'html-loader',
                    {
                        loader: 'nunjucks-html-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev
                        }
                    },
                    {
                        loader: 'css-loader',
                    }
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                // return path.relative(path.dirname(resourcePath), context) + '/';
                                if(isProd)
                                    return "../"
                                else
                                    return "../../"
                            }
                        }
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // All postcss options is now under `postcssOptions`
                            postcssOptions: {
                                config: path.resolve(__dirname, 'postcss.config.js'),
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(?:|png|jpe?g|gif|webp|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext]',
                },
            },
        ],
    },
}
