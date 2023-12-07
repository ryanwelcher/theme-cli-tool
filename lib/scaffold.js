/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
const { info } = require( './log' );
const { writeOutputTemplate } = require( './output' );

module.exports = async ( themeTemplate, data ) => {
	const { themeOutputTemplates } = themeTemplate;

	// console.log(data);
	const view = {
		...data,
	};

	info( '' );
	info( `Creating a new block-theme in the ${ view.slug } directory.` );

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
};
