const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../../Domains/threads/entities/AddedThread');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  /**
   * Testing if the thread use case can orchestra step by step the
   * for adding new thread correctly
   */

  it('should orchestrating the add thread action correctly', async () => {
    // Arrange

    const useCasePayload = {
      title: 'Title for thread',
      body: 'This is body for thread',
    };

    const useCaseCredential = {
      id: 'user-123',
    };

    const mockAddedThread = new AddedThread({
      id: 'thread-123',
      title: 'Title for thread',
      owner: 'user-123',
    });

    /** creating dependency of use case*/

    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addNewThread = jest.fn().mockImplementation(() => Promise.resolve(mockAddedThread));

    /** creating use case instance */
    const getThreadUsecase = new AddThreadUseCase({ threadRepository: mockThreadRepository });

    //Action
    const addedThread = await getThreadUsecase.execute(useCasePayload, useCaseCredential);

    //Assert
    expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: 'Title for thread',
        owner: 'user-123',
      }))
    
    
  });
});
