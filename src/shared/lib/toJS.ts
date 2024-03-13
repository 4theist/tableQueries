export function toJS(value) {
    if (Array.isArray(value)) {
      return value.map(toJS);
    } else if (typeof value === 'object' && value !== null) {
      const result = {};
      for (const key in value) {
        result[key] = toJS(value[key]);
      }
      return result;
    } else {
      return value;
    }
  }