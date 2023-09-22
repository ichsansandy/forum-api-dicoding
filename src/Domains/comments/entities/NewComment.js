class NewComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { content } = payload;
    this.content = content;
  }

  _verifyPayload({ content }) {
    if (!content) {
      throw new Error('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string') {
      throw new Error('NEW_COMMENT.PROPERTY_HAVE_WRONG_DATA_TYPE');
    }

    if (content.trim().length === 0) {
      throw new Error('NEW_COMMENT.CANNOT_BE_EMPTY_STRING');
    }
  }
}

module.exports = NewComment;
