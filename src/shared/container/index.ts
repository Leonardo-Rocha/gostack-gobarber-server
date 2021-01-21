import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import AppointmentsRepositoryImplementation from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepositoryImplementation';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import UsersRepositoryImplementation from '@modules/users/infra/typeorm/repositories/UsersRepositoryImplementation';

// import UsersTokensRepository from '@modules/users/repositories/UsersTokensRepository';

container.registerSingleton<AppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepositoryImplementation,
);

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  UsersRepositoryImplementation,
);

// container.registerSingleton<UsersTokensRepository>(
//   'UsersTokensRepository',
//   UsersRepositoryImplementation,
// );
