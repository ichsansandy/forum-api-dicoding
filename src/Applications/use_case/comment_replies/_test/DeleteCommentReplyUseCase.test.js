const CommentReplyRepository = require('../../../../Domains/comment_replies/CommentReplyRepository');
const OwnerValidator = require('../../../security/OwnerValidator');
const DeleteCommentReplyUseCase = require('../DeleteCommentReplyUseCase');

describe('DeleteCommentReplyUseCase', () => {
  /**
   * Testing the comment use case
   * can orchestra step by step
   * for adding the delete comment correctly
   */

  it('should orchestrating the delete comment reply', async () => {
    // Arrange
    const useCaseCommentReplyId = 'reply-212';
    const useCaseCommentId = 'comment-212';
    const useCaseThreadId = 'thread-212';
    const useCaseCredential = 'user-212';

    const commentAvailable = {
      id: useCaseCommentReplyId,
      user_id: useCaseCredential,
    };

    /** creating dependency of use case */
    const mockCommentReplyRepository = new CommentReplyRepository();
    const mockOwnerValidator = new OwnerValidator();

    /** mocking needed fucntion */
    mockCommentReplyRepository.getCommentReplyById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(commentAvailable));
    mockOwnerValidator.verifyOwner = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentReplyRepository.deleteCommentReply = jest.fn().mockImplementation(() => Promise.resolve());

    /** create use case instance */
    const deleteCommentReplyUseCase = new DeleteCommentReplyUseCase({
      commentReplyRepository: mockCommentReplyRepository,
      ownerValidator: mockOwnerValidator,
    });

    // Action
    await deleteCommentReplyUseCase.execute(
      useCaseCommentReplyId,
      useCaseThreadId,
      useCaseCommentId,
      useCaseCredential,
    );

    // Assert
    expect(mockCommentReplyRepository.getCommentReplyById).toBeCalledWith(useCaseCommentReplyId);
    expect(mockOwnerValidator.verifyOwner).toBeCalledWith(useCaseCredential, commentAvailable.user_id, 'comment reply');
  });
});
