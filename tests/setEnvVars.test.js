describe('setEnvVars', () => {
  it('gets correct environment varialbe', () => {
    expect(process.env.REACT_APP_ENVIRONMENT).toEqual('testing');
  });
});
