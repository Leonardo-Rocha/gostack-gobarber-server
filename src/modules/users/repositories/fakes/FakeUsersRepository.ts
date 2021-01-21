import { v4 as uuid } from 'uuid';

import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements UsersRepository {
  private users: User[] = [];

  public async create(data: CreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, data);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const foundIndex = this.users.findIndex(
      findUser => findUser.id === user.id,
    );

    this.users[foundIndex] = user;

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.email === email);
    return foundUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === id);
    return foundUser;
  }
}

export default FakeUsersRepository;
