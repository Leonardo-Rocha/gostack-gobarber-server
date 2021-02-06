import CreateUserDTO from '../dtos/CreateUserDTO';
import FindAllProvidersDTO from '../dtos/FindAllProvidersDTO';
import User from '../infra/typeorm/entities/User';

interface UsersRepository {
  findAllProviders(options: FindAllProvidersDTO): Promise<User[]>;
  create(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

export default UsersRepository;
