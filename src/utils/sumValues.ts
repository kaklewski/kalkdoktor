const sumValues = (values: Record<string, string>) => {
  const initialSum: number = 0;

  return Object.values(values).reduce((sum, value) => {
    const number = parseFloat(value);
    return !isNaN(number) ? sum + number : sum;
  }, initialSum);
};

export default sumValues;
