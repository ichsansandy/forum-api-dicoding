class CommentReplyDetails {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id, content, date, username } = payload;
    this.id = id;
    this.content = content;
    this.date = date;
    this.username = username;
  }

  _verifyPayload({ id, content, date, username }) {
    if (!id || !content || !date || !username) {
      throw new Error('COMMENT_REPLY_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof content !== 'string' ||
      typeof date !== 'string' ||
      typeof username !== 'string'
    ) {
      throw new Error('COMMENT_REPLY_DETAILS.PROPERTY_HAVE_WRONG_DATA_TYPE');
    }
  }
}

module.exports = CommentReplyDetails;
