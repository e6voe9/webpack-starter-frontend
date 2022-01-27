const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	stats: 'all',
	bail: true,
	output: {
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].js',
	},
	plugins: [
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new MiniCssExtractPlugin({
			filename: 'css/index.css',
		}),
	],
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.s?css/i,
				use: [MiniCssExtractPlugin.loader, {
					loader: 'css-loader',
					options: {
						importLoaders: 2,
						import: true,
						url: false
					}
				}, 'postcss-loader', 'sass-loader'],
			},

		],
	},
});