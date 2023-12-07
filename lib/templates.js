/**
 * External dependencies
 */
const glob = require( 'fast-glob' );
const { join } = require( 'path' );
const { readFile } = require( 'fs' ).promises;
/**
 * Internal dependencies
 */
const predefinedPluginTemplates = require( './predefined-template-configs' );
const CLIError = require( './cli-error' );

/**
 * Generate the default values based on the chosen template
 * @param {Object} template
 * @param {string} variant
 * @return
 */
const getDefaultValues = ( template, variant ) => {
	return {
		license: 'GPL-2.0-or-later',
		licenseURI: 'https://www.gnu.org/licenses/gpl-2.0.html',
		version: '1.0.0',
		description: 'A WordPress theme',
		tags: 'full-site-editing, block-templates, block-patterns',
		testedUpTo: '6.4',
		requiresAtLeast: '6.4',
		requiresPHP: '7.4',
		transformer: ( view ) => view,
		...template.defaultValues,
		...template.variants?.[ variant ],
		// variantVars: getVariantVars(template.variants, variant),
	};
};

/**
 * Retrieve the template values for the passed theme template.
 * @param {*} templateName
 * @return
 */
const getTemplate = async ( templateName ) => {
	try {
		if ( predefinedPluginTemplates[ templateName ] ) {
			return await configToTemplate(
				predefinedPluginTemplates[ templateName ]
			);
		}

		throw new CLIError( `template does not exist` );
	} catch ( error ) {
		throw new CLIError( '1' + error );
	}
};

/**
 * Generate files
 * @param {} outputTemplatesPath
 * @return
 */
const getOutputTemplates = async ( outputTemplatesPath ) => {
	const outputTemplatesFiles = await glob( '**/*.mustache', {
		cwd: outputTemplatesPath,
		dot: true,
	} );
	return Object.fromEntries(
		await Promise.all(
			outputTemplatesFiles.map( async ( outputTemplateFile ) => {
				const outputFile = outputTemplateFile.replace(
					/\.mustache$/,
					''
				);
				const outputTemplate = await readFile(
					join( outputTemplatesPath, outputTemplateFile ),
					'utf8'
				);
				return [ outputFile, outputTemplate ];
			} )
		)
	);
};

const getOutputAssets = async ( outputAssetsPath ) => {
	const outputAssetFiles = await glob( '**/*', {
		cwd: outputAssetsPath,
		dot: true,
	} );
	return Object.fromEntries(
		await Promise.all(
			outputAssetFiles.map( async ( outputAssetFile ) => {
				const outputAsset = await readFile(
					join( outputAssetsPath, outputAssetFile )
				);
				return [ outputAssetFile, outputAsset ];
			} )
		)
	);
};

/**
 * Generate the template based on the config
 * @param {*} config
 * @return Object
 */
const configToTemplate = async ( config ) => {
	const { defaultValues, themeTemplatePath, themeAssetsPath, variants } =
		config;
	if ( defaultValues === null || typeof defaultValues !== 'object' ) {
		throw new CLIError( 'Template found but invalid definition provided.' );
	}
	// Paths to define where to find the templates.
	//   themeTemplatePath = themeTemplatePath || join(__dirname, "templates");
	//   blockTemplatesPath = blockTemplatesPath || join(__dirname, "templates");

	return {
		themeOutputTemplates: themeTemplatePath
			? await getOutputTemplates( themeTemplatePath )
			: {},
		themeOutputAssets: themeAssetsPath
			? await getOutputAssets( themeAssetsPath )
			: {},
		defaultValues,
		variants,
	};
};

module.exports = {
	getTemplate,
	getDefaultValues,
};
