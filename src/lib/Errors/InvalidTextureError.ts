
export default class InvalidTextureError extends Error {
    constructor(key: string) {
        super('Error retrieving texture ' + key);
    }
}
