const options = [
  {
    option: "-c, --child-of <theme-slug>",
    description: "Create a child theme of the specified theme",
    default: "",
  },
  {
    option: "-a, --author-name <name>",
    description: "The Author name to use in the theme's style.css file",
    default: "",
  },
  {
    option: "-t, --template <name>",
    description:
      'project template type name; allowed values: "default", the name of an external npm package, or the path to a local directory',
    default: "default",
  },
];
module.exports = {
  options,
};
