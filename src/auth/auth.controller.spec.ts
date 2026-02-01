import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockUser = { name: 'John Doe', email: 'john@example.com' };
  const mockUserList = [{ name: 'John Doe', email: 'john@example.com' }];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(mockUser),
            getUsers: jest.fn().mockResolvedValue(mockUserList),
          },
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await authController.findAll()).toBe(mockUserList);
      expect(authService.getUsers).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const dto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      expect(await authController.create(dto)).toBe(mockUser);
      expect(authService.createUser).toHaveBeenCalledWith(dto);
    });
  });
});
