const ThreadsTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const CommentRepliesTableTestHelper = require('../../../../tests/CommentRepliesTableTestHelper');
const pool = require('../../database/postgres/pool');
const NewCommentReply = require('../../../Domains/comment_replies/entities/NewCommentReply');
const CommentReplyRepositoryPostgress = require('../CommentReplyRepositoryPostgres');
const AddedCommentReply = require('../../../Domains/comment_replies/entities/AddedCommentReply');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('CommentReplyRepositoryPostgres', () => {
  // Pre-requisite
  const userId = 'user-123';
  const threadId = 'thread-123';
  const commentId = 'comment-123';

  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: userId });
    await ThreadsTableTestHelper.addThread({ id: threadId, user_id: userId });
    await CommentsTableTestHelper.addComment({ id: commentId, user_id: userId, thread_id: threadId });
  });

  afterEach(async () => {
    await CommentRepliesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await CommentsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addCommentReply function', () => {
    it('should persist added comment reply', async () => {
      // Arrange
      const newCommentReply = new NewCommentReply({
        content: 'This is a reply',
      });

      const fakeIdGenerator = () => '222';
      const commentReplyRepositoryPostgres = new CommentReplyRepositoryPostgress(pool, fakeIdGenerator);

      // Action
      await commentReplyRepositoryPostgres.addCommentReply(newCommentReply.content, threadId, commentId, userId);

      // Assert
      const comment = await CommentRepliesTableTestHelper.getCommentReplyById('reply-222');

      expect(comment).toHaveLength(1);
    });

    it('should return added comment reply correctly', async () => {
      // Arrange
      const newCommentReply = new NewCommentReply({
        content: 'This is a reply',
      });

      const fakeIdGenerator = () => '222';
      const commentReplyRepositoryPostgres = new CommentReplyRepositoryPostgress(pool, fakeIdGenerator);

      // Action
      const addedCommentReply = await commentReplyRepositoryPostgres.addCommentReply(
        newCommentReply.content,
        threadId,
        commentId,
        userId,
      );

      // Assert

      expect(addedCommentReply).toStrictEqual(
        new AddedCommentReply({
          id: 'reply-222',
          content: 'This is a reply',
          owner: userId,
        }),
      );
    });
  });

  describe('getCommentReplyById', () => {
    it('should return NotFoundError when comment not found', async () => {
      // Arrange
      const commentReplyRepositoryPostgres = new CommentReplyRepositoryPostgress(pool, {});

      // Action & Assert
      await expect(commentReplyRepositoryPostgres.getCommentReplyById('wrong-comment')).rejects.toThrowError(
        NotFoundError,
      );
    });

    it('should return comment correctly', async () => {
      // Arrange
      await CommentRepliesTableTestHelper.addCommentReply({
        id: 'reply-333',
        user_id: userId,
        thread_id: threadId,
        comment_id: commentId,
      });
      const commentReplyRepositoryPostgres = new CommentReplyRepositoryPostgress(pool, {});

      // Action
      const comment = await commentReplyRepositoryPostgres.getCommentReplyById('reply-333');

      // Assert
      expect(comment.id).toEqual('reply-333');
      expect(comment.user_id).toEqual(userId);
      expect(comment.thread_id).toEqual(threadId);
      expect(comment.comment_id).toEqual(commentId);
    });
  });

  describe('getCommentReplyByCommentId', () => {
    it('should return empty array when comment not found', async () => {
      // Arrange
      const commentReplyRepositoryPostgres = new CommentReplyRepositoryPostgress(pool, {});

      // Action
      const commentReplies = await commentReplyRepositoryPostgres.getCommentReplyByCommentId(commentId);

      // Assert
      expect(Array.isArray(commentReplies)).toBeTruthy();
      expect(commentReplies).toHaveLength(0);
    });

    it('should return comment correctly', async () => {
      // Arrange
      await CommentRepliesTableTestHelper.addCommentReply({
        id: 'reply-333',
        comment_id: commentId,
      });
      await CommentRepliesTableTestHelper.addCommentReply({
        id: 'reply-222',
        comment_id: commentId,
      });
      await CommentRepliesTableTestHelper.addCommentReply({
        id: 'reply-111',
        comment_id: commentId,
      });

      const commentReplyRepositoryPostgres = new CommentReplyRepositoryPostgress(pool, {});

      // Action
      const comments = await commentReplyRepositoryPostgres.getCommentReplyByCommentId(commentId);

      // Assert
      expect(comments).toHaveLength(3);
    });
  });

  describe('deleteComment', () => {
    it('should delete comment correctly and persist comment', async () => {
      // Arrange
      await CommentRepliesTableTestHelper.addCommentReply({
        id: 'reply-333',
        user_id: userId,
        thread_id: threadId,
        comment_id: commentId,
        is_delete: false,
      });
      const commentReplyRepositoryPostgres = new CommentReplyRepositoryPostgress(pool, {});

      // Action
      await commentReplyRepositoryPostgres.deleteCommentReply('reply-333', threadId, commentId, userId);
      const deletedCommentReply = await CommentRepliesTableTestHelper.getCommentReplyById('reply-333');

      // Assert
      expect(deletedCommentReply[0].is_delete).toEqual(true);
      expect(deletedCommentReply[0].content).toEqual('**balasan telah dihapus**');
    });

    it('should return InvariantError when failed to delete comment', async () => {
      // Arrange
      const commentReplyRepositoryPostgres = new CommentReplyRepositoryPostgress(pool, {});

      // Action & Assert
      await expect(
        commentReplyRepositoryPostgres.deleteCommentReply('reply-333', 'thread-121', 'comment-111', 'user-123'),
      ).rejects.toThrowError(InvariantError);
    });
  });
});
