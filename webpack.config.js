
var path = require("path");

var config = {
	/**
	 * app.ts represents the entry point to your web application. Webpack will
	 * recursively go through every "require" statement in app.ts and
	 * efficiently build out the application's dependency tree.
	 */
	entry: ["./src/app.tsx"],

	/**
	 * The combination of path and filename tells Webpack what name to give to
	 * the final bundled JavaScript file and where to store this file.
	 */
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js",
		sourceMapFilename: 'bundle.map'
	},

	/**
	 * Loads source map, allows debugging in chrome to show the TypeScript file, 
	 * not just the generated JavaScript.
	 */
		devtool: 'source-map',

	/**
	 * Resolve lets Webpack know in advance what file extensions you plan on
	 * "require"ing into the web application, and allows you to drop them
	 * in your code.
	 */
	resolve: {
		extensions: ["", ".ts", ".tsx", ".js", ".jsx"]
	},

	module: {
		/**
		 * Each loader needs an associated Regex test that goes through each
		 * of the files you've included (or in this case, all files but the
		 * ones in the excluded directories) and finds all files that pass
		 * the test (.ts and .tsx). Then it will apply the loader to that file.
		 */
		loaders: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/
			}
		]
	}
};

module.exports = config;