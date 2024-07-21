import getRandomDate from "./getRandomDate";

describe('getRandomDate', () => {
  it('returns a random date between the given range', () => {
    const from = new Date('2022-01-01');
    const to = new Date('2022-12-31');

    const randomDate = getRandomDate(from, to);

    expect(new Date(randomDate).getTime()).toBeGreaterThanOrEqual(new Date(from).getTime());
    expect(new Date(randomDate).getTime()).toBeLessThanOrEqual(new Date(to).getTime());
  });
});