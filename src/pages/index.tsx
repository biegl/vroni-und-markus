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
      <div className="mx-auto max-w-screen-md">
        <Header />
      </div>
      <div className="section bg-white p-5">
        <div className="mx-auto max-w-screen-md">
          <h2>Ablauf</h2>
          <ol>
            <li>14:00 - Freie Trauung im Garten beim Hammerwirt</li>
            <li>15:00 - Kaffee und Kuchen</li>
            <li>18:30 - Abendessen</li>
            <li>Party!!!</li>
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
                alt="Polaroid"
              />{' '}
              Location
            </h2>
            <p>Adresse: Schmiedstraße 1, 83313 Siegsdorf</p>
          </div>
          <div className="my-5">
            <h2 className="flex-header">
              <img
                src="/assets/images/bed.png"
                className="icon-header mr-3"
                alt="icon"
              />{' '}
              Unterkünfte
            </h2>
            <p className="mb-4">
              Da das Chiemgau zu dieser Zeit sehr gefragt ist, ist es leider
              nicht möglich alle Gäste an einem Ort unterzubringen. Wir haben 20
              Zimmer im Hammerwirt geblockt.
              <br />
              <br />
              Bitte einfach mit folgendem Link buchen:&nbsp;
              <a href="https://direct-book.com/properties/hotelgasthofhoertererdirect?locale=de&items%5b0%5d%5badults%5d=2&items%5b0%5d%5bchildren%5d=0&items%5b0%5d%5binfants%5d=0&currency=EUR&checkInDate=2022-09-24&checkOutDate=2022-09-25&trackPage=yes&promocode=MV2022">
                zur Buchung
              </a>
              <br />
              Der Buchungscode ist nur bis zum 15.7. gültig!
            </p>
            <p>
              Für alle die im Hammerwirt nicht mehr Platz finden, haben wir für
              ein paar Hotels/Pensionen in unmittelbarer Nähe zusammengetragen.
            </p>

            <h3 className="mt-8">
              Übernachtungsmöglichkeiten in der Umgebung:
            </h3>
            <ul
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              style={{ margin: '1rem 0 4rem 0' }}
            >
              {accomodations &&
                accomodations.map((acc) => (
                  <li key={acc.message} className="md:ml-5">
                    <div>
                      <div>{acc.message}</div>
                      {acc.distance && (
                        <div>
                          <small>{acc.distance}</small>
                        </div>
                      )}
                      <div>
                        <a href={acc.url}>{acc.url}</a>
                      </div>
                      <div>
                        <a href={acc.phone}>{acc.phone}</a>
                      </div>
                    </div>
                    <hr className="bc-gold mt-3 md:hidden" />
                  </li>
                ))}
            </ul>
            <div>
              Gebt uns bitte Bescheid falls ihr ein Taxi zur Unterkunft
              benötigt.
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex h-96 items-center justify-center">
          <div className="max-w-screen-md text-center">
            <h2>Fotos</h2>
            <p>Gibt&apos;s dann nach der Hochzeit! ;)</p>
          </div>
        </div>
      </div>
      <footer className="grid grid-cols-1 md:grid-cols-2">
        <div className="page-footer-image bg-white">
          <img
            src="/assets/images/footer.jpg"
            style={{ height: '100%' }}
            alt="Brautpaar"
          />
        </div>
        <div className="mx-auto max-w-screen-md bg-white p-5">
          <div>
            <strong className="gold header-alt">Meldet&apos;s enk</strong>
            <p>
              Bitte gebt uns bis zum <strong>31.07.2022</strong> Bescheid ob ihr
              diesen Tag mit uns feiern könnt. Wir freuen uns auf euch!
            </p>
          </div>
        </div>
      </footer>
    </Main>
  );
};

export default Index;
