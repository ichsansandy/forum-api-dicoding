const ThreadDetails = require('../ThreadDetails');

describe('a ThreadDetails', () => {
  it('should throw error when payload did not contain right property', () => {
    // Arrange
    const payload = {
      title: 'something',
      body: 'something',
      date: 'something',
      username: 'something',
      comments: [],
    };

    // Action and Assert
    expect(() => new ThreadDetails(payload)).toThrowError('THREAD_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload contain wrong data type', () => {
    // Arrange
    const payload = {
      id: 'something',
      title: 'something',
      body: 'something',
      date: 'something',
      username: 'something',
      comments: '[]',
    };

    // Action and Assert
    expect(() => new ThreadDetails(payload)).toThrowError('THREAD_DETAILS.PROPERTY_HAVE_WRONG_DATA_TYPE');
  });

  it('should throw error when payload contain wrong data type', () => {
    // Arrange
    const payload = {
      id: 'something',
      title: 'something',
      body: 'something',
      date: 'something',
      username: 'something',
      comments: [],
    };

    // Action and Assert
    const threadDetails = new ThreadDetails(payload);
    expect(threadDetails).toBeDefined();
  });
});
