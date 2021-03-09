/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Description:
 * @Date: 2018-05-10 09:25:52
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-06-24 11:53:07
 */


const errorMessageList = {
    required: "The :attribute field is required",
    max: "The :attribute may not be greater than :max.",
    min: "The :attribute must be at least :min.",
    maxAmount: "The :attribute may not be greater than :max.",
    minAmount: "The :attribute must be at least :min.",
    digits: "The :attribute must have :min digits.",
    between: "The :attribute must be between :min and :max.",
    string: "The :attribute must be a string.",
    numeric: "The :attribute must be a number.",
    email: "The :attribute must be a valid email address.",
    requiredIf: "The :attribute field is required when :other is :value.",
    after_or_equal: 'The :attribute must be a date after or equal to :startDate.',
    unique: 'The :attribute has already been taken.',
    same: "The :attribute and :other must match.",
    isWeekends: "Weekends are not allowed.",
    alphaNumeric: "The :attribute may only contain letters and numbers.",
    alpha: "The :attribute may only contain letters",
    alphaSpecial: "The :attribute may only contain letters, numbers, dashes and underscore",
    date: "The :attribute is not a valid date",
    requiredAtleastOne:"The :attribute field is required",
    requiredIFEmpty:"The :attribute field is required when :other is empty"
};

export {
    errorMessageList
}