export interface DocumentSnapshot {
  readonly state: { title: string; body: string };
  readonly takenAt: number;
}

export class TextDocument {
  private title = '';
  private body = '';

  public setTitle(title: string): void {
    this.title = title;
  }

  public setBody(body: string): void {
    this.body = body;
  }

  public getTitle(): string {
    return this.title;
  }

  public getBody(): string {
    return this.body;
  }

  public save(now: number): DocumentSnapshot {
    return {
      state: structuredClone({ title: this.title, body: this.body }),
      takenAt: now,
    };
  }

  public restore(snapshot: DocumentSnapshot): void {
    const cloned = structuredClone(snapshot.state);
    this.title = cloned.title;
    this.body = cloned.body;
  }
}

export class Caretaker {
  private readonly snapshots: DocumentSnapshot[] = [];

  public capture(doc: TextDocument, now: number): void {
    this.snapshots.push(doc.save(now));
  }

  public count(): number {
    return this.snapshots.length;
  }

  public at(index: number): DocumentSnapshot {
    const snap = this.snapshots[index];
    if (!snap) {
      throw new Error(`Caretaker.at: index ${index} is out of range`);
    }
    return snap;
  }

  public restoreTo(doc: TextDocument, index: number): void {
    const snap = this.snapshots[index];
    if (!snap) {
      throw new Error(`Caretaker.restoreTo: index ${index} is out of range`);
    }
    doc.restore(snap);
  }
}
