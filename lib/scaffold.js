/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
const { info } = require( './log' );
const { writeOutputTemplate, writeOutputAsset } = require( './output' );

module.exports = async ( themeTemplate, data ) => {
	const { themeOutputTemplates, themeOutputAssets } = themeTemplate;

	// console.log(data);
	const view = {
		...data,
	};

	info( '' );
	info( `Creating a new block-theme in the ${ view.slug } directory.` );

	// Output the theme files.
	await Promise.all(
		Object.keys( themeOutputTemplates ).map(
			async ( outputFile ) =>
				await writeOutputTemplate(
					themeOutputTemplates[ outputFile ],
					outputFile,
					view
				)
		)
	);

	// Output the static assets
	await Promise.all(
		Object.keys( themeOutputAssets ).map(
			async ( outputFile ) =>
				await writeOutputAsset(
					themeOutputAssets[ outputFile ],
					outputFile,
					view
				)
		)
	);
};
