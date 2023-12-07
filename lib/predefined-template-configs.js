const { join } = require( 'path' );

const predefinedTemplateConfigs = {
	default: {
		defaultValues: {},
		themeTemplatePath: join(
			__dirname,
			'../',
			'templates',
			'default',
			'theme'
		),
		themeAssetsPath: join(
			__dirname,
			'../',
			'templates',
			'default',
			'assets'
		),
		blueprints: {},
	},
};
module.exports = predefinedTemplateConfigs;
