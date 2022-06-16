export default function FlattenObject(obj) {
  const flattened = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, FlattenObject(value));
    } else {
      flattened[key] = value;
    }
  });

  return flattened;
}
