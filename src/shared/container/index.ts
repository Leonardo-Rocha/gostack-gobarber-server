import { container } from 'tsyringe';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import AppointmentsRepositoryImplementation from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepositoryImplementation';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import UsersRepositoryImplementation from '@modules/users/infra/typeorm/repositories/UsersRepositoryImplementation';

container.registerSingleton<AppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepositoryImplementation,
);

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  UsersRepositoryImplementation,
);
