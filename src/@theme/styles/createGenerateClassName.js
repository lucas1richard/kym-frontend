const escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;

function safePrefix(classNamePrefix) {
  const prefix = String(classNamePrefix);
  // Sanitize the string as will be used to prefix the generated class name.
  return prefix.replace(escapeRegex, '-');
}

// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// It's inspired by
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js
export default function createGenerateClassName(options = {}) {
  const { dangerouslyUseGlobalCSS = false, productionPrefix = 'jss', seed = '' } = options;
  let ruleCounter = 0;

  return (rule, styleSheet) => {
    ruleCounter += 1;

    if (dangerouslyUseGlobalCSS && styleSheet && styleSheet.options.name) {
      return `${safePrefix(styleSheet.options.name)}-${rule.key}`;
    }

    if (process.env.NODE_ENV === 'production') {
      return `${productionPrefix}${seed}${ruleCounter}`;
    }

    // Help with debuggability.
    if (styleSheet && styleSheet.options.classNamePrefix) {
      return `${safePrefix(styleSheet.options.classNamePrefix)}-${rule.key}-${seed}${ruleCounter}`;
    }

    return `${rule.key}-${seed}${ruleCounter}`;
  };
}
