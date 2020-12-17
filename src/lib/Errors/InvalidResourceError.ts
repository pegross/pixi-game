
export default class InvalidResourceError extends Error {
    constructor(key: string) {
        super('Error retrieving resource ' + key);
    }
}
