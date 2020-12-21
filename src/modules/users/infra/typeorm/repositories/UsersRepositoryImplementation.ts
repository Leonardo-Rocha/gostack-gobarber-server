import { getRepository, Repository } from 'typeorm';

import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import User from '../entities/User';

class UsersRepositoryImplementation implements UsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    return this.ormRepository.save(user);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }
}

export default UsersRepositoryImplementation;
