import util from "node:util";
import stringifyValidator from "../utils/stringifyValidator.js";
import toFunctionName from "../utils/toFunctionName.js";

import * as t from "../../lib/index.js";

const readme = [
  `---
id: babel-types
title: "@babel/types"
---
<!-- Do not modify! This file is automatically generated by
  github.com/babel/babel/babel-types/scripts/generators/docs.js !-->

> This module contains methods for building ASTs manually and for checking the types of AST nodes.

## Install

\`\`\`shell npm2yarn
npm install --save-dev @babel/types
\`\`\`

## API`,
];

const customTypes = {
  ClassMethod: {
    key: "if computed then `Expression` else `Identifier | Literal`",
  },
  Identifier: {
    name: "`string`",
  },
  MemberExpression: {
    property: "if computed then `Expression` else `Identifier`",
  },
  ObjectMethod: {
    key: "if computed then `Expression` else `Identifier | Literal`",
  },
  ObjectProperty: {
    key: "if computed then `Expression` else `Identifier | Literal`",
  },
  ClassPrivateMethod: {
    computed: "'false'",
  },
  ClassPrivateProperty: {
    computed: "'false'",
  },
  NumericLiteral: {
    value: "a non-negative finite `number`",
  },
};
const APIHistory = {
  ClassProperty: [["v7.6.0", "Supports `static`"]],
  ImportDeclaration: [["v7.20.0", "Supports `module`"]],
  ImportOrExportDeclaration: [["v7.21.0", "Introduced"]],
  ModuleDeclaration: [["v7.21.0", "Deprecated"]],
  TSSatisfiesExpression: [["v7.20.0", "Introduced"]],
  TSTypeParameter: [["v7.21.0", "Supports `const`"]],
  VariableDeclaration: [
    ["v7.20.0", '`kind` can be "using".'],
    ["v7.22.0", '`kind` can be "await using".'],
  ],
  VoidPattern: [["v7.28.0", "Introduced"]],
};
const aliasDescriptions = {
  Accessor: "Deprecated. Will be removed in Babel 8.",
  Binary:
    "A cover of BinaryExpression and LogicalExpression, which share the same AST shape.",
  Block: "Deprecated. Will be removed in Babel 8.",
  BlockParent:
    "A cover of AST nodes that start an execution context with new [LexicalEnvironment](https://tc39.es/ecma262/#table-additional-state-components-for-ecmascript-code-execution-contexts). In other words, they define the scope of `let` and `const` declarations.",
  Class:
    "A cover of ClassExpression and ClassDeclaration, which share the same AST shape.",
  CompletionStatement:
    "A statement that indicates the [completion records](https://tc39.es/ecma262/#sec-completion-record-specification-type). In other words, they define the control flow of the program, such as when should a loop break or an action throws critical errors.",
  Conditional:
    "A cover of ConditionalExpression and IfStatement, which share the same AST shape.",
  Declaration:
    "A cover of any [Declaration](https://tc39.es/ecma262/#prod-Declaration)s.",
  EnumBody: "A cover of Flow enum bodies.",
  EnumMember: "A cover of Flow enum members.",
  ExportDeclaration:
    "A cover of any [ExportDeclaration](https://tc39.es/ecma262/#prod-ExportDeclaration)s.",
  Expression:
    "A cover of any [Expression](https://tc39.es/ecma262/#sec-ecmascript-language-expressions)s.",
  ExpressionWrapper:
    "A wrapper of expression that does not have runtime semantics.",
  Flow: "A cover of AST nodes defined for Flow.",
  FlowBaseAnnotation: "A cover of primary Flow type annotations.",
  FlowDeclaration: "A cover of Flow declarations.",
  FlowPredicate: "A cover of Flow predicates.",
  FlowType: "A cover of Flow type annotations.",
  For: "A cover of [ForStatement](https://tc39.es/ecma262/#sec-for-statement)s and [ForXStatement](#forxstatement)s.",
  ForXStatement:
    "A cover of [ForInStatements and ForOfStatements](https://tc39.es/ecma262/#sec-for-in-and-for-of-statements).",
  Function:
    "A cover of functions and [method](#method)s, the must have `body` and `params`. Note: `Function` is different to `FunctionParent`. For example, a `StaticBlock` is a `FunctionParent` but not `Function`.",
  FunctionParent:
    "A cover of AST nodes that start an execution context with new [VariableEnvironment](https://tc39.es/ecma262/#table-additional-state-components-for-ecmascript-code-execution-contexts). In other words, they define the scope of `var` declarations. FunctionParent did not include `Program` since Babel 7.",
  FunctionParameter:
    "A cover of function parameters. They are the elements of [FormalParameterList](https://tc39.es/ecma262/#prod-FormalParameterList).",
  Immutable:
    "A cover of immutable objects and JSX elements. An object is [immutable](https://tc39.es/ecma262/#immutable-prototype-exotic-object) if no other properties can be defined once created.",
  ImportOrExportDeclaration:
    "A cover of ImportDeclaration and [ExportDeclaration](#exportdeclaration).",
  JSX: "A cover of AST nodes defined for [JSX](https://facebook.github.io/jsx/).",
  LVal: "A cover of left hand side expressions used in the `left` of assignment expressions and [ForXStatement](#forxstatement)s.",
  Literal:
    "A cover of [Literal](https://tc39.es/ecma262/#sec-primary-expression-literals)s, [Regular Expression Literal](https://tc39.es/ecma262/#sec-primary-expression-regular-expression-literals)s and [Template Literal](https://tc39.es/ecma262/#sec-template-literals)s.",
  Loop: "A cover of loop statements.",
  Method: "A cover of object methods and class methods.",
  Miscellaneous:
    "A cover of non-standard AST types that are sometimes useful for development.",
  ModuleSpecifier:
    "A cover of import and export specifiers. Note: It is _not_ the [ModuleSpecifier](https://tc39.es/ecma262/#prod-ModuleSpecifier) defined in the spec.",
  ObjectMember:
    "A cover of [members](https://tc39.es/ecma262/#prod-PropertyDefinitionList) in an object literal.",
  Pattern:
    "A cover of [BindingPattern](https://tc39.es/ecma262/#prod-BindingPattern) except Identifiers.",
  PatternLike:
    "A cover of [BindingPattern](https://tc39.es/ecma262/#prod-BindingPattern)s.",
  Private: "A cover of private class elements and private identifiers.",
  Property: "A cover of object properties and class properties.",
  Pureish:
    "A cover of AST nodes which do not have side-effects. In other words, there is no observable behaviour changes if they are evaluated more than once.",
  Scopable:
    "A cover of [FunctionParent](#functionparent) and [BlockParent](#blockparent).",
  Standardized:
    "A cover of AST nodes which are part of an official ECMAScript specification.",
  Statement:
    "A cover of any [Statement](https://tc39.es/ecma262/#prod-Statement)s.",
  TSBaseType: "A cover of primary TypeScript type annotations.",
  TSEntityName: "A cover of ts entities.",
  TSType: "A cover of TypeScript type annotations.",
  TSTypeElement: "A cover of TypeScript type declarations.",
  TypeScript: "A cover of AST nodes defined for TypeScript.",
  Terminatorless:
    "A cover of AST nodes whose semantic will change when a line terminator is inserted between the operator and the operand.",
  UnaryLike: "A cover of UnaryExpression and SpreadElement.",
  UserWhitespacable: "Deprecated. Will be removed in Babel 8.",
  While:
    "A cover of DoWhileStatement and WhileStatement, which share the same AST shape.",
};

