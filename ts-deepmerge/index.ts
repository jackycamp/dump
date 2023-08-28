type PlainObject<T = any> = {
  [k in string]: T;
};

/**
 * Check if something is an object.
 * An Array is not an object in this context!!.
 */
const isObject = (item: any): item is PlainObject => {
  return item && typeof item === "object" && !Array.isArray(item);
};

/**
 * Performs a deep merge of two objects.
 * 
 * Uses a stack to perform an iterative merge algorithm.
 * NOTE: 'target' object takes precedence if values are present in
 * both target and source objects.
 */
const deepMerge = <T extends PlainObject>(target: T, source: T): T => {
  const stack: { target: T; source: T }[] = [{ target, source }];

  while (stack.length) {
    const { target, source } = stack.pop() as { target: T; source: T };

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          stack.push({ target: target[key], source: source[key] });
        } else {
          let val = source[key];
          // if target has a value for this key, that's the value we use
          // in the final object.
          if (target[key]) val = target[key];
          Object.assign(target, { [key]: val });
        }
      }
    }
  }

  return target;
};
