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

export class Form {
  private state: FormState = {
    country: '',
    city: '',
    customerType: 'individual',
    inn: '',
    innVisible: false,
    cityOptions: [],
  };

  public update<K extends keyof FormState>(field: K, value: FormState[K]): void {
    if (field === 'country') {
      const country = value as string;
      this.state = {
        ...this.state,
        country,
        city: '',
        cityOptions: CITIES_BY_COUNTRY[country] ?? [],
      };
      return;
    }

    if (field === 'customerType') {
      const next = value as CustomerType;
      if (next === 'business') {
        this.state = { ...this.state, customerType: 'business', innVisible: true };
      } else {
        this.state = { ...this.state, customerType: 'individual', innVisible: false, inn: '' };
      }
      return;
    }

    if (field === 'city') {
      const city = value as string;
      if (!this.state.cityOptions.includes(city)) {
        throw new Error(`Form: city "${city}" is not in current cityOptions`);
      }
      this.state = { ...this.state, city };
      return;
    }

    this.state = { ...this.state, [field]: value };
  }

  public getState(): FormState {
    return { ...this.state };
  }
}
