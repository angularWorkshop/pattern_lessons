import { EmailChannel, SmsChannel, PushChannel } from '../../src/channels.js';
import {
  AlertNotification,
  MarketingNotification,
  ReminderNotification,
} from '../../src/notifications.js';

describe('Channels — formatting per channel', () => {
  it('email keeps the body unchanged', () => {
    const r = new EmailChannel().send('a@b.com', 'Hello');
    expect(r).toEqual({ channel: 'email', to: 'a@b.com', body: 'Hello', delivered: true });
  });
  it('sms truncates body to 160 chars', () => {
    const long = 'x'.repeat(200);
    const r = new SmsChannel().send('+1', long);
    expect(r.body.length).toBe(160);
    expect(r.channel).toBe('sms');
  });
  it('push wraps body with PUSH: prefix', () => {
    const r = new PushChannel().send('device:abc', 'Hi');
    expect(r.channel).toBe('push');
    expect(r.body).toBe('PUSH: Hi');
  });
});

describe('Bridge — any notification × any channel works', () => {
  it('Alert via Email', () => {
    const n = new AlertNotification(new EmailChannel());
    const r = n.notify('a@b.com', 'down');
    expect(r.channel).toBe('email');
    expect(r.body).toBe('[ALERT] down');
  });
  it('Alert via SMS truncates the prefixed body', () => {
    const n = new AlertNotification(new SmsChannel());
    const long = 'x'.repeat(200);
    const r = n.notify('+1', long);
    expect(r.channel).toBe('sms');
    expect(r.body.length).toBe(160);
    expect(r.body.startsWith('[ALERT] ')).toBe(true);
  });
  it('Marketing via Push', () => {
    const n = new MarketingNotification(new PushChannel());
    const r = n.notify('device:abc', 'Sale');
    expect(r.channel).toBe('push');
    expect(r.body).toBe('PUSH: Sale — unsubscribe at example.com/unsubscribe');
  });
  it('Reminder via Email', () => {
    const n = new ReminderNotification(new EmailChannel());
    const r = n.notify('a@b.com', 'Standup');
    expect(r.body).toBe('Reminder: Standup');
  });
});

describe('Bridge — channel can be swapped at runtime by composing differently', () => {
  it('the same Alert content goes through both Email and Push without code change', () => {
    const content = 'database down';
    const fromEmail = new AlertNotification(new EmailChannel()).notify('a@b.com', content);
    const fromPush = new AlertNotification(new PushChannel()).notify('device:1', content);
    expect(fromEmail.body).toBe('[ALERT] database down');
    expect(fromPush.body).toBe('PUSH: [ALERT] database down');
  });
});
