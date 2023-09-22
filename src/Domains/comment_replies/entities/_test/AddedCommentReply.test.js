const AddedCommentReply = require('../AddedCommentReply');

describe('a AddedCommentReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange

    const payload = {
      id: 'thread-123',
      title: 'This is title',
      user: 'dad',
    };

    // Action and Assert
    expect(() => new AddedCommentReply(payload)).toThrowError('ADDED_COMMENT_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload property did not meet data type needed', () => {
    // Arrange

    const payload = {
      id: 'thread-123',
      content: 'This is title',
      owner: 123,
    };

    // Action and Assert
    expect(() => new AddedCommentReply(payload)).toThrowError('ADDED_COMMENT_REPLY.PROPERTY_NOT_MEET_DATA_TYPE_NEEDED');
  });

  it('should create addedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'This is content',
      owner: 'user-123',
    };

    // Action
    const addedCommentReply = new AddedCommentReply(payload);

    // Assert
    expect(addedCommentReply.id).toEqual(payload.id);
    expect(addedCommentReply.content).toEqual(payload.content);
    expect(addedCommentReply.owner).toEqual(payload.owner);
  });
});
