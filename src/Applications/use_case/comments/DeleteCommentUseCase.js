class DeleteCommentUseCase {
  constructor({ commentRepository, ownerValidator }) {
    this._commentRepository = commentRepository;
    this._ownerValidator = ownerValidator;
  }

  async execute(useCaseCommentId, useCaseThreadId, useCaseCredential) {
    // get comment and also verify it
    const comment = await this._commentRepository.getCommentById(useCaseCommentId);
    // verify the owner of the comment
    await this._ownerValidator.verifyOwner(useCaseCredential, comment.user_id, 'comment');
    // delete comment
    return await this._commentRepository.deleteComment(comment.id, useCaseThreadId, useCaseCredential);
  }
}

module.exports = DeleteCommentUseCase;
