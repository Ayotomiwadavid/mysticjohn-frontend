const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ARCH_CONFIG = `
import parser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    // Block 1: Landing components cannot import dashboard components
    ignores: [
        "app/dashboard/**/*",
        "components/dashboard/**/*",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/dashboard/*", "**/components/dashboard/*"],
              message: "Landing components cannot import dashboard components. Keep landing and dashboard areas separate.",
            },
          ],
        },
      ],
    },
  },
  {
    // Block 2: Dashboard components cannot import landing components
    files: [
        "app/dashboard/**/*",
        "components/dashboard/**/*",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/landing/*", "**/components/landing/*"],
              message: "Dashboard components cannot import landing components. Keep landing and dashboard areas separate.",
            },
          ],
        },
      ],
    },
  },
];
`;

const configPath = path.join(__dirname, 'temp-arch-lint.config.mjs');

function cleanup() {
    if (fs.existsSync(configPath)) {
        fs.unlinkSync(configPath);
    }
}

try {
    console.log('--- Running Project Architecture Tests ---');

    // Write temporary config
    fs.writeFileSync(configPath, ARCH_CONFIG);

    console.log('Scanning app, components, and lib directories for architectural violations...');

    // Run ESLint and capture output
    const cmd = `npx eslint -c "${configPath}" app components lib --format json`;
    let output;
    try {
        output = execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    } catch (e) {
        output = e.stdout;
    }

    const results = JSON.parse(output);
    const archViolations = results.flatMap(file =>
        file.messages.filter(msg => msg.ruleId === 'no-restricted-imports')
            .map(msg => ({
                file: file.filePath,
                line: msg.line,
                message: msg.message
            }))
    );

    if (archViolations.length > 0) {
        console.error('\\n❌ Architecture tests failed! Found violations:');
        archViolations.forEach(v => {
            console.error(`- ${path.relative(process.cwd(), v.file)}:${v.line}: ${v.message}`);
        });
        process.exit(1);
    } else {
        console.log('\\n✅ Architecture tests passed! No structural violations found.');
        process.exit(0);
    }
} catch (error) {
    console.error('\\n❌ Error running architecture tests:', error.message);
    process.exit(1);
} finally {
    cleanup();
}
