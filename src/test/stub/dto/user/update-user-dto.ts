import { UpdateUserDto } from '@app/user/update-user.dto';
import { uuid } from '@app/test/util/id';

export const updateUserDto = (): UpdateUserDto => {
  const user = new UpdateUserDto();
  user.username = 'testUser';
  user.roleId = uuid();
  user.email = 'test@test.com';
  user.password = '1234';
  user.regenPass = true;
  return user;
};
