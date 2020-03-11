import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';
import { IServices } from "./IServices";
import { ICountry } from './ICountry';


export class AppService implements IServices {

  public static readonly serviceKey: ServiceKey<IServices> =
    ServiceKey.create<AppService>('my-custom-app:IServices', AppService);
  private _spHttpClient: SPHttpClient;
  private _pageContext: PageContext;
  private _currentWebUrl: string;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);

      this._pageContext = serviceScope.consume(PageContext.serviceKey);
      this._currentWebUrl = this._pageContext.web.absoluteUrl;
    });
  }

  public getCountryItems(): Promise<ICountry[]> {
    const url: string = `${this._currentWebUrl}/_api/web/lists/GetByTitle('Countries')/items?$select=Title,Capital`;
    const opt: ISPHttpClientOptions = { headers: { 'Accept': 'application/json;odata=nometadata' }, body: null };
    return this._spHttpClient.get(url, SPHttpClient.configurations.v1).then(
      (response: SPHttpClientResponse) => {
        return response.json().then(
          data => { return data.value; }
        );
      }
    );
  }
}