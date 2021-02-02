import UserToken from '../infra/typeorm/entities/UserToken';

interface UsersTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}

export default UsersTokensRepository;
