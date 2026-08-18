# Repository Guidelines

## 项目结构与模块组织
本仓库是一个 TypeScript 小型库，核心实现位于 `index.ts`，发布产物在仓库根目录的 `index.js`、`index.d.ts`。示例入口为 `demo.ts`。测试文件放在 `__tests__/`（当前为 `index.tests.ts`），覆盖率结果在 `__coverage__/`。构建和工具配置文件位于根目录（如 `package.json`、`tsconfig.json`、`jest.config.ts`、`.eslintrc.js`、`.husky/`）。

## 构建、测试与开发命令
- `npm install`：安装依赖。
- `npm run dev`：使用 `nodemon` 运行 `demo.ts`，用于本地快速验证。
- `npm run build`：执行 `tsc`，生成 `index.js` 与声明文件，提交前请确保无类型报错。
- `npm run clear`：清理 `index.js`、`index.d.ts`。
- `npm run test`：运行 Jest 用例（`__tests__/**/*.ts`）。
- `npm run test:cover`：运行带覆盖率统计，输出到 `__coverage__/`。
- `npm run lint`：触发 `lint-staged`，用于变更文件校验。
- `npm run lint:fix`：自动修复可修复的 ESLint 问题。

## 编码规范与命名约定
- 使用 TypeScript + ESLint（`eslint:recommended` + `@typescript-eslint/recommended`）。
- 禁止使用 `var`，优先接口 `interface` 定义类型。
- 行长限制 160、函数复杂度上限 50、文件行数上限 500；保持可读性优先。
- 缩进建议为 2 空格。
- 命名采用驼峰（变量/函数）、大驼峰（类型/类）、文件名用小写+连字符或小写。
- 若增加测试或配置文件，保持与现有风格一致，不随意改动现有格式。

## 测试规范
- 测试框架：`jest` + `ts-jest`，测试入口来自 `jest.config.ts`。
- 命名建议：`*.tests.ts`，放在 `__tests__/` 下。
- 运行方式：先 `npm run test`，再 `npm run test:cover`（如需覆盖率）。
- 覆盖率阈值：函数 >= 20，行/语句 >= 50。

## 提交与 PR 规范
- 提交记录常用前缀：`feat:`、`fix:`、`update:`、`lint:` 等（如 `feat: remove all coverage result files`）。
- 推荐提交格式：`<type>: <简短中文或英文摘要>`，摘要聚焦行为变更。
- PR 应包含：变更说明、影响范围、相关 issue/需求、执行过的本地命令（至少测试/构建）。

## 其他说明
- Node 与 npm 版本建议满足 `package.json` 的 `engines`（Node >=10）。
- 禁止提交 `node_modules/`、临时构建产物或敏感配置。
