import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import Header from '@/components/Header';
import Map from '@/components/Map';
import geojson from '../data/geojson.json';

const accomodations = geojson.features
    .filter((data) => data.properties.type == 'Accomodation')
    .map((el) => el.properties);

const Index = () => {
    return (
        <Main
            meta={
                <Meta
                    title="Vroni und Markus"
                    description="Zomm' is anfoch schiana"
                />
            }
        >
            <div className="mx-auto max-w-screen-md position-fixed">
                <Header />
            </div>
            <div className="bg-white p-5">
                <div className="mx-auto max-w-screen-md">
                    <h2>Ablauf</h2>
                    <ol>
                        <li>13:30 - Freie Trauung am Schellenberg</li>
                        <li>15:00 - Kaffee und Kuchen</li>
                        <li>18:30 - Abendessen</li>
                    </ol>
                    <h2>Location</h2>
                </div>
            </div>
            <Map />
            <div className="bg-white p-5">
                <div className="mx-auto max-w-screen-md">
                    Die Freie Trauung findet im Apfelbaumgarten hinterm
                    Schusterhof statt.
                    <h3>Parkplatz in der Nähe</h3>
                    <h3>Unterkünfte</h3>
                    <p>
                        Da das Chiemgau zu dieser Zeit sehr gefragt ist, ist es
                        leider nicht möglich alle Gäste an einem Ort
                        unterzubringen. Wir bitten euch deshalb selbst für eine
                        Unterkunft zu sorgen. Anbei haben wir eine
                        Hotels/Pensionen in unmittelbarer Nähe.
                    </p>
                    Übernachtungsmöglichkeiten in Bergen:
                    <ul>
                        {accomodations &&
                            accomodations.map((acc) => (
                                <li key={acc.message}>
                                    <div>
                                        <div>{acc.message}</div>
                                        <div>
                                            <a href={acc.url}>{acc.url}</a>
                                        </div>
                                        <div>
                                            <a href={'tel:' + acc.phone}>
                                                {acc.phone}
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                    <h2>RSVP</h2>
                    <p>
                        Bitte gebt uns rechtzeitig bis zum 01.07.2022 Bescheid
                        ob ihr diesen Tag mit uns feiern könnt. Wir freuen uns
                        auf euch!
                    </p>
                </div>
            </div>
        </Main>
    );
};

export default Index;
