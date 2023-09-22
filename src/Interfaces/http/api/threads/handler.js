const AddThreadUseCase = require('../../../../Applications/use_case/threads/AddThreadUseCase');
const GetDetailsThreadUseCase = require('../../../../Applications/use_case/threads/GetDetailsThreadUseCase');

class ThreadHandler {
  constructor(container) {
    this._containter = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadDetailsHandler = this.getThreadDetailsHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const addThreadUseCase = this._containter.getInstance(AddThreadUseCase.name);
    const { id: userId } = request.auth.credentials;
    const addedThread = await addThreadUseCase.execute(request.payload, userId);
    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadDetailsHandler(request, h) {
    const getDetailsThreadUseCase = this._containter.getInstance(GetDetailsThreadUseCase.name);
    const { threadId } = request.params;
    const thread = await getDetailsThreadUseCase.execute(threadId);
    const response = h.response({
      status: 'success',
      data: { thread },
    });

    return response;
  }
}

module.exports = ThreadHandler;
