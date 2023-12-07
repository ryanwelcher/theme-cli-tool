/**
 * External dependencies
 */
const glob = require("fast-glob");
const { join } = require("path");
const { mkdtemp, readFile } = require("fs").promises;
/**
 * Internal dependencies
 */
const predefinedPluginTemplates = require("./predefined-template-configs");
const CLIError = require("./cli-error");

/**
 * Generate the default values based on the chosen template
 * @param {*} pluginTemplate
 * @param {*} variant
 * @returns
 */
const getDefaultValues = (template, variant) => {
  return {
    license: "GPL-2.0-or-later",
    licenseURI: "https://www.gnu.org/licenses/gpl-2.0.html",
    version: "1.0.0",
    testedUpTo: "6.4",
    requiresAtLeast: "6.4",
    requiresPHP: "7.4",
    transformer: (view) => view,
    ...template.defaultValues,
    ...template.variants?.[variant],
    // variantVars: getVariantVars(template.variants, variant),
  };
};

/**
 * Retrieve the template values for the passed theme template.
 * @param {*} templateName
 * @returns
 */
const getTemplate = async (templateName) => {
  try {
    if (predefinedPluginTemplates[templateName]) {
      return await configToTemplate(predefinedPluginTemplates[templateName]);
    } else {
      throw new CLIError(`template does not exist`);
    }
  } catch (error) {
    throw new CLIError("1" + error);
  }
};

/**
 * Generate files
 * @param {} outputTemplatesPath
 * @returns
 */
const getOutputTemplates = async (outputTemplatesPath) => {
  console.log(outputTemplatesPath, "outputTemplatesPath");
  const outputTemplatesFiles = await glob("**/*.mustache", {
    cwd: outputTemplatesPath,
    dot: true,
  });
  return Object.fromEntries(
    await Promise.all(
      outputTemplatesFiles.map(async (outputTemplateFile) => {
        const outputFile = outputTemplateFile.replace(/\.mustache$/, "");
        const outputTemplate = await readFile(
          join(outputTemplatesPath, outputTemplateFile),
          "utf8"
        );
        return [outputFile, outputTemplate];
      })
    )
  );
};

/**
 * Generate the template based on the config
 * @param {*} config
 */
const configToTemplate = async (config) => {
  const { defaultValues, themeTemplatePath, variants } = config;
  if (defaultValues === null || typeof defaultValues !== "object") {
    throw new CLIError("Template found but invalid definition provided.");
  }
  // Paths to define where to find the templates.
  //   themeTemplatePath = themeTemplatePath || join(__dirname, "templates");
  //   blockTemplatesPath = blockTemplatesPath || join(__dirname, "templates");

  return {
    themeOutputTemplates: themeTemplatePath
      ? await getOutputTemplates(themeTemplatePath)
      : {},
    // themeOutputAssets: assetsPath ? await getOutputAssets(assetsPath) : {},
    defaultValues,
    variants,
  };
};

module.exports = {
  getTemplate,
  getDefaultValues,
};
