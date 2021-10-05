module.exports = {
  // run tsc on changes to TypeScript files
  "*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  "*.{js,ts,json}": ["eslint --fix --cache", "prettier --write"],
  // optional: disable prettier for html files (via removing next line)
  "*.html": ["prettier --write"],
};
