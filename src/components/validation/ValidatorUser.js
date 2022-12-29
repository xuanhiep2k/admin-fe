const requiredWith = (value, field, state) => state[field].length > 0;
const rules = [
    {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'Username không được để trống',
    }, {
        field: 'username',
        method: 'isLength',
        args: [{min: 3}, {max: 50}],
        validWhen: true,
        message: 'Username phải có độ dài từ 3 -> 50',
    },
    {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password không được để trống',
    },
    {
        field: 'password',
        method: 'isLength',
        args: [{min: 7}, {max: 20}],
        validWhen: true,
        message: 'Mật khẩu phải có độ dài từ 7 -> 20',
    },
    {
        field: 'fullName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Họ tên không được để trống',
    },
    {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Email không được để trống',
    },
    {
        field: 'roles',
        method: requiredWith,
        args: ['roles'],
        validWhen: true,
        message: 'Quyền chưa được chọn',
    },
    {
        field: 'partnerCode',
        method: 'isEmpty',
        validWhen: false,
        message: 'Đối tác chưa được chọn',
    },
    {
        field: 'departmentCode',
        method: 'isEmpty',
        validWhen: false,
        message: 'Phòng ban chưa được chọn',
    },
];

module.exports = rules;