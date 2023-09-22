const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const OwnerValidatorManager = require('../OwnerValidatorManager');

describe('OwnerValidationManager', () => {
  it('should throw Authorization Error when its not the owner', async () => {
    // Arrange
    const ownerValidatorManager = new OwnerValidatorManager();
    const credentialId = 'user-111';
    const ownerId = 'user-007';

    // Action and Assert
    await expect(ownerValidatorManager.verifyOwner(credentialId, ownerId, 'comment')).rejects.toThrowError(
      AuthorizationError,
    );
  });

  it('should not throw anything if owner and credential is same', async () => {
    // Arrange
    const ownerValidatorManager = new OwnerValidatorManager();
    const credentialId = 'user-111';
    const ownerId = 'user-111';

    // Action and Assert
    await expect(ownerValidatorManager.verifyOwner(credentialId, ownerId, 'comment')).resolves.toBeUndefined();
  });
});
