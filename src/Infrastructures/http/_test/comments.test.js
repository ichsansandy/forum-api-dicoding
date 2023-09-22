const pool = require('../../database/postgres/pool');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const {
  injection,
  addUserOption,
  addThreadOption,
  addAuthOption,
  addCommentOption,
} = require('../../../../tests/ServerInjectionFunctionHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/threads/{threadId}/comments endpoint', () => {
  // Pre-requisite payload
  const threadPayload = {
    title: 'First Thread',
    body: 'This is first thread',
  };

  const userPayload = {
    username: 'dicoding',
    password: 'secret',
    fullname: 'Dicoding Indonesia',
  };

  const notOwnerPayload = {
    username: 'ichsan',
    password: 'secret',
    fullname: 'Ichsan Sandy',
  };

  const loginPayload = {
    username: 'dicoding',
    password: 'secret',
  };

  const notOwnerLoginPayload = {
    username: 'ichsan',
    password: 'secret',
  };

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });
  afterAll(async () => {
    await pool.end();
  });

  describe('when POST /comments', () => {
    it('should response 201 and return correct added comment', async () => {
      // Arrange
      const server = await createServer(container);
      const requestPayload = {
        content: 'This is comment',
      };

      // Add account
      await injection(server, addUserOption(userPayload));

      // login
      const auth = await injection(server, addAuthOption(loginPayload));

      const {
        data: { accessToken },
      } = JSON.parse(auth.payload);

      // add thread
      const thread = await injection(server, addThreadOption(threadPayload, accessToken));

      const {
        data: {
          addedThread: { id },
        },
      } = JSON.parse(thread.payload);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${id}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      //Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment).toBeDefined();
    });
  });

  describe('when delete /comments/{commentId}', () => {
    it('should response 200 with status success', async () => {
      // Arrange
      const server = await createServer(container);
      const commentPayload = {
        content: 'This is comment',
      };

      // Add account
      await injection(server, addUserOption(userPayload));

      // login
      const auth = await injection(server, addAuthOption(loginPayload));

      const {
        data: { accessToken },
      } = JSON.parse(auth.payload);

      // add thread
      const thread = await injection(server, addThreadOption(threadPayload, accessToken));

      const threadId = JSON.parse(thread.payload).data.addedThread.id;

      const commentAdded = await injection(server, addCommentOption(commentPayload, accessToken, threadId));

      const commentId = JSON.parse(commentAdded.payload).data.addedComment.id;

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      //Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should throw 403 if user not the owner', async () => {
      // Arrange
      const server = await createServer(container);
      const commentPayload = {
        content: 'This is comment',
      };

      // Add account
      await injection(server, addUserOption(userPayload));
      await injection(server, addUserOption(notOwnerPayload));

      // login
      const authOwner = await injection(server, addAuthOption(loginPayload));
      const authNotOwner = await injection(server, addAuthOption(notOwnerLoginPayload));

      const ownerToken = JSON.parse(authOwner.payload).data.accessToken;
      const notOwnerToken = JSON.parse(authNotOwner.payload).data.accessToken;

      // add thread
      const thread = await injection(server, addThreadOption(threadPayload, ownerToken));
      const threadId = JSON.parse(thread.payload).data.addedThread.id;

      // add comment
      const commentAdded = await injection(server, addCommentOption(commentPayload, ownerToken, threadId));
      const commentId = JSON.parse(commentAdded.payload).data.addedComment.id;

      // Action && Assert
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${notOwnerToken}`,
        },
      });
      
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
    });
  });
});
