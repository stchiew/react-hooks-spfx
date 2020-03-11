import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { ICountry } from '../services/ICountry';
import { IServices } from '../services/IServices';

export class MockServices implements IServices {

  private static _items: ICountry[] = [
    {
      Title: 'Japan',
      Capital: 'Tokyo'
    },
    {
      Title: 'Peru',
      Capital: 'Lima'
    },
    {
      Title: 'Egypt',
      Capital: 'Cairo'
    }
  ];
  public static readonly serviceKey: ServiceKey<IServices> =
    ServiceKey.create<MockServices>('my-mock-app:IServices', MockServices
    );
  public getCountryItems(): Promise<ICountry[]> {
    return new Promise<ICountry[]>((resolve: any) => {
      resolve(MockServices._items);
    });
  }
}
