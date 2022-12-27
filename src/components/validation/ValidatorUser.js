const rules = [
    {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'Username không được để trống',
    },
    // {
    //     field: 'code',
    //     method: 'isLength',
    //     args: [{min: 3}, {max: 20}],
    //     validWhen: true,
    //     message: 'Mã phải có độ dài từ 3 -> 20',
    // },
    {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password không được để trống',
    },
    // {
    //     field: 'sizeRole',
    //     method: 'isInt',
    //     args: [{min: 0}],
    //     validWhen: true,
    //     message: 'Số lượng quyền nhập không hợp lệ',
    // },
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