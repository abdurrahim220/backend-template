import UserRepository from "../../src/modules/user/user.repository";
import UserService from "../../src/modules/user/user.services";
import AppError from "../../src/errors/appError";

const mockUserRepo: jest.Mocked<UserRepository> = {
  createUser: jest.fn(),
  findAllUsers: jest.fn(),
  findUserById: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

const createUserInput = {
  name: "John",
  email: "john@example.com",
  password: "123456",
};

const mockUser = {
  id: "1",
  ...createUserInput,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const service = new UserService(mockUserRepo);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UserService", () => {
  describe("createUser", () => {
    it("should create a user and return the created user", async () => {
      mockUserRepo.createUser.mockResolvedValue(mockUser);

      // Act
      const result = await service.createUser(createUserInput);

      // Assert
      expect(mockUserRepo.createUser).toHaveBeenCalledTimes(1);
      expect(mockUserRepo.createUser).toHaveBeenCalledWith(createUserInput);
      expect(result).toEqual(mockUser);
    });
  });

  describe("findAllUsers", () => {
    it("should return all users", async () => {
      // Arrange
      const users = [
        {
          id: "1",
          name: "John",
          email: "john@example.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          name: "Jane",
          email: "jane@example.com",
          password: "654321",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockUserRepo.findAllUsers.mockResolvedValue(users);

      // Act
      const result = await service.findAllUsers();

      // Assert
      expect(mockUserRepo.findAllUsers).toHaveBeenCalledTimes(1);
      expect(result).toEqual(users);
    });
  });

  describe("findUserById", () => {
    it("should return a user when a valid id is provided", async () => {
      // Act
      mockUserRepo.findUserById.mockResolvedValue(mockUser);
      const result = await service.findUserById("1");

      // Assert
      expect(mockUserRepo.findUserById).toHaveBeenCalledTimes(1);
      expect(mockUserRepo.findUserById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockUser);
    });

    it("should throw AppError when id is empty", async () => {
      await expect(service.findUserById("")).rejects.toThrow(AppError);

      expect(mockUserRepo.findUserById).not.toHaveBeenCalled();
    });

    it("should throw AppError when user does not exist", async () => {
      mockUserRepo.findUserById.mockResolvedValue(null);

      await expect(service.findUserById("1")).rejects.toThrow(AppError);

      expect(mockUserRepo.findUserById).toHaveBeenCalledWith("1");
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      // Arrange
      const updateData = {
        name: "John Updated",
      };

      const updatedUser = {
        ...mockUser,
        name: "John Updated",
      };
      mockUserRepo.findUserById.mockResolvedValue(mockUser);
      mockUserRepo.updateUser.mockResolvedValue(updatedUser);

      // Act
      const result = await service.updateUser("1", updateData);

      // Assert
      expect(mockUserRepo.updateUser).toHaveBeenCalledTimes(1);
      expect(mockUserRepo.updateUser).toHaveBeenCalledWith("1", updateData);
      expect(result).toEqual(updatedUser);
    });

    it("should throw AppError when id is empty", async () => {
      await expect(service.updateUser("", { name: "John" })).rejects.toThrow(
        AppError,
      );

      expect(mockUserRepo.updateUser).not.toHaveBeenCalled();
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      // Arrange

      mockUserRepo.deleteUser.mockResolvedValue(mockUser);

      // Act
      const result = await service.deleteUser("1");

      // Assert
      expect(mockUserRepo.deleteUser).toHaveBeenCalledTimes(1);
      expect(mockUserRepo.deleteUser).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockUser);
    });
  });
});
