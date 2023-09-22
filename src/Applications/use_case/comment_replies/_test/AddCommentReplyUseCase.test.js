const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const UserRepository = require('../../../../Domains/users/UserRepository');
const NewCommentReply = require('../../../../Domains/comment_replies/entities/NewCommentReply');
const AddedCommentReply = require('../../../../Domains/comment_replies/entities/AddedCommentReply');
const AddCommentReplyUseCase = require('../AddCommentReplyUseCase');
const CommentReplyRepository = require('../../../../Domains/comment_replies/CommentReplyRepository');

describe('AddCommentReplyUseCase', () => {
  /**
   * Testing the comment use case
   * can orchestra step by step
   * for adding the new comment correctly
   */

  it('should orchestrating the add comment reply', async () => {
    // Arrange
    const useCasePayload = {
      content: 'This is comment',
    };

    const useCaseCredential = {
      id: 'user-123',
    };

    const useCaseThreadId = {
      id: 'thread-123',
    };

    const useCaseCommentId = {
      id: 'comment-123',
    };

    const mockAddedCommentReply = new AddedCommentReply({
      id: 'reply-123',
      content: useCasePayload.content,
      owner: useCaseCredential.id,
    });

    /** creting dependency of use case */
    const mockCommentReplyRepository = new CommentReplyRepository();
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockUserRepository = new UserRepository();

    /** mocking needed function */
    mockCommentRepository.getCommentById = jest.fn().mockImplementation(() => Promise.resolve(useCaseCommentId));
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(useCaseThreadId));
    mockUserRepository.getUserById = jest.fn().mockImplementation(() => Promise.resolve(useCaseCredential));
    mockCommentReplyRepository.addCommentReply = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedCommentReply));

    /** create use case instance */
    const addCommentReplyUseCase = new AddCommentReplyUseCase({
      commentReplyRepository: mockCommentReplyRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
    });

    // Action
    const addedComment = await addCommentReplyUseCase.execute(
      useCasePayload,
      useCaseThreadId.id,
      useCaseCommentId.id,
      useCaseCredential.id,
    );

    // Assert
    expect(addedComment).toStrictEqual(
      new AddedCommentReply({
        id: 'reply-123',
        content: useCasePayload.content,
        owner: useCaseCredential.id,
      }),
    );

    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCaseThreadId.id);
    expect(mockUserRepository.getUserById).toBeCalledWith(useCaseCredential.id);
    expect(mockCommentReplyRepository.addCommentReply).toBeCalledWith(
      new NewCommentReply({
        content: useCasePayload.content,
      }).content,
      useCaseThreadId.id,
      useCaseCommentId.id,
      useCaseCredential.id,
    );
  });
});
