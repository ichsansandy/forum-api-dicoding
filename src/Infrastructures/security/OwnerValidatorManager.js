const OwnerValidator = require('../../Applications/security/OwnerValidator');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class OwnerValidatorManager extends OwnerValidator {
    async verifyOwner(credentialId, ownerId, entityType) {
        if (credentialId !== ownerId) {
            throw new AuthorizationError(`not the owner of ${entityType}`)
        }
    }
}

module.exports = OwnerValidatorManager;
