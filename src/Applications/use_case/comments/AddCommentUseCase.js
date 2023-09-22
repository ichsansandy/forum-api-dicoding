const NewComment = require('../../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository, userRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload, useCaseThreadId, useCaseCredential) {
    const { content } = new NewComment(useCasePayload);
    // get thread and also to verify it
    const thread = await this._threadRepository.getThreadById(useCaseThreadId);
    // get user and also to verify it
    const user = await this._userRepository.getUserById(useCaseCredential);

    return await this._commentRepository.addComment(content, thread.id, user.id);
  }
}

module.exports = AddCommentUseCase;
