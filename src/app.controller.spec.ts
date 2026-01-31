import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockUser = { name: 'John Doe', email: 'john@example.com' };
  const mockUserList = [{ name: 'John Doe', email: 'john@example.com' }];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(mockUser),
            getUsers: jest.fn().mockResolvedValue(mockUserList),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await appController.findAll()).toBe(mockUserList);
      expect(appService.getUsers).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const dto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      expect(await appController.create(dto)).toBe(mockUser);
      expect(appService.createUser).toHaveBeenCalledWith(dto);
    });
  });
});
