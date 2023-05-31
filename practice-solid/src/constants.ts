export const FORM_LOGIN = {
    USER_NAME: 'username',
    PASS_WORD: 'password',
    ERROR_EMPTY_FIELD: 'This field is required',
    ERROR_WRONG_REQUIRED: function (nameField: string) {
        return `${nameField[0].toLocaleUpperCase() + nameField.slice(1)} is wrong`
    }
}