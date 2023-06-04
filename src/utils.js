export const getProps = (object, path) => {
  if (path.length === 1) {
    return object[path[0]];
  } else if (path.length === 0) {
    throw Error("Path no puede estar vacío");
  } else {
    if (object[path[0]]) return getProps(object[path[0]], path.slice(1));
    else {
      object[path[0]] = {};
      return getProps(object[path[0]], path.slice(1));
    }
  }
};

export const logging = (className) => {
  console.log(`EJECUTANDO ${className}...`);
};
