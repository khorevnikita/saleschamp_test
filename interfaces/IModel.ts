export default interface IModel {

    readonly attributes: string[],

    getCollectionName(): string,

    isUsingTimestamps(): boolean,

    getTimestampsFormat(): string,
}