const listRequest = [
    {
        'field': 'first_name',
        'validate_type': ['string', 'max'],
        'validate_params': {'max': 50}
    },
    {
        'field': 'last_name',
        'validate_type': ['string', 'max'],
        'validate_params': {'max': 50}
    },
    {
        'field': 'birth_date',
        'validate_type': ['string', 'max'],
        'validate_params': {'max': 50}
    }, {
        'field': 'phone',
        'validate_type': ['string', 'max'],
        'validate_params': {'max': 13}
    },{
        'field': 'email',
        'validate_type': ['string']
    },{
        'field': 'url',
        'validate_type': ['string'],
        'validate_params': {'max': 50}
    }
];

export default listRequest