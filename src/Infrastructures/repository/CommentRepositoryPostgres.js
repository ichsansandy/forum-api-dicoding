const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const AddedComment = require('../../Domains/comments/entities/AddedComment');

class CommentRepositoryPostgress extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(commentContent, threadId, ownerId) {
    const id = `comment-${this._idGenerator()}`;
    const created_at = new Date();
    const is_delete = false;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) Returning id, content, user_id',
      values: [id, commentContent, created_at, ownerId, threadId, is_delete],
    };

    const result = await this._pool.query(query);

    return new AddedComment({ id: result.rows[0].id, content: result.rows[0].content, owner: result.rows[0].user_id });
  }

  async getCommentById(commentId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('comment not found');
    }

    const comment = result.rows[0];

    return comment;
  }

  async getCommentByThreadId(threadId) {
    const query = {
      text: 'SELECT * FROM comments WHERE thread_id = $1 ORDER BY created_at ASC',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      return [];
    }
    
    return result.rows;
  }

  async deleteComment(commentId, threadId, ownerId) {
    const deletedContent = '**komentar telah dihapus**';

    const query = {
      text: 'UPDATE comments SET content = $1, is_delete = true WHERE id = $2 AND thread_id = $3 AND user_id = $4 RETURNING id',
      values: [deletedContent, commentId, threadId, ownerId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('failed to delete comment');
    }
  }
}

module.exports = CommentRepositoryPostgress;
