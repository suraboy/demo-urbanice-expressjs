const createRequest = [
    {
        'field': 'first_name',
        'validate_type': ['require', 'string', 'max'],
        'validate_params': {'max': 50}
    },
    {
        'field': 'last_name',
        'validate_type': ['require', 'string', 'max'],
        'validate_params': {'max': 50}
    },
    {
        'field': 'birth_date',
        'validate_type': ['require', 'string', 'max'],
        'validate_params': {'max': 50}
    }, {
        'field': 'phone',
        'validate_type': ['require', 'string', 'max'],
        'validate_params': {'max': 13}
    },{
        'field': 'email',
        'validate_type': ['require', 'string', 'email']
    },{
        'field': 'url',
        'validate_type': ['require', 'string', 'url'],
        'validate_params': {'max': 50}
    },{
        'field': 'group_id',
        'validate_type': ['require', 'numeric', 'exists'],
        'validate_params': {'table_name': 'groups'}
    }
];

export default createRequest