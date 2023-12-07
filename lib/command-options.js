const options = [
	{
		option: '--child-of <theme-slug>',
		description: 'Create a child theme of the specified theme',
		default: '',
	},
	{
		option: '--author-name <name>',
		description: "The Author name to use in the theme's style.css file",
		default: '',
	},
	{
		option: '-t, --template <name>',
		description:
			'project template type name; allowed values: "default", "child:, the name of an external npm package, or the path to a local directory',
		default: 'default',
	},
	{
		option: '-d, --description <description>',
		description: 'The description of the theme',
		default: '',
	},
	{
		option: '--tags <tags>',
		description: 'The tags of the theme comma separated; "One, two, three"',
		default: '',
	},
];
module.exports = {
	options,
};
