describe('setEnvVars', () => {
  it('gets correct environment varialbe', () => {
    expect(import.meta.env.VITE_ENVIRONMENT).toEqual('testing');
  });
});
