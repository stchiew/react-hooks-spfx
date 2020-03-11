import * as React from 'react';
import styles from './Countries.module.scss';
import { ICountriesProps } from './ICountriesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICountry } from '../services/ICountry';

export default function Countries(props: ICountriesProps) {
  const initialCountries: ICountry[] = null;
  const [countries, setCountries] = React.useState(initialCountries);
  var content: any = null;
  React.useEffect(() => {
    props.serviceInstance.getCountryItems().then(
      countryList => { setCountries(countryList); }
    );
  }, []);

  return (
    <div className={styles.countries}>
      <div className={styles.container}>
        {countries && <ul>{countries.map(country => <li>{country.Title}, {country.Capital}</li>)}</ul>}
      </div>
    </div>

  );

}
