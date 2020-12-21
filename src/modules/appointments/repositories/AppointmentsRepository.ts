import CreateAppointmentDTO from '../dtos/CreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

interface AppointmentsRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default AppointmentsRepository;