const aliasDeprecationNotes = {
  ModuleDeclaration:
    "Check out [PR #15266](https://github.com/babel/babel/pull/15266#issue-1492649843) for migration notes.",
};

function formatHistory(historyItems) {
  const lines = historyItems.map(
    item => "| `" + item[0] + "` | " + item[1] + " |"
  );
  return [
    "<details>",
    "  <summary>History</summary>",
    "",
    "| Version | Changes |",
    "| --- | --- |",
    ...lines,
    "</details>",
  ];
}
function printAPIHistory(key, readme) {
  if (APIHistory[key]) {
    readme.push("");
    readme.push(...formatHistory(APIHistory[key]));
  }
}
function printNodeFields(key, readme) {
  if (Object.keys(t.NODE_FIELDS[key]).length > 0) {
    readme.push("");
    readme.push("AST Node `" + key + "` shape:");
    Object.keys(t.NODE_FIELDS[key])
      .sort(function (fieldA, fieldB) {
        const indexA = t.BUILDER_KEYS[key].indexOf(fieldA);
        const indexB = t.BUILDER_KEYS[key].indexOf(fieldB);
        if (indexA === indexB) return fieldA < fieldB ? -1 : 1;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      })
      .forEach(function (field) {
        const defaultValue = t.NODE_FIELDS[key][field].default;
        const fieldDescription = ["`" + field + "`"];
        const validator = t.NODE_FIELDS[key][field].validate;
        if (customTypes[key] && customTypes[key][field]) {
          fieldDescription.push(`: ${customTypes[key][field]}`);
        } else if (validator) {
          try {
            fieldDescription.push(
              ": `" + stringifyValidator(validator, "") + "`"
            );
          } catch (ex) {
            if (ex.code === "UNEXPECTED_VALIDATOR_TYPE") {
              console.log(
                "Unrecognised validator type for " + key + "." + field
              );
              console.dir(ex.validator, { depth: 10, colors: true });
            }
          }
        }
        if (defaultValue !== null || t.NODE_FIELDS[key][field].optional) {
          fieldDescription.push(
            " (default: `" + util.inspect(defaultValue) + "`"
          );
          if (!t.BUILDER_KEYS[key].includes(field)) {
            fieldDescription.push(", excluded from builder function");
          }
          fieldDescription.push(")");
        } else {
          fieldDescription.push(" (required)");
        }
        readme.push("- " + fieldDescription.join(""));
      });
  }
}

