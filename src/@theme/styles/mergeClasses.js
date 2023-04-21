import { getDisplayName } from '@material-ui/utils';

function mergeClasses(options = {}) {
  const { baseClasses, newClasses, Component } = options;

  if (!newClasses) {
    return baseClasses;
  }

  const nextClasses = { ...baseClasses };

  Object.keys(newClasses).forEach(key => {
    if (newClasses[key]) {
      nextClasses[key] = `${baseClasses[key]} ${newClasses[key]}`;
    }
  });

  return nextClasses;
}

export default mergeClasses;
