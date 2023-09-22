const NewCommentReply = require('../NewCommentReply');

describe('a NewCommentReply entities', () => {
  it('should throw error when payload did not contain right property', () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new NewCommentReply(payload)).toThrowError('NEW_COMMENT_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload contain wrong data type', () => {
    // Arrange
    const payload = {
      content: 123,
    };

    // Action and Assert
    expect(() => new NewCommentReply(payload)).toThrowError('NEW_COMMENT_REPLY.PROPERTY_HAVE_WRONG_DATA_TYPE');
  });

  it('should throw error when payload is empty string', () => {
    // Arrange
    const payload = {
      content: '    ',
    };

    // Action and Assert
    expect(() => new NewCommentReply(payload)).toThrowError('NEW_COMMENT_REPLY.CANNOT_BE_EMPTY_STRING');
  });

  it('should create newCommentReply object correctly', () => {
    // Arrange
    const payload = {
      content: 'this is content',
    };

    // Action
    const newCommentReply = new NewCommentReply(payload);

    // Assert
    expect(newCommentReply.content).toEqual(payload.content);
  });
});
