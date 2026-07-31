import CommentRepository from "../../src/modules/comment/comment.repository";
import CommentService from "../../src/modules/comment/comment.services";

const mockCommentRepo: jest.Mocked<CommentRepository> = {
  createComment: jest.fn(),
  findAllComments: jest.fn(),
  findCommentById: jest.fn(),
  updateComment: jest.fn(),
  deleteComment: jest.fn(),
};

const createCommentInput = {
  content: "First Comment",
  postId: "e67fbd37-2331-4e0d-974f-9237cd96ed99",
  authorId: "53483710-37a0-4a21-ac2a-ebbc6f7a8dd7",
};

const mockPost = {
  id: "1",
  ...createCommentInput,
  parentId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const service = new CommentService(mockCommentRepo);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CommentService", () => {
  describe("createComment", () => {
    it("should create a comment", async () => {
      const expectedRepositoryInput = {
        content: createCommentInput.content,
        post: {
          connect: {
            id: createCommentInput.postId,
          },
        },
        author: {
          connect: {
            id: createCommentInput.authorId,
          },
        },
      };
      mockCommentRepo.createComment.mockResolvedValue(mockPost);
      const result = await service.createComment(createCommentInput);

      expect(mockCommentRepo.createComment).toHaveBeenCalledTimes(1);

      expect(mockCommentRepo.createComment).toHaveBeenCalledWith(
        expectedRepositoryInput,
      );

      expect(result).toEqual(mockPost);
    });
  });
});
