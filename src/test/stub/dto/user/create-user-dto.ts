import { CreateUserDto } from '@app/user/create-user.dto';
import { uuid } from '@app/test/util/id';

export const createUserDto = (): CreateUserDto => {
  const user = new CreateUserDto();
  user.username = 'testUser';
  user.roleId = uuid();
  user.email = 'test@test.com';
  return user;
};
