import { container } from 'tsyringe';

import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import HashProvider from './HashProvider/models/HashProvider';

container.registerSingleton<HashProvider>('HashProvider', BCryptHashProvider);
