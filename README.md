# GoBarber - server

GoBarber is a barber shop appointments management application.

## Features

The features will be organized according to the following Software Engineering topics:

**FR (Functional Requirements)** The features itself.

**NFR (Non Functional Requirements)** The qualities of a feature, Tools definitions.

**BR (Business Rules)** Programming logic.

### Password Recovery

**FR**

- The user must be able to recover his password informing his email;
- The user must receive an email with password recovery instructions;
- The user must be able to reset his password.

**NFR**

- Use mailtrap for email testing in development environment;
- Use Amazon SES for email dispatching in production;
- The email dispatching must run as a background job.

**BR**

- The password reset link must expire after 2 hours;
- The user must confirm the new password typing twice.

### Profile Update

**FR**

- The user must be able to update his profile: name, email and password.

**BR**

- The user can't change his email for an email already taken;
- To update his password the user must inform the old password;
- To update his password the user must confirm the new password.

### Provider panel

**FR**

- The user must be able to index his appointments in an specific day;
- The provider must receive a notification when a new appointment is scheduled;
- The provider must be able to visualize the notifications that weren't read.

**NFR**

- The appointments of the provider in the day must be stored in cache memory;
- The notifications must be stored in MongoDB;
- The notifications must be sent in real-time using Socket.io.

**BR**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar.

### Appointments Creation

**RF**

- The user must be able to index all registered providers;
- The user must be able to index the available dates with at least one available time of a provider;
- The user must be able to index available times of a specific day of a provider;
- The user must be able to create the appointment with a provider.

**RNF**

- The providers list must be stored in cache memory.

**BR**

- Each appointment must take exactly one hour;
- The appointments must be available from 8h to 18h (First at 8h and last at 17h);
- The user cannot schedule in an already taken appointment;
- The user can't schedule in past times;
- The user can't schedule appointments with himself.
