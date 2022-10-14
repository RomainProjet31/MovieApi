export class Message {
    messages = ['Ah bah bravo mon cochon !!!', 'C\'est qu\'il en redemande', 'Bon ok'];
    currentIndex: number;

    constructor() {
        this.currentIndex = 0;
        console.log("init");

    }

    getMessage(): string {
        let messageToReturn: string;
        if (this.currentIndex < this.messages.length) {
            messageToReturn = this.messages[this.currentIndex];
            this.currentIndex++;
        } else {
            messageToReturn = '';
        }
        return messageToReturn;
    }

    reset() {
        this.currentIndex = 0;
    }

}