export class GameObject {
    constructor(physicalBody) {
        this.body = physicalBody;
        this.body.gameObject = this;
    }
}