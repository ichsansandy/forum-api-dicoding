/* istanbul ignore file */
const ServerInjectionFunctionHelper = {
  async injection(server, options) {
    return await server.inject(options);
  },

  addUserOption(payload) {
    return {
      method: 'POST',
      url: '/users',
      payload: payload,
    };
  },

  addAuthOption(payload) {
    return {
      method: 'POST',
      url: '/authentications',
      payload: payload,
    };
  },

  addThreadOption(payload, auth) {
    return {
      method: 'POST',
      url: '/threads',
      payload: payload,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
  },

  addCommentOption(payload, auth, threadId) {
    return {
      method: 'POST',
      url: `/threads/${threadId}/comments`,
      payload: payload,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
  },

  addCommentReplyOption(payload, auth, threadId, commentId) {
    return {
      method: 'POST',
      url: `/threads/${threadId}/comments/${commentId}/replies`,
      payload: payload,
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
  },
};

module.exports = ServerInjectionFunctionHelper;
