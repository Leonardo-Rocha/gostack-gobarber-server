import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = await this.findOne({
      where: { date },
    });

    return foundAppointment || undefined;
  }
}

export default AppointmentsRepository;
