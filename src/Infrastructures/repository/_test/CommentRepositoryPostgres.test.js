const ThreadsTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const pool = require('../../database/postgres/pool');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const CommentRepositoryPostgress = require('../CommentRepositoryPostgres');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('CommentRepositoryPostgres', () => {
  // Pre-requisite
  const userId = 'user-123';
  const threadId = 'thread-123';

  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: userId });
    await ThreadsTableTestHelper.addThread({ id: threadId, user_id: userId });
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist added comment', async () => {
      // Arrange
      const newComment = new NewComment({
        content: 'This is a comment',
      });

      const fakeIdGenerator = () => '222';
      const commentRepositoryPostgres = new CommentRepositoryPostgress(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(newComment.content, threadId, userId);

      // Assert
      const comment = await CommentsTableTestHelper.getCommentById('comment-222');

      expect(comment).toHaveLength(1);
    });

    it('should return added comment correctly', async () => {
      // Arrange
      const newComment = new NewComment({
        content: 'This is a comment',
      });

      const fakeIdGenerator = () => '222';
      const commentRepositoryPostgres = new CommentRepositoryPostgress(pool, fakeIdGenerator);

      // Action
      const addedComment = await commentRepositoryPostgres.addComment(newComment.content, threadId, userId);

      // Assert

      expect(addedComment).toStrictEqual(
        new AddedComment({
          id: 'comment-222',
          content: 'This is a comment',
          owner: userId,
        }),
      );
    });
  });

  describe('getCommentById', () => {
    it('should return NotFoundError when comment not found', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgress(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.getCommentById('wrong-comment')).rejects.toThrowError(NotFoundError);
    });

    it('should return comment correctly', async () => {
      // Arrange
      await CommentsTableTestHelper.addComment({ id: 'comment-333', user_id: userId, thread_id: threadId });
      const commentRepositoryPostgres = new CommentRepositoryPostgress(pool, {});

      // Action
      const comment = await commentRepositoryPostgres.getCommentById('comment-333');

      // Assert
      expect(comment.id).toEqual('comment-333');
      expect(comment.user_id).toEqual(userId);
      expect(comment.thread_id).toEqual(threadId);
    });
  });

  describe('getCommentByThreadId', () => {
    it('should return comments correctly', async () => {
      // Arrange
      await CommentsTableTestHelper.addComment({ id: 'comment-333', user_id: userId, thread_id: threadId });
      await CommentsTableTestHelper.addComment({ id: 'comment-222', user_id: userId, thread_id: threadId });
      await CommentsTableTestHelper.addComment({ id: 'comment-111', user_id: userId, thread_id: threadId });
      const commentRepositoryPostgres = new CommentRepositoryPostgress(pool, {});

      // Action
      const comments = await commentRepositoryPostgres.getCommentByThreadId(threadId);

      // Assert
      expect(comments).toHaveLength(3);
    });

    it('should return empty array if there is no comment correctly', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgress(pool, {});

      // Action
      const comments = await commentRepositoryPostgres.getCommentByThreadId(threadId);

      // Assert
      expect(Array.isArray(comments)).toBeTruthy;
      expect(comments).toHaveLength(0);
    });
  });

  describe('deleteComment', () => {
    it('should delete comment correctly and persist comment', async () => {
      // Arrange
      await CommentsTableTestHelper.addComment({
        id: 'comment-333',
        user_id: userId,
        thread_id: threadId,
        is_delete: false,
      });
      const commentRepositoryPostgres = new CommentRepositoryPostgress(pool, {});

      // Action
      await commentRepositoryPostgres.deleteComment('comment-333', threadId, userId);
      const deletedComment = await CommentsTableTestHelper.getCommentById('comment-333');

      // Assert
      expect(deletedComment[0].is_delete).toEqual(true);
      expect(deletedComment[0].content).toEqual('**komentar telah dihapus**');
    });

    it('should return InvariantError when failed to delete comment', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgress(pool, {});

      // Action & Assert
      await expect(
        commentRepositoryPostgres.deleteComment('comment-111', 'thread-121', 'user-123'),
      ).rejects.toThrowError(InvariantError);
    });
  });
});
