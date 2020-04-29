describe('set up RSK environment, contracts, etc', () => {
  beforeAll(() => {
    console.log('before all');
    // start RSK network
  });

  beforeEach(() => {
    // deploy suite
    console.log('before each');
  });

  afterAll(() => {
    console.log('after all!');
  });

  it('returns true', () => {
    console.log('test run');
    expect(true).toBeTruthy();
  });
});
