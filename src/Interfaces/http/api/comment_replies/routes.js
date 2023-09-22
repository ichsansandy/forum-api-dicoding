const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.postCommentReplyHandler,
    options: {
      auth: 'forum_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{commentReplyId}',
    handler: handler.deleteCommentReplyHandler,
    options: {
      auth: 'forum_jwt',
    },
  },
];

module.exports = routes;
