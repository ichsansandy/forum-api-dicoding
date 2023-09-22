const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada',
  ),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat user baru karena tipe data tidak sesuai',
  ),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError(
    'tidak dapat membuat user baru karena karakter username melebihi batas limit',
  ),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError(
    'tidak dapat membuat user baru karena username mengandung karakter terlarang',
  ),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'refresh token harus string',
  ),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'refresh token harus string',
  ),
  'NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('cannot make a new thread, payload not correct'),
  'NEW_THREAD.PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError(
    'cannot make a new thread, payload property have wrong data type',
  ),
  'NEW_THREAD.PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError('title exceed 50 character'),
  'NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('cannot make a new comment, payload not correct'),
  'NEW_COMMENT.PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError(
    'cannot make a new comment, payload property have wrong data type',
  ),
  'NEW_COMMENT_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('cannot make a new comment, payload not correct'),
  'NEW_COMMENT_REPLY.PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError(
    'cannot make a new comment, payload property have wrong data type',
  ),
  'THREAD_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'cannot make a new thread details payload not correct',
  ),
  'THREAD_DETAILS.PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError(
    'cannot make a new thread details, payload property have wrong data type',
  ),
  'COMMENT_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'cannot make a new COMMENT details payload not correct',
  ),
  'COMMENT_DETAILS.PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError(
    'cannot make a new COMMENT details, payload property have wrong data type',
  ),
  'COMMENT_REPLY_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'cannot make a new COMMENT REPLY details payload not correct',
  ),
  'COMMENT_REPLY_DETAILS.PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError(
    'cannot make a new COMMENT REPLY details, payload property have wrong data type',
  ),
};

module.exports = DomainErrorTranslator;
