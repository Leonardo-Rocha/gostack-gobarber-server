import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    let user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    user = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar',
    });

    expect(user.avatar).toBe('avatar');
  });

  it('should not be able to update avatar if its not authenticated', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'not-authenticated-id',
        avatarFilename: 'avatar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the previous avatar when updating', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    let user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    user = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar',
    });

    user = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar');
    expect(user.avatar).toBe('avatar2');
  });
});
