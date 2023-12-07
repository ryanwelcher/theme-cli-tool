const { join } = require("path");

const predefinedTemplateConfigs = {
  default: {
    defaultValues: {
      authorName: "Your Name",
      authorURI: "https://your-website.com",
      description: "A WordPress theme",
      slug: "my-theme",
      themeURI: "https://your-website.com/my-theme/",
      version: "1.0.0",
      tags: "full-site-editing, block-templates, block-patterns",
    },
    themeTemplatePath: join(__dirname, "../", "templates", "default", "theme"),
    blueprints: {},
  },
};
module.exports = predefinedTemplateConfigs;
