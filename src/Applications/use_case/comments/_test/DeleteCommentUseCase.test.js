const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const OwnerValidator = require('../../../security/OwnerValidator');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  /**
   * Testing the comment use case
   * can orchestra step by step
   * for adding the delete comment correctly
   */

  it('should orchestrating the delete comment', async () => {
    // Arrange
    const useCaseCommentId = 'comment-212';
    const useCaseThreadId = 'thread-212';
    const useCaseCredential = 'user-212';

    const commentAvailable = {
      id: useCaseCommentId,
      user_id: useCaseCredential,
    };

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockOwnerValidator = new OwnerValidator();

    /** mocking needed fucntion */
    mockCommentRepository.getCommentById = jest.fn().mockImplementation(() => Promise.resolve(commentAvailable));
    mockOwnerValidator.verifyOwner = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteComment = jest.fn().mockImplementation(() => Promise.resolve());

    /** create use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      ownerValidator: mockOwnerValidator,
    });

    // Action
    await deleteCommentUseCase.execute(useCaseCommentId, useCaseThreadId, useCaseCredential);

    // Assert
    expect(mockCommentRepository.getCommentById).toBeCalledWith(useCaseCommentId);
    expect(mockOwnerValidator.verifyOwner).toBeCalledWith(useCaseCredential, commentAvailable.user_id, 'comment');
  });
});
