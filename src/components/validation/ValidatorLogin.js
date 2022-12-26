const rules = [
    {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'Username không được để trống',
    },
    {
        field: 'username',
        method: 'isLength',
        args: [{min: 3}, {max: 20}],
        validWhen: true,
        message: 'Username phải có độ dài từ 3 -> 20',
    },
    {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password không được để trống',
    },
];

module.exports = rules;