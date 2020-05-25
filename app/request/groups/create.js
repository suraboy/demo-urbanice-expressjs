const createRequest = [
    {
        'field': 'group_name',
        'validate_type': ['require','string','max'],
        'validate_params': {'max': 50}
    },
];

export default createRequest