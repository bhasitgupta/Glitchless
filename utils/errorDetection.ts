export interface CodeError {
  id: string;
  message: string;
  line?: number;
  column?: number;
  type: "error" | "warning" | "info";
}

export interface FixSuggestion {
  title: string;
  description: string;
  code: string;
}

export function detectErrors(code: string): CodeError[] {
  const errors: CodeError[] = [];
  const lines = code.split("\n");

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Detect common errors
    if (line.includes("console.log") && !line.includes("//")) {
      errors.push({
        id: `console-${lineNum}`,
        message: "Console.log statement found in production code",
        line: lineNum,
        type: "warning",
      });
    }

    if (line.includes("var ")) {
      errors.push({
        id: `var-${lineNum}`,
        message: "Use 'let' or 'const' instead of 'var'",
        line: lineNum,
        type: "warning",
      });
    }

    if (line.includes("==") && !line.includes("===")) {
      errors.push({
        id: `eq-${lineNum}`,
        message: "Use strict equality '===' instead of '=='",
        line: lineNum,
        type: "warning",
      });
    }

    if (line.match(/function\s*\(/) && line.includes("=>")) {
      errors.push({
        id: `func-${lineNum}`,
        message: "Mixed function syntax detected",
        line: lineNum,
        type: "error",
      });
    }

    if (line.includes("TODO") || line.includes("FIXME")) {
      errors.push({
        id: `todo-${lineNum}`,
        message: line.includes("TODO") ? "TODO comment found" : "FIXME comment found",
        line: lineNum,
        type: "info",
      });
    }
  });

  return errors;
}

export function getFixSuggestions(error: CodeError): FixSuggestion[] {
  const suggestions: FixSuggestion[] = [];

  switch (error.type) {
    case "warning":
      if (error.message.includes("console.log")) {
        suggestions.push({
          title: "Remove console.log",
          description: "Remove the console.log statement for production",
          code: "// Replace with proper logging or remove",
        });
        suggestions.push({
          title: "Use proper logger",
          description: "Use a logging library instead",
          code: "logger.info('message');",
        });
      } else if (error.message.includes("var")) {
        suggestions.push({
          title: "Replace with const",
          description: "Use const for variables that don't reassign",
          code: "const variable = value;",
        });
        suggestions.push({
          title: "Replace with let",
          description: "Use let for variables that need reassignment",
          code: "let variable = value;",
        });
      } else if (error.message.includes("===")) {
        suggestions.push({
          title: "Use strict equality",
          description: "Replace '==' with '==='",
          code: "if (value === expected) {",
        });
      }
      break;

    case "error":
      if (error.message.includes("function")) {
        suggestions.push({
          title: "Use arrow function",
          description: "Convert to arrow function syntax",
          code: "const myFunction = () => {",
        });
        suggestions.push({
          title: "Use function declaration",
          description: "Use traditional function syntax",
          code: "function myFunction() {",
        });
      }
      break;

    case "info":
      suggestions.push({
        title: "Create task",
        description: "Create a task from this comment",
        code: "// TODO: Implement this feature",
      });
      break;
  }

  return suggestions;
}
