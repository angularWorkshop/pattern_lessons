import { ChatRoom, ChatUser } from '../../src/chat.js';

describe('ChatRoom — broadcast', () => {
  it('delivers to everyone except sender', () => {
    const room = new ChatRoom();
    const alice = new ChatUser('alice', room);
    const bob = new ChatUser('bob', room);
    const carol = new ChatUser('carol', room);
    room.join(alice);
    room.join(bob);
    room.join(carol);

    alice.say('hello');
    expect(bob.received).toHaveLength(1);
    expect(bob.received[0]?.body).toBe('hello');
    expect(carol.received).toHaveLength(1);
    expect(alice.received).toHaveLength(0); // not echoed back
  });
});

describe('ChatRoom — whisper (private send)', () => {
  it('delivers only to addressee', () => {
    const room = new ChatRoom();
    const alice = new ChatUser('alice', room);
    const bob = new ChatUser('bob', room);
    const carol = new ChatUser('carol', room);
    room.join(alice);
    room.join(bob);
    room.join(carol);

    alice.whisper('bob', 'just for you');
    expect(bob.received).toEqual([{ from: 'alice', to: 'bob', body: 'just for you' }]);
    expect(carol.received).toHaveLength(0);
  });

  it('throws if recipient is not in the room', () => {
    const room = new ChatRoom();
    const alice = new ChatUser('alice', room);
    room.join(alice);
    expect(() => alice.whisper('ghost', 'hi')).toThrow();
  });

  it('throws if sender is not in the room', () => {
    const room = new ChatRoom();
    const alice = new ChatUser('alice', room);
    expect(() => room.broadcast('alice', 'hi')).toThrow();
  });
});

describe('ChatRoom — leave', () => {
  it('a user that left does not receive further broadcasts', () => {
    const room = new ChatRoom();
    const alice = new ChatUser('alice', room);
    const bob = new ChatUser('bob', room);
    room.join(alice);
    room.join(bob);

    room.leave('bob');
    alice.say('still here?');
    expect(bob.received).toHaveLength(0);
  });
});

describe('Users do not hold references to each other', () => {
  it('ChatUser has no direct list of other users', () => {
    const room = new ChatRoom();
    const alice = new ChatUser('alice', room);
    const bob = new ChatUser('bob', room);
    room.join(alice);
    room.join(bob);

    const props = Object.keys(alice);
    // The only outward reference is the room itself and the received array.
    // No direct users[] / other / partner / etc.
    expect(props.some((p) => p.toLowerCase().includes('user') || p === 'partners' || p === 'others')).toBe(false);
  });
});
