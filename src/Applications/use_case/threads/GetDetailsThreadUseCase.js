const ThreadDetails = require('../../../Domains/threads/entities/ThreadDetails');
const CommentDetails = require('../../../Domains/comments/entities/CommentDetails');
const CommentReplyDetails = require('../../../Domains/comment_replies/entities/CommentReplyDetails');

class GetDetailsThreadUseCase {
  constructor({ userRepository, threadRepository, commentRepository, commentReplyRepository }) {
    this._userRepository = userRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._commentReplyRepository = commentReplyRepository;
  }

  async execute(useCaseThreadId) {
    // get thread
    const threadFromDb = await this._threadRepository.getThreadById(useCaseThreadId);
    const { username: threadUsername } = await this._userRepository.getUserById(threadFromDb.user_id);
    const thread = new ThreadDetails({
      id: threadFromDb.id,
      title: threadFromDb.title,
      body: threadFromDb.body,
      date: threadFromDb.created_at.toString(),
      username: threadUsername,
      comments: [],
    });
    // get comments by thread
    const commentsInThread = await this._commentRepository.getCommentByThreadId(thread.id);
    // get comment replies by comment
    if (commentsInThread.length > 0) {
      for (const commentData of commentsInThread) {
        const { username: commentUsername } = await this._userRepository.getUserById(commentData.user_id);
        const commentDetails = new CommentDetails({
          id: commentData.id,
          content: commentData.content,
          date: commentData.created_at.toString(),
          username: commentUsername,
          replies: [],
        });

        const repliesInComment = await this._commentReplyRepository.getCommentReplyByCommentId(commentData.id);

        if (repliesInComment.length > 0) {
          for (const replyData of repliesInComment) {
            const { username: replyUsername } = await this._userRepository.getUserById(replyData.user_id);
            const commentReplyDetails = new CommentReplyDetails({
              id: replyData.id,
              content: replyData.content,
              date: replyData.created_at.toString(),
              username: replyUsername,
            });

            commentDetails.replies.push(commentReplyDetails);
          }
        }

        thread.comments.push(commentDetails);
      }
    }
    return thread;
  }
}

module.exports = GetDetailsThreadUseCase;
