const sendMail = [
    {
        'field': 'from',
        'validate_type': ['require']
    },
    {
        'field': 'to',
        'validate_type': ['require']
    },
    {
        'field': 'message',
        'validate_type': ['require']
    },
    {
        'field': 'templateID',
        'validate_type': []
    },
];

export default sendMail