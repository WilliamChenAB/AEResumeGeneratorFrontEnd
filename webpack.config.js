const path = require('path');
const webpack = require('webpack');

module.exports = (_env, argv) => {
	const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

	const mode = argv.mode;
	const isProduction = mode === 'production';

	return {
		mode: mode,
		entry: './src/index.js',
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							plugins: [!isProduction && require('react-refresh/babel')].filter(Boolean),
						},
					},
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
			]
		},
		resolve: { extensions: ['*', '.js', '.jsx'] },
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/dist/',
			clean: true,
		},
		devServer: {
			static: {
				directory: './public',
			},
			port: 3000,
			hot: true,
		},
		plugins: [!isProduction && new ReactRefreshWebpackPlugin()].filter(Boolean),
	};
};