module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Code style (formatting, etc)
        "refactor", // Code refactoring
        "perf", // Performance improvements
        "test", // Testing
        "chore", // Build process or auxiliary tools
        "revert", // Revert a commit
        "ci", // CI/CD changes
      ],
    ],
    "subject-case": [2, "always", "lower-case"],
    "subject-max-length": [2, "always", 100],
  },
};
