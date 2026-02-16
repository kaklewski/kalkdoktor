const sumValues = (values: { [key: string]: string }) => {
  if (!values || typeof values !== 'object') {
    return 0;
  }

  let result: number = 0;

  Object.keys(values).forEach((key) => {
    const value = parseInt(values[key]);
    if (!isNaN(value)) {
      result += value;
    }
  });

  return result;
};

export default sumValues;
