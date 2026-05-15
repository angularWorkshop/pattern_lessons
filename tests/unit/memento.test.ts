import { TextDocument, Caretaker } from '../../src/memento.js';

describe('TextDocument.save / restore', () => {
  it('saves the current state', () => {
    const doc = new TextDocument();
    doc.setTitle('Hello');
    doc.setBody('World');
    const snap = doc.save(100);
    expect(snap.state).toEqual({ title: 'Hello', body: 'World' });
    expect(snap.takenAt).toBe(100);
  });

  it('snapshot is immune to subsequent document mutations', () => {
    const doc = new TextDocument();
    doc.setTitle('A');
    const snap = doc.save(1);
    doc.setTitle('B');
    expect(snap.state.title).toBe('A');
  });

  it('restoring brings the document back', () => {
    const doc = new TextDocument();
    doc.setTitle('Original');
    const snap = doc.save(1);
    doc.setTitle('Changed');
    doc.restore(snap);
    expect(doc.getTitle()).toBe('Original');
  });

  it('mutating the snapshot after restore does not corrupt the document', () => {
    const doc = new TextDocument();
    doc.setTitle('Original');
    const snap = doc.save(1);
    doc.restore(snap);
    // Try to mutate the snapshot — shouldn't affect the document
    (snap as { state: { title: string } }).state.title = 'tampered';
    expect(doc.getTitle()).toBe('Original');
  });
});

describe('Caretaker', () => {
  it('captures and retrieves multiple snapshots', () => {
    const doc = new TextDocument();
    const ck = new Caretaker();
    doc.setBody('v1');
    ck.capture(doc, 1);
    doc.setBody('v2');
    ck.capture(doc, 2);
    doc.setBody('v3');
    ck.capture(doc, 3);

    expect(ck.count()).toBe(3);
    expect(ck.at(0).state.body).toBe('v1');
    expect(ck.at(1).state.body).toBe('v2');
    expect(ck.at(2).state.body).toBe('v3');
  });

  it('restoreTo rewinds the document to an indexed snapshot', () => {
    const doc = new TextDocument();
    const ck = new Caretaker();
    doc.setBody('first');
    ck.capture(doc, 1);
    doc.setBody('second');
    ck.capture(doc, 2);
    doc.setBody('third');

    ck.restoreTo(doc, 0);
    expect(doc.getBody()).toBe('first');
  });

  it('throws on out-of-range index', () => {
    const ck = new Caretaker();
    expect(() => ck.at(0)).toThrow();
    expect(() => ck.restoreTo(new TextDocument(), 99)).toThrow();
  });
});
