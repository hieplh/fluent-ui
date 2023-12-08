import gql from 'graphql-tag';
import { MystiqueManifestFragment } from 'mystique/types/manifest';
import { parse } from '../src/utils/GqlUtils';

export const manifest: MystiqueManifestFragment = {
  manifestVersion: '2.0',
  routes: [
    {
      type: 'page',
      path: 'example',
      component: 'fc.page',
      nav: {
        label: 'i18n:fc.sf.ui.example',
        icon: 'flight_land',
      },
      data: {
        query: parse(gql`
                    query getLocationById($id: ID!) {
                        locationById(id: $id){
                            ref
                            type
                            status
                        }
                    }
                `),
        variables: {
          locationId: '{{activeLocation.id}}',
        },
      },
    },
  ],
};
