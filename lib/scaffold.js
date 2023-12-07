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

	const view = {
		currentYear: new Date().getFullYear(),
		...data,
	};

	console.log( 'view', view );

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
