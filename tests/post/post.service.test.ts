import PostRepository from "../../src/modules/post/post.repository";
import PostService from "../../src/modules/post/post.services";
import AppError from "../../src/errors/appError";

const mockPostRepo: jest.Mocked<PostRepository> = {
  createPost: jest.fn(),
  findAllPosts: jest.fn(),
  findPostById: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
};

const createPostInput = {
  title: "Quick Tip: JSON Formatting",
  content:
    "Always remember to validate your JSON before parsing it.",
  authorId: "123",
};

const mockPost = {
  id: "1",
  ...createPostInput,
  published: false,
  author: {
      id: "123",
      name: "John",
    },
  createdAt: new Date(),
  updatedAt: new Date(),
};

const service = new PostService(mockPostRepo);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PostService", () => {

  describe("createPost", () => {
    it("should create a post", async () => {

      const expectedRepositoryInput = {
        title: createPostInput.title,
        content: createPostInput.content,
        author: {
          connect: {
            id: createPostInput.authorId,
          },
        },
      };

      mockPostRepo.createPost.mockResolvedValue(mockPost);

      const result = await service.createPost(createPostInput);

      expect(mockPostRepo.createPost).toHaveBeenCalledTimes(1);

      expect(mockPostRepo.createPost)
        .toHaveBeenCalledWith(expectedRepositoryInput);

      expect(result).toEqual(mockPost);

    });
  });

  describe("findAllPosts", () => {
    it("should return all posts with pagination metadata", async () => {
      // Arrange
      const posts = {
        items: [
          mockPost,
          {
            ...mockPost,
            id: "2",
            title: "Second Post",
          },
        ],
        meta: {
          page: 1,
          limit: 20,
          total: 2,
          totalPages: 1,
        },
      };
  
      mockPostRepo.findAllPosts.mockResolvedValue(posts);
  
      // Act
      const result = await service.findAllPosts({});
  
      // Assert
      expect(mockPostRepo.findAllPosts).toHaveBeenCalledTimes(1);
      expect(mockPostRepo.findAllPosts).toHaveBeenCalledWith({});
      expect(result).toEqual(posts);
    });
  });
  describe("findPostById", () => {

    it("should return a post", async () => {

      mockPostRepo.findPostById.mockResolvedValue(mockPost);

      const result = await service.findPostById("1");

      expect(mockPostRepo.findPostById)
        .toHaveBeenCalledWith("1");

      expect(result).toEqual(mockPost);

    });

    it("should throw AppError when id is empty", async () => {

      await expect(
        service.findPostById("")
      ).rejects.toThrow(AppError);

      expect(mockPostRepo.findPostById)
        .not.toHaveBeenCalled();

    });

    it("should throw AppError when post does not exist", async () => {

      mockPostRepo.findPostById.mockResolvedValue(null);

      await expect(
        service.findPostById("1")
      ).rejects.toThrow(AppError);

      expect(mockPostRepo.findPostById)
        .toHaveBeenCalledWith("1");

    });

  });

  describe("updatePost", () => {

    it("should update a post", async () => {

      const updateData = {
        title: "Updated Title",
      };

      const updatedPost = {
        ...mockPost,
        title: "Updated Title",
      };

      mockPostRepo.findPostById.mockResolvedValue(mockPost);

      mockPostRepo.updatePost.mockResolvedValue(updatedPost);

      const result = await service.updatePost(
        "1",
        updateData
      );

      expect(mockPostRepo.findPostById)
        .toHaveBeenCalledWith("1");

      expect(mockPostRepo.updatePost)
        .toHaveBeenCalledWith("1", updateData);

      expect(result).toEqual(updatedPost);

    });

    it("should throw AppError when id is empty", async () => {

      await expect(
        service.updatePost("", {})
      ).rejects.toThrow(AppError);

      expect(mockPostRepo.updatePost)
        .not.toHaveBeenCalled();

    });

    it("should throw AppError when post does not exist", async () => {

      mockPostRepo.findPostById.mockResolvedValue(null);

      await expect(
        service.updatePost("1", {})
      ).rejects.toThrow(AppError);

      expect(mockPostRepo.updatePost)
        .not.toHaveBeenCalled();

    });

  });

  describe("deletePost", () => {

    it("should delete a post", async () => {

      mockPostRepo.findPostById.mockResolvedValue(mockPost);

      mockPostRepo.deletePost.mockResolvedValue(mockPost);

      const result = await service.deletePost("1");

      expect(mockPostRepo.findPostById)
        .toHaveBeenCalledWith("1");

      expect(mockPostRepo.deletePost)
        .toHaveBeenCalledWith("1");

      expect(result).toEqual(mockPost);

    });

    it("should throw AppError when post does not exist", async () => {

      mockPostRepo.findPostById.mockResolvedValue(null);

      await expect(
        service.deletePost("1")
      ).rejects.toThrow(AppError);

      expect(mockPostRepo.deletePost)
        .not.toHaveBeenCalled();

    });

  });

});