export interface ChatMessage {
  from: string;
  to: string | 'all';
  body: string;
}

export class ChatRoom {
  private readonly users = new Map<string, ChatUser>();

  public join(user: ChatUser): void {
    this.users.set(user.name, user);
  }

  public leave(name: string): void {
    this.users.delete(name);
  }

  public broadcast(from: string, body: string): void {
    if (!this.users.has(from)) {
      throw new Error(`ChatRoom.broadcast: unknown sender "${from}"`);
    }
    for (const [name, user] of this.users) {
      if (name === from) continue;
      user.receive({ from, to: 'all', body });
    }
  }

  public send(from: string, to: string, body: string): void {
    if (!this.users.has(from)) {
      throw new Error(`ChatRoom.send: unknown sender "${from}"`);
    }
    const recipient = this.users.get(to);
    if (!recipient) {
      throw new Error(`ChatRoom.send: unknown recipient "${to}"`);
    }
    recipient.receive({ from, to, body });
  }
}

export class ChatUser {
  public readonly received: ChatMessage[] = [];
  public constructor(
    public readonly name: string,
    private readonly room: ChatRoom,
  ) {}

  public say(body: string): void {
    this.room.broadcast(this.name, body);
  }

  public whisper(to: string, body: string): void {
    this.room.send(this.name, to, body);
  }

  public receive(message: ChatMessage): void {
    this.received.push(message);
  }
}
