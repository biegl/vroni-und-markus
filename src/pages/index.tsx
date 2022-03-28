import Header from '@/components/Header';
import Map from '@/components/Map';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

import geojson from '../data/geojson.json';

const accomodations = geojson.features
  .filter((data) => data.properties.type === 'Accomodation')
  .map((el) => el.properties);

const Index = () => {
  return (
    <Main
      meta={
        <Meta title="Vroni und Markus" description="Zomm' is anfoch schiana" />
      }
    >
      <div className="mx-auto max-w-screen-md position-fixed">
        <Header />
      </div>
      <div className="bg-white p-5 section">
        <div className="mx-auto max-w-screen-md">
          <h2>Ablauf</h2>
          <ol>
            <li>13:30 - Freie Trauung am Schellenberg hinterm Schusterhof</li>
            <li>15:00 - Kaffee und Kuchen</li>
            <li>18:30 - Abendessen</li>
          </ol>
        </div>
      </div>
      <Map />
      <div className="bg-white p-5">
        <div className="mx-auto max-w-screen-md">
          <div className="my-5">
            <h2 className="flex-header">
              <img
                src="/assets/images/wedding.png"
                className="icon-header mr-3"
              />{' '}
              Location
            </h2>
            <p>Adresse: Schellenbergstraße 3, 83346 Bergen</p>
          </div>
          <div className="my-5">
            <h2 className="flex-header">
              <img
                src="/assets/images/parking.png"
                className="icon-header mr-3"
              />{' '}
              Parkplatz in der Nähe
            </h2>
            <p>
              Da beim Schusterhof der Parkplatz begrenzt ist, bitten wir euch,
              die Autos unten beim Friedhof stehen zu lassen und die letzten
              Meter zu Fuß hinauf zu gehen.
              <br />
              <br />
              Adresse: Achenweg 31, 83346 Bergen
            </p>
          </div>
          <div className="my-5">
            <h2 className="flex-header">
              <img src="/assets/images/bed.png" className="icon-header mr-3" />{' '}
              Unterkünfte
            </h2>
            <p>
              Da das Chiemgau zu dieser Zeit sehr gefragt ist, ist es leider
              nicht möglich alle Gäste an einem Ort unterzubringen. Wir bitten
              euch deshalb selbst für eine Unterkunft zu sorgen. Anbei haben wir
              eine Hotels/Pensionen in unmittelbarer Nähe.
            </p>
            Übernachtungsmöglichkeiten in Bergen:
            <ul className="grid grid-cols-2 gap-4" style={{ margin: '4rem 0' }}>
              {accomodations &&
                accomodations.map((acc) => (
                  <li key={acc.message} className="ml-5">
                    <div>
                      <div>{acc.message}</div>
                      <div>
                        <a href={acc.url}>{acc.url}</a>
                      </div>
                      <div>
                        <a href={acc.phone}>{acc.phone}</a>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="flex h-96 items-center justify-center">
          <div className="text-center max-w-screen-md">
            <h2>Fotos</h2>
            <p>Gibt&apos;s dann nach der Hochzeit! ;)</p>
          </div>
        </div>
      </div>
      <footer className="page-footer grid grid-cols-2">
        <div className="page-footer-image bg-white">
          <img src="/assets/images/footer.jpg" style={{ height: '100%' }} />
        </div>
        <div className="mx-auto max-w-screen-md bg-white p-5">
          <div>
            <strong className="gold header-alt">Meldet&apos;s enk</strong>
            <p>
              Bitte gebt uns bis zum <strong>01.07.2022</strong> Bescheid ob ihr
              diesen Tag mit uns feiern könnt. Wir freuen uns auf euch!
            </p>
          </div>
        </div>
      </footer>
    </Main>
  );
};

export default Index;