function printAliasKeys(key, readme) {
  if (t.ALIAS_KEYS[key] && t.ALIAS_KEYS[key].length) {
    readme.push("");
    readme.push(
      "Aliases: " +
        t.ALIAS_KEYS[key]
          .map(function (key) {
            return "[`" + key + "`](#" + key.toLowerCase() + ")";
          })
          .join(", ")
    );
  }
}
readme.push("### Node Builders");
readme.push("");
Object.keys(t.BUILDER_KEYS)
  .sort()
  .forEach(function (key) {
    readme.push("#### " + toFunctionName(key));
    readme.push("");
    readme.push('```js title="JavaScript"');
    readme.push(
      "t." + toFunctionName(key) + "(" + t.BUILDER_KEYS[key].join(", ") + ");"
    );
    readme.push("```");
    printAPIHistory(key, readme);
    readme.push("");
    readme.push(
      "See also `t.is" +
        key +
        "(node, opts)` and `t.assert" +
        key +
        "(node, opts)`."
    );

    printNodeFields(key, readme);
    printAliasKeys(key, readme);

    readme.push("");
    readme.push("---");
    readme.push("");
  });

function generateMapAliasToNodeTypes() {
  const result = new Map();
  for (const nodeType of Object.keys(t.ALIAS_KEYS)) {
    const aliases = t.ALIAS_KEYS[nodeType];
    if (!aliases) continue;
    for (const alias of aliases) {
      if (!result.has(alias)) {
        result.set(alias, []);
      }
      const nodeTypes = result.get(alias);
      nodeTypes.push(nodeType);
    }
  }
  for (const deprecated of Object.keys(t.DEPRECATED_ALIASES)) {
    result.set(deprecated, result.get(t.DEPRECATED_ALIASES[deprecated]));
  }
  return result;
}

const mapAliasToNodeTypes = generateMapAliasToNodeTypes();
readme.push("### Aliases");
readme.push("");
for (const alias of [...mapAliasToNodeTypes.keys()].sort()) {
  const nodeTypes = mapAliasToNodeTypes.get(alias);
  nodeTypes.sort();
  if (!(alias in aliasDescriptions)) {
    if (alias in t.DEPRECATED_ALIASES) {
      const newAlias = t.DEPRECATED_ALIASES[alias];
      let aliasDescription = `Deprecated, use [\`${newAlias}\`](#${newAlias.toLowerCase()}) instead.`;
      if (alias in aliasDeprecationNotes) {
        aliasDescription += " " + aliasDeprecationNotes[alias];
      }
      // wrap alias description in caution admonitions
      // https://docusaurus.io/docs/markdown-features/admonitions
      aliasDescription = `:::caution\n\n${aliasDescription}\n\n:::`;
      aliasDescriptions[alias] = aliasDescription;
    } else {
      throw new Error(
        'Missing alias descriptions of "' +
          alias +
          ", which covers " +
          nodeTypes.join(",")
      );
    }
  }
  readme.push("#### " + alias);
  printAPIHistory(alias, readme);
  readme.push("");
  readme.push(aliasDescriptions[alias]);
  readme.push('```js title="JavaScript"');
  readme.push("t.is" + alias + "(node);");
  readme.push("```");
  readme.push("");
  readme.push("Covered nodes:");
  for (const nodeType of nodeTypes) {
    readme.push("- [`" + nodeType + "`](#" + nodeType.toLowerCase() + ")");
  }
  readme.push("");
}

process.stdout.write(readme.join("\n"));
