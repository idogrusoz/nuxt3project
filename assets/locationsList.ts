import featuresCollection from '~~/types/featuresCollection';

const locationList: featuresCollection = {
  type: 'FeatureCollection',
  features: [
    {
      id: '1',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.4086, 51.2455],
      },
      properties: {
        name: 'Port Authority of Port of Antwerp-Bruges',
        description: 'Government office',
        address: 'Zaha Hadidplein 1, 2030 Antwerpen',
        phone: '032052011',
      },
    },
    {
      id: '2',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.2572, 51.3627],
      },
      properties: {
        name: 'PSA K913 Noordzee Terminal',
        description: 'Logistic services',
        address: 'Scheldelaan 601, 2040 Antwerpen',
        phone: '035688479',
      },
    },
    {
      id: '3',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.286, 51.3315],
      },
      properties: {
        name: 'PSA Antwerp CFS 869',
        description: 'Port administration',
        address: 'Scheldelaan 495, 2040 Antwerpen',
        phone: '032349865',
      },
    },
    {
      id: '4',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.3852, 51.2588],
      },
      properties: {
        name: 'Pasec Port',
        description: 'Port admnistration',
        address: 'Oosterweelsteenweg 57, 2030 Antwerpen',
        phone: '035464150',
      },
    },
    {
      id: '5',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.3779, 51.2831],
      },
      properties: {
        name: 'Haven 422',
        description: 'Cargo company',
        address: 'Haven 242, 2030 Antwerpen',
        phone: '032052011',
      },
    },
    {
      id: '6',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.334, 51.3052],
      },
      properties: {
        name: 'Euroports TA524',
        description: 'Import Export',
        address: 'Muisbroeklaan 522, 2030 Antwerpen',
        phone: '035678545',
      },
    },
    {
      id: '7',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.2669, 51.2878],
      },
      properties: {
        name: 'DP World Antwerp Gateway',
        description: 'Quay',
        address: 'Sint-Antoniusweg Haven, 1791, 9130 Beveren',
        phone: '037303300',
      },
    },
    {
      id: '8',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.3462, 51.3287],
      },
      properties: {
        name: 'Antwerp Container Terminal',
        description: 'Logistic services',
        address: 'Polderdijkweg 3, 2030 Antwerpen',
        phone: '032105100',
      },
    },
    {
      id: '9',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.3471, 51.2957],
      },
      properties: {
        name: 'ACT TRANSPORT',
        description: 'Transportation company',
        address: 'Groenenborgerlaan 152, 2020 Antwerpen',
        phone: '035417300',
      },
    },
    {
      id: '10',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.3486, 51.2864],
      },
      properties: {
        name: 'APEC',
        description: 'Training center',
        address: 'Zaha Hadidplein 1, 2030 Antwerpen',
        phone: '032052322',
      },
    },
    {
      id: '11',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.2403, 51.2822],
      },
      properties: {
        name: 'MPET K1742 Deurganck Terminal',
        description: 'Logistics services',
        address: 'Sint-Antoniusweg, 9130 Beveren',
        phone: '032606111',
      },
    },
    {
      id: '12',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.2581, 51.3273],
      },
      properties: {
        name: 'ENGIE Electrabel ',
        description: 'Nuclear power plant',
        address: 'Haven 1800, Scheldemolenstraat, 9130',
        phone: '037303113',
      },
    },
  ],
};
const resolve = (): featuresCollection => locationList;

const locationListPromise = () =>
  new Promise<featuresCollection>((resolve) =>
    setTimeout(() => resolve(locationList), 2500)
  );
export default locationListPromise;
