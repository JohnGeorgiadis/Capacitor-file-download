const getRandomDate = (from: Date, to: Date) => {
  const startTimestamp = from.getTime();
  const endTimestamp = to.getTime();

  const randomTimestamp =
    Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) +
    startTimestamp;

  return new Date(randomTimestamp).toLocaleDateString();
};

export default getRandomDate;
