export default {
  'retailerId': '{{users.retailer.id}}',
  'version': '{{version}}',
  'entityType': 'LOCATION',
  'entitySubtype': 'STORE',
  'description': 'Example Workflow',
  'versionComment': 'Example Workflow',
  'createdBy': 'Fluent OMX Plugin Sample',
  'createdOn': '2021-00-20T10:00:00.000+0000',
  'id': null,
  'name': 'LOCATION::STORE',
  'rulesets': [
    {
      'name': 'CREATE',
      'description': 'A location has been created. Activate the location.',
      'type': 'LOCATION',
      'eventType': 'NORMAL',
      'rules': [
        {
          'name': '{{client.id}}.commonv2.ChangeStateGQL',
          'props': {
            'status': 'ACTIVE',
          },
        },
      ],
      'triggers': [
        {
          'status': 'CREATED',
        },
      ],
      'userActions': [],
    },
  ],
  'statuses': [
    {
      'name': '',
      'entityType': 'FULFILMENT',
      'category': 'FULFILMENT',
    },
  ],
};