export const convertToBoolean = (obj, name) => {
  obj[`${name}_completed`] = !!obj[`${name}_completed`]
  return obj
}

