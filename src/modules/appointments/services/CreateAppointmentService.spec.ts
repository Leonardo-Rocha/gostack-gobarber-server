import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const date = new Date();
    const provider_id = '123123';
    const appointment = await createAppointment.execute({
      date,
      provider_id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider_id);
    expect(appointment.date).toStrictEqual(startOfHour(date));
  });

  it('should not be able to create two appointments at the same time', async () => {
    const date = new Date(2020, 4, 10, 11);
    const provider_id = '123123';
    await createAppointment.execute({
      date,
      provider_id,
    });

    await expect(
      createAppointment.execute({
        date,
        provider_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
