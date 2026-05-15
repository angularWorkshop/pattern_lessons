// Memento — снапшоты состояния редактируемого документа.
// Три роли: Originator (Document), Memento (Snapshot), Caretaker (Caretaker).
// Originator знает, как создать снимок и восстановиться из него.
// Caretaker хранит список снимков и timestamp, но не лезет внутрь — это инкапсуляция.

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

  // TODO: save() — снимок текущего состояния. Делать глубокую копию через структурированный clone,
  // чтобы мутация документа не влияла на снимок.
  public save(_now: number): DocumentSnapshot {
    throw new Error('TextDocument.save is not implemented yet');
  }

  // TODO: restore(snapshot) — восстановить state из снимка (тоже клонировать, чтобы внешняя
  // мутация снимка после restore не сломала документ).
  public restore(_snapshot: DocumentSnapshot): void {
    throw new Error('TextDocument.restore is not implemented yet');
  }
}

// TODO: Caretaker хранит список снимков, выдаёт их по индексу.
// - capture(doc, now): doc.save(now), записать в snapshots
// - count(): сколько снимков
// - at(i): получить снимок по индексу (или throw на out of range)
// - restoreTo(doc, i): doc.restore(snapshots[i])
export class Caretaker {
  private readonly snapshots: DocumentSnapshot[] = [];

  public capture(_doc: TextDocument, _now: number): void {
    throw new Error('Caretaker.capture is not implemented yet');
  }

  public count(): number {
    return this.snapshots.length;
  }

  public at(_index: number): DocumentSnapshot {
    throw new Error('Caretaker.at is not implemented yet');
  }

  public restoreTo(_doc: TextDocument, _index: number): void {
    throw new Error('Caretaker.restoreTo is not implemented yet');
  }
}
