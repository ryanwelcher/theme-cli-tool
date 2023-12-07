/**
 * External dependencies
 */
const { pascalCase, snakeCase } = require("change-case");

/**
 * Internal dependencies
 */
const { code, info, success, error } = require("./log");
const { writeOutputAsset, writeOutputTemplate } = require("./output");

module.exports = async (themeTemplate, data) => {
  const { themeOutputTemplates } = themeTemplate;

  console.log(data);
  const view = {
    ...data,
  };
  await Promise.all(
    Object.keys(themeOutputTemplates).map(
      async (outputFile) =>
        await writeOutputTemplate(
          themeOutputTemplates[outputFile],
          outputFile,
          view
        )
    )
  );
};
