import { v4 } from 'uuid';
import { isEqual } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements AppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return foundAppointment;
  }
}

export default FakeAppointmentsRepository;
