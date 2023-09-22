const AddedThread = require('../AddedThread')

describe('a AddedThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange

        const payload = {
            id:'thread-123',
            title:'This is title'
        }

        // Action and Assert
        expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    })

    it('should throw error when payload property did not meet data type needed', () => {
        // Arrange

        const payload = {
            id:'thread-123',
            title:'This is title',
            owner:123
        }

        // Action and Assert
        expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.PROPERTY_NOT_MEET_DATA_TYPE_NEEDED');
    })

    it('should create addedThread object correctly', () => {
        // Arrange
        const payload = {
            id:'thread-123',
            title:'This is title',
            owner:'user-123'
        };
    
        // Action
        const addedThread = new AddedThread(payload);
    
        // Assert
        expect(addedThread.id).toEqual(payload.id);
        expect(addedThread.title).toEqual(payload.title);
        expect(addedThread.owner).toEqual(payload.owner);
      });
    });
