module.exports = {
    root: true,
    extends: '@react-native-community',
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'jsx-quotes': 'off',
                'no-shadow': 'off',
                'no-undef': 'off',
                'no-duplicate-imports': ['error', { includeExports: true }],
                'no-template-curly-in-string': 'warn',
                camelcase: ['error', { properties: 'always' }],
                'default-case': 'warn',
                'no-lone-blocks': 'error',
                'prefer-const': 'warn',
                yoda: 'error',
                '@typescript-eslint/consistent-type-definitions': 'off',
                '@typescript-eslint/method-signature-style': 'warn',
                '@typescript-eslint/naming-convention': [
                    'warn',
                    {
                        selector: 'function',
                        format: ['PascalCase', 'camelCase'],
                    },
                ], // avoid react component naming warning
                '@typescript-eslint/no-useless-empty-export': 'warn',
                'no-redeclare': 'off',
                '@typescript-eslint/no-redeclare': 'warn', // overwrite base no-redeclare eslint
                '@typescript-eslint/no-shadow': ['error', { hoist: 'all' }], // overwrite base no-shadow eslint
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': 'warn', // overwrite base no-unused-expressions eslint
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': 'warn', // overwrite base no-use-before-define eslint
                'react/boolean-prop-naming': [
                    'error',
                    { validateNested: true },
                ],
                'react/button-has-type': 'warn',
                'react/no-array-index-key': 'warn',
                'react/no-unstable-nested-components': 'warn',
                'react/no-unused-prop-types': 'warn',
                'react/no-unused-state': 'warn',
                'react/self-closing-comp': 'warn',
                'react/jsx-no-constructed-context-values': 'warn',
                'react/jsx-no-leaked-render': [
                    'warn',
                    { validStrategies: ['ternary', 'coerce'] },
                ],
                'react-native/no-unused-styles': 'warn',
            },
        },
    ],
};
