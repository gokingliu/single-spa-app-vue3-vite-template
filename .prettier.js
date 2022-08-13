/**
 * ESLint Config for Tencent
 * https://git.code.oa.com/standards/javascript
 *
 * 贡献者：
 *   xcatliu <xcaliu@tencent.com>
 *
 * 依赖版本：
 *   eslint ^7.28.0
 *   @babel/eslint-parser ^7.14.5
 *   @typescript-eslint/parser ^4.27.0
 *   @typescript-eslint/eslint-plugin ^4.27.0
 *   eslint-plugin-import ^2.23.4
 *
 * 此文件是由脚本 scripts/build.ts 自动生成
 *
 * @reason 为什么要开启（关闭）此规则
 */
module.exports = {
  plugins: ['prettier'],
  rules: {
    /**
     * prettier 格式错误
     */
    'prettier/prettier': [
      'warn',
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'always',
        rangeStart: 0,
        rangeEnd: null,
        requirePragma: false,
        insertPragma: false,
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'css',
        vueIndentScriptAndStyle: false,
        endOfLine: 'lf',
        embeddedLanguageFormatting: 'auto',
      },
      {
        usePrettierrc: false,
      },
    ],
  },
};
