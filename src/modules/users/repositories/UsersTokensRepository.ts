import UserToken from '../infra/typeorm/entities/UserToken';

interface UsersTokensRepository {
  generate(user_id: string): Promise<UserToken>;
}

export default UsersTokensRepository;
