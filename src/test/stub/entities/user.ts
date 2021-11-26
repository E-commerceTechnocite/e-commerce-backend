import { User } from '@app/user/entities/user.entity';
import { uuid } from '@app/test/util/id';
import { hash } from 'bcrypt';

export const user = async (): Promise<User> => ({
  id: uuid(),
  role: {},
  username: 'test',
  email: 'test@test.com',
  password: await hash('1234', 10),
  refreshTokens: [],
});
