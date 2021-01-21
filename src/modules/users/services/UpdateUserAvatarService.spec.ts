import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'not-authenticated-id',
        avatarFilename: 'avatar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the previous avatar when updating', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

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
