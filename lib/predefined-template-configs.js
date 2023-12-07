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
	child: {
		defaultValues: {},
		themeTemplatePath: join(
			__dirname,
			'../',
			'templates',
			'child',
			'theme'
		),
		themeAssetsPath: join(
			__dirname,
			'../',
			'templates',
			'child',
			'assets'
		),
		blueprints: {},
	},
};
module.exports = predefinedTemplateConfigs;
