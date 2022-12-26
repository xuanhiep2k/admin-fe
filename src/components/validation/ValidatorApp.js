const rules = [
    {
        field: 'code',
        method: 'isEmpty',
        validWhen: false,
        message: 'Mã không được để trống',
    },
    {
        field: 'code',
        method: 'isLength',
        args: [{min: 3}, {max: 20}],
        validWhen: true,
        message: 'Mã phải có độ dài từ 3 -> 20',
    },
    {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Tên không được để trống',
    },
    // {
    //     field: 'address',
    //     method: 'isEmpty',
    //     validWhen: false,
    //     message: 'The address field is required.',
    // },
    // {
    //     field: 'message',
    //     method: requiredWith,
    //     args: ['subject'],
    //     validWhen: true,
    //     message: 'The message field is required when subject is present.',
    // },
];

module.exports = rules;