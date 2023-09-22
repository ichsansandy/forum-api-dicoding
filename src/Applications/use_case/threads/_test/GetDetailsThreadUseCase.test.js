const CommentReplyRepository = require('../../../../Domains/comment_replies/CommentReplyRepository');
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const UserRepository = require('../../../../Domains/users/UserRepository');

const ThreadDetails = require('../../../../Domains/threads/entities/ThreadDetails');
const CommentDetails = require('../../../../Domains/comments/entities/CommentDetails');
const CommentReplyDetails = require('../../../../Domains/comment_replies/entities/CommentReplyDetails');

const GetDetailsThreadUseCase = require('../GetDetailsThreadUseCase');

describe('GetDetailsThreadUseCase', () => {
  /**
   * Testing the get thread details use case
   * can orchestra step by step
   * for adding the new thread details correctly
   */
  it('should orchestrating get the details thread', async () => {
    // Arrange
    const userArnold = {
      id: 'user-111',
      username: 'Arnold Szechuan',
    };

    const userDhh = {
      id: 'user-222',
      username: 'DHH',
    };

    const mockThreadData = {
      id: 'thread-123',
      title: 'this is title thread',
      body: 'this is body',
      created_at: '2023-07-18 20:38:31.448',
      user_id: 'user-111',
    };

    const commentData = [
      {
        id: 'comment-123',
        content: 'this is first',
        created_at: '2023-08-17 20:38:31.448',
        user_id: 'user-111',
        thread_id: 'thread-123',
      },
      {
        id: 'comment-222',
        content: 'this is second without reply',
        created_at: '2023-08-17 20:38:31.448',
        user_id: 'user-111',
        thread_id: 'thread-123',
      },
      {
        id: 'comment-222',
        content: 'this is third without reply',
        created_at: '2023-08-17 20:38:31.448',
        user_id: 'user-111',
        thread_id: 'thread-123',
      },
    ];

    const replyData = [
      {
        id: 'reply-123',
        content: 'this is first reply',
        created_at: '2023-08-18 20:38:31.448',
        user_id: 'user-222',
        comment_id: 'comment-123',
      },
      {
        id: 'reply-124',
        content: 'this is second reply',
        created_at: '2023-08-18 20:38:31.448',
        user_id: 'user-111',
        comment_id: 'comment-123',
      },
      {
        id: 'reply-124',
        content: 'this is third reply',
        created_at: '2023-08-18 20:38:31.448',
        user_id: 'user-111',
        comment_id: 'comment-123',
      },
      {
        id: 'reply-124',
        content: 'this is fourth reply',
        created_at: '2023-08-18 20:38:31.448',
        user_id: 'user-111',
        comment_id: 'comment-123',
      },
    ];

    /** creting dependency of use case */
    const mockCommentReplyRepository = new CommentReplyRepository();
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockUserRepository = new UserRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(mockThreadData));
    mockUserRepository.getUserById = jest.fn().mockImplementation((userId) => {
      if (userId === 'user-111') {
        return Promise.resolve(userArnold);
      }
      if (userId === 'user-222') {
        return Promise.resolve(userDhh);
      }
    });
    mockCommentRepository.getCommentByThreadId = jest.fn().mockImplementation(() => Promise.resolve(commentData));
    mockCommentReplyRepository.getCommentReplyByCommentId = jest.fn().mockImplementation((commentId) => {
      if (commentId === 'comment-123') {
        return Promise.resolve(replyData);
      }
      return Promise.resolve([]);
    });

    /** create use case instance */
    const getDetailsThreadUseCase = new GetDetailsThreadUseCase({
      commentReplyRepository: mockCommentReplyRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
    });

    // Action
    const threadDetails = await getDetailsThreadUseCase.execute('thread-123');
    // Assert
    expect(threadDetails.comments).toHaveLength(3);
    expect(threadDetails.comments[0].replies).toHaveLength(4);
    expect(threadDetails.comments[0].replies[0].username).toBe(userDhh.username);
    expect(threadDetails.comments[0].replies[1].username).toBe(userArnold.username);
  });
  it('should orchestrating get the details thread if there no comment', async () => {
    // Arrange
    const userArnold = {
      id: 'user-111',
      username: 'Arnold Szechuan',
    };

    const userDhh = {
      id: 'user-222',
      username: 'DHH',
    };

    const mockThreadData = {
      id: 'thread-123',
      title: 'this is title thread',
      body: 'this is body',
      created_at: '2023-07-18 20:38:31.448',
      user_id: 'user-111',
    };

    const commentData = [];

    /** creting dependency of use case */
    const mockCommentReplyRepository = new CommentReplyRepository();
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockUserRepository = new UserRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(mockThreadData));
    mockUserRepository.getUserById = jest.fn().mockImplementation((userId) => {
      if (userId === 'user-111') {
        return Promise.resolve(userArnold);
      }
      if (userId === 'user-222') {
        return Promise.resolve(userDhh);
      }
    });
    mockCommentRepository.getCommentByThreadId = jest.fn().mockImplementation(() => Promise.resolve(commentData));

    /** create use case instance */
    const getDetailsThreadUseCase = new GetDetailsThreadUseCase({
      commentReplyRepository: mockCommentReplyRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
    });

    // Action
    const threadDetails = await getDetailsThreadUseCase.execute('thread-123');
    // Assert
    expect(threadDetails.comments).toHaveLength(0);
  });
});
