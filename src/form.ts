// Mediator для координированной формы.
// Поля знают только Form (медиатор) и сообщают ей о своих изменениях.
// Form применяет правила зависимостей: смена страны → города очищаются;
// тип "юрлицо" → поле ИНН видимое; иначе скрыто.

export type CustomerType = 'individual' | 'business';

export interface FormState {
  country: string;
  city: string;
  customerType: CustomerType;
  inn: string;
  innVisible: boolean;
  cityOptions: readonly string[];
}

const CITIES_BY_COUNTRY: Record<string, readonly string[]> = {
  RU: ['Moscow', 'SPb', 'Kazan'],
  US: ['NY', 'SF', 'LA'],
  DE: ['Berlin', 'Munich'],
};

// TODO: реализовать Form (медиатор).
// - update(field, value): обновить поле и применить правила:
//   1. Если изменилась country — обнулить city и записать cityOptions из CITIES_BY_COUNTRY (если страна неизвестна — пустой массив)
//   2. Если изменился customerType:
//      - 'business' → innVisible = true (inn оставить как есть)
//      - 'individual' → innVisible = false, inn = '' (очистить)
//   3. Если изменилось city — проверить, что оно есть в cityOptions; если нет — кинуть ошибку
//   4. Прочие поля — просто записать
// - getState() — снапшот текущего состояния
export class Form {
  private state: FormState = {
    country: '',
    city: '',
    customerType: 'individual',
    inn: '',
    innVisible: false,
    cityOptions: [],
  };

  public update<K extends keyof FormState>(_field: K, _value: FormState[K]): void {
    throw new Error('Form.update is not implemented yet');
  }

  public getState(): FormState {
    return { ...this.state };
  }
}
