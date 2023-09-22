const NewComment = require('../NewComment');

describe('a NewComment entities', () => {
  it('should throw error when payload did not contain right property', () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new NewComment(payload)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload contain wrong data type', () => {
    // Arrange
    const payload = {
      content: 123,
    };

    // Action and Assert
    expect(() => new NewComment(payload)).toThrowError('NEW_COMMENT.PROPERTY_HAVE_WRONG_DATA_TYPE');
  });

  it('should throw error when payload is empty string', () => {
    // Arrange
    const payload = {
      content: '    ',
    };

    // Action and Assert
    expect(() => new NewComment(payload)).toThrowError('NEW_COMMENT.CANNOT_BE_EMPTY_STRING');
  });

  it('should create newComment object correctly', () => {
    // Arrange
    const payload = {
      content: 'this is content',
    };

    // Action
    const newComment = new NewComment(payload);

    // Assert
    expect(newComment.content).toEqual(payload.content);
  });
});
