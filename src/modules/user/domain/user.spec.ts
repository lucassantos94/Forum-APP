import { User } from './user';
let validUser: {
  user: string;
  pass: string;
  email: string;
  alias: string;
};
beforeAll(() => {
  validUser = {
    user: 'lucas',
    email: 'lucas@email.com',
    pass: 'pass123',
    alias: 'aaLucaSaa',
  };
});
describe('User create', () => {
  describe('return undefined if ', () => {
    it('invalid email 1', async () => {
      expect(await User.create({ ...validUser, email: 'lucas' })).toBeUndefined();
      expect(await User.create({ ...validUser, email: '@email.com' })).toBeUndefined();
    });

    it('password is less than 5 characters', async () => {
      const password = '1234';
      expect(await User.create({ ...validUser, pass: password })).toBeUndefined();
    });
    it('password is more than 15 characters', async () => {
      const password = '1234567890abcdef';
      expect(await User.create({ ...validUser, pass: password })).toBeUndefined();
    });
  });
  describe('return User', () => {
    it('if valid data', async () => {
      expect(await User.create(validUser)).toBeInstanceOf(User);
    });
  });
});
