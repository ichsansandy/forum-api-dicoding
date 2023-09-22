const NewCommentReply = require('../../../Domains/comment_replies/entities/NewCommentReply');

class AddCommentReplyUseCase {
  constructor({ commentReplyRepository, commentRepository, threadRepository, userRepository }) {
    this._commentReplyRepository = commentReplyRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload, useCaseThreadId, useCaseCommentId, useCaseCredential) {
    const { content } = new NewCommentReply(useCasePayload);
    // get comment and also to verify it
    const comment = await this._commentRepository.getCommentById(useCaseCommentId);
    // get thread and also to verify it
    const thread = await this._threadRepository.getThreadById(useCaseThreadId);
    // get user and also to verify it
    const user = await this._userRepository.getUserById(useCaseCredential);

    return await this._commentReplyRepository.addCommentReply(content, thread.id, comment.id, user.id);
  }
}

module.exports = AddCommentReplyUseCase;
