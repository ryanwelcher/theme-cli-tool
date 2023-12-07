/**
 * Internal dependencies
 */
const CLIError = require("./cli-error");
const log = require("./log");
const { getTemplate } = require("./templates");

/**
 * Run the tool with the given slug and options.
 * @param {string} slug
 * @param {object} options
 */
async function runTool(slug, options) {
  console.log("Running the tool", slug, options);
  const { template } = options;
  try {
    if (slug) {
      const themeTemplate = await getTemplate(template);
      console.log(themeTemplate);
    } else {
      // No interactive mode yet.
      throw new CLIError(
        `Please provide a slug for the theme. e.g. wp-create-theme my-theme`
      );
    }
  } catch (error) {
    if (error instanceof CLIError) {
      log.error(error.message);
      process.exit(1);
    } else {
      throw error;
    }
  }
}

module.exports = runTool;
