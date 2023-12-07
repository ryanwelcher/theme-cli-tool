/**
 * External dependencies
 */
const { program } = require("commander");
/**
 * Internal dependencies
 */
const log = require("./log");
const { options } = require("./options");
const { version } = require("../package.json");
const runTool = require("./runTool");

const commandName = "wp-create-theme";
program
  .name("string-util")
  .description("CLI to some JavaScript string utilities")
  .version(version)
  .arguments("[slug]")
  .action(async (...args) => {
    runTool(...args);
  })
  .on("--help", () => {
    log.info("");
    log.info("Examples:");
    log.info(`  $ ${commandName}`);
    log.info(`  $ ${commandName} todo-list`);
    log.info(`  $ ${commandName} todo-list --child-of twentytwentyfour `);
  });

// Add the options.
options.map((option) => {
  program.option(option.option, option.description);
});

program.parse(process.argv);
