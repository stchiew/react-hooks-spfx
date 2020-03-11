import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType, ServiceScope } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CountriesWebPartStrings';
import Countries from './components/Countries';
import { IServices } from './services/IServices';
import { MockServices } from './test/MockServices';
import { AppService } from './services/appService';

export interface ICountriesWebPartProps {
  description: string;
  serviceInstance: IServices;
}

export default class CountriesWebPart extends BaseClientSideWebPart<ICountriesWebPartProps> {
  private dataCenterServiceInstance: IServices;

  protected onInit(): Promise<void> {
    let serviceScope: ServiceScope = this.context.serviceScope;
    //const _customSPServiceInstance = this.context.serviceScope.consume(CustomSPService.serviceKey);
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      this.dataCenterServiceInstance = serviceScope.consume(MockServices.serviceKey);
    } else {
      this.dataCenterServiceInstance = serviceScope.consume(AppService.serviceKey);
    }
    this.properties.serviceInstance = this.dataCenterServiceInstance;
    return super.onInit();
  }
  public render(): void {

    ReactDom.render(React.createElement(Countries, this.properties), this.domElement);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
