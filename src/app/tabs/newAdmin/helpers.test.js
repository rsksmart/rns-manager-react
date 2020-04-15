import { dayMath, formatDate, truncateString } from './helpers';

describe('dayMath', () => {
  it('adds a day to march 5th 2020', () => {
    const result = dayMath(1, new Date(2020, 2, 5, 1));
    const theDate = new Date(result).getDate();
    expect(theDate).toEqual(6);
  });

  it('formats 1583449200000 to March 6 2020', () => {
    const result = dayMath(1, new Date(2020, 2, 5, 1));
    expect(formatDate(result)).toEqual('6 / Mar / 2020');
  });

  it('formats January 1st, 2020', () => {
    const result = formatDate(new Date('Jan 01 2020'));
    expect(result).toEqual('1 / Jan / 2020');
  });

  it('formats March 5th, 2020', () => {
    const result = formatDate(new Date(2020, 2, 5));
    expect(result).toEqual('5 / Mar / 2020');
  });

  it('truncates address correct', () => {
    expect(truncateString('0x91Bbf6C133C19CeC7B540bf8bd5e0Bfd031e9D90'))
      .toEqual('0x91Bb...1e9D90');
  });

  it('truncates bytes correct', () => {
    expect(truncateString('0x793e39cd00000000000000000000000064a436ae831c1672ae81f674cab8b677'))
      .toEqual('0x793e...b8b677');
  });
});
