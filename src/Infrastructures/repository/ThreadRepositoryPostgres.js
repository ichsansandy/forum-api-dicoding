const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const AddedThread = require('../../Domains/threads/entities/AddedThread');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addNewThread(thread, ownerId) {
    const { title, body } = thread;
    const id = `thread-${this._idGenerator()}`;
    const time = new Date();

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) Returning id, title, user_id',
      values: [id, title, body, time, ownerId],
    };

    const result = await this._pool.query(query);

    return new AddedThread({ id: result.rows[0].id, title: result.rows[0].title, owner: result.rows[0].user_id });
  }

  async getThreadById(threadId) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread not found');
    }

    const thread = result.rows[0];

    return thread;
  }
}

module.exports = ThreadRepositoryPostgres;
