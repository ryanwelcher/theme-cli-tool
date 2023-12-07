/**
 * External dependencies
 */
const { capitalCase } = require("change-case");

/**
 * Internal dependencies
 */
const CLIError = require("./cli-error");
const log = require("./log");
const { getTemplate, getDefaultValues } = require("./templates");
const scaffold = require("./scaffold");

/**
 * Run the tool with the given slug and options.
 * @param {string} slug
 * @param {object} options
 */
async function runTool(slug, options) {
  const { authorName, childOf, template, variant } = options;
  try {
    if (slug) {
      // Get the themeTemplate options.
      const themeTemplate = await getTemplate(template);

      const defaultValues = getDefaultValues(themeTemplate, variant);

      const optionsValues = Object.fromEntries(
        Object.entries({
          authorName,
          childOf,
        }).filter(([, value]) => value !== undefined)
      );

      const answers = {
        ...defaultValues,
        slug,
        // Transforms slug to title as a fallback.
        themeName: capitalCase(slug),
        ...optionsValues,
      };

      // Ready to scaffold!
      await scaffold(themeTemplate, answers);
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
