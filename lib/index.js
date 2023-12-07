/**
 * External dependencies
 */
const { program } = require( 'commander' );
/**
 * Internal dependencies
 */
const log = require( './log' );
const { options } = require( './options' );
const { version } = require( '../package.json' );
const runTool = require( './run-tool' );

const commandName = 'wp-create-theme';
program
	.name( 'wp-create-theme' )
	.description( 'CLI tool to create a WordPress block theme.' )
	.version( version )
	.arguments( '[slug]' )
	.action( async ( ...args ) => {
		runTool( ...args );
	} )
	.on( '--help', () => {
		log.info( '' );
		log.info( 'Examples:' );
		log.info( `  $ ${ commandName }` );
		log.info( `  $ ${ commandName } my-theme` );
		log.info(
			`  $ ${ commandName } my-theme --child-of twentytwentyfour `
		);
	} );

// Add the option flags for the main command
options.forEach( ( option ) => {
	program.option( option.option, option.description, option.default );
} );

// Add a subcommand for adding new items?
// program.command("add <type> [name]").action(function (type, name) {
//   console.log(type, name);
// });

program.parse( process.argv );
