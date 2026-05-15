import { expectTypeOf } from 'vitest';
import { ChatRoom, ChatUser, type ChatMessage } from '../../src/chat.js';

describe('Mediator type contracts', () => {
  it('ChatRoom methods have the expected signatures', () => {
    expectTypeOf(ChatRoom.prototype.join).parameters.toEqualTypeOf<[ChatUser]>();
    expectTypeOf(ChatRoom.prototype.broadcast).parameters.toEqualTypeOf<[string, string]>();
    expectTypeOf(ChatRoom.prototype.send).parameters.toEqualTypeOf<[string, string, string]>();
  });
  it('ChatMessage shape', () => {
    expectTypeOf<ChatMessage>().toEqualTypeOf<{ from: string; to: string | 'all'; body: string }>();
  });
});
