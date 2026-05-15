// Mediator: ChatRoom — координатор между Users.
// Пользователи общаются только через комнату, не имеют ссылок друг на друга.

export interface ChatMessage {
  from: string;
  to: string | 'all';
  body: string;
}

// TODO: реализовать ChatRoom.
// - join(user): зарегистрировать пользователя в комнате
// - leave(name): убрать пользователя
// - broadcast(from, body): доставить сообщение всем кроме отправителя
// - send(from, to, body): доставить ровно адресату
// Если from/to не зарегистрирован — кинуть ошибку.
export class ChatRoom {
  private readonly users = new Map<string, ChatUser>();

  public join(_user: ChatUser): void {
    throw new Error('ChatRoom.join is not implemented yet');
  }

  public leave(_name: string): void {
    throw new Error('ChatRoom.leave is not implemented yet');
  }

  public broadcast(_from: string, _body: string): void {
    throw new Error('ChatRoom.broadcast is not implemented yet');
  }

  public send(_from: string, _to: string, _body: string): void {
    throw new Error('ChatRoom.send is not implemented yet');
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

  // Зовётся комнатой при доставке сообщения.
  public receive(message: ChatMessage): void {
    this.received.push(message);
  }
}
