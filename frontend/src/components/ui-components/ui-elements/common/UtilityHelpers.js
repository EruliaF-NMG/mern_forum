// /*
//  * @Author: Chanaka Wickramasinghe
//  * @Description: Utility Helpers
//  * @Date: 2020-03-25 11:43:57
//  * @Last Modified by: Chanaka Wickramasinghe
//  * @Last Modified time: 2020-03-25 11:43:57
//  */

// import React, { Fragment, memo } from 'react';
// import PropTypes from "prop-types";

// import { defaultPrecisionPoint, defaultRoundUpType, defaultPrecisionValue, roundUpTypes } from "../../../../config/template.config";
// import {roundValue, convertPriceFormat} from "../../../../helpers/common-helpers/common.helpers";
// import {dateObjectToString} from '../../../../helpers/common-helpers/dateTime.helpers';

// /**
//  * --------------------------------------------
//  * @Author: Chanaka Wickramasinghe
//  * @Description: RoundUp Component
//  * --------------------------------------------
//  */

// const RoundUpComponentNoneMemo = ({
//     value = defaultPrecisionValue,
//     decimalPoint = defaultPrecisionPoint,
//     roundType = defaultRoundUpType
// }) => {
//     return (
//         <Fragment>
//             {roundValue(value, decimalPoint, roundType)}
//         </Fragment>
//     );
// };

// // Set Memo Component
// const RoundUpComponent = memo(RoundUpComponentNoneMemo);

// /**
//  * --------------------------------------------
//  * @Author: Chanaka Wickramasinghe
//  * @Description: RoundUp Component
//  * --------------------------------------------
//  */

// RoundUpComponentNoneMemo.propTypes = {
//     /** Value */
//     value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     /** Decimal point */
//     decimalPoint: PropTypes.number,
//     /** Round type */
//     roundType: PropTypes.string
// };

// //----------------RoundUpComponent---------------------

// /**
//  * --------------------------------------------
//  * @Author: Chanaka Wickramasinghe
//  * @Description: ConvertPriceFormat component
//  * --------------------------------------------
//  */

// const ConvertPriceFormatNoneMemo = ({
//     price = "",
//     decimalPoint = defaultPrecisionPoint,
//     roundType = roundUpTypes.none
// }) => {
//     return (
//         <Fragment>
//             {convertPriceFormat(price, decimalPoint, roundType)}
//         </Fragment>
//     );
// };

// // Set memo
// const ConvertPriceFormat = memo(ConvertPriceFormatNoneMemo);

// /**
//  * --------------------------------------------
//  * @Author: Chanaka Wickramasinghe
//  * @Description: ConvertPriceFormat component
//  * --------------------------------------------
//  */

// ConvertPriceFormatNoneMemo.propTypes = {
//     /** Price */
//     price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     /** Decimal point */
//     decimalPoint: PropTypes.number,
//     /** Round type */
//     roundType: PropTypes.string
// };

// //----------------ConvertPriceFormat---------------------

// /**
//  * --------------------------------------------
//  * @Author: Chanaka Wickramasinghe
//  * @Description: ConvertDateFormat component
//  * --------------------------------------------
//  */

// const ConvertDateFormatNoneMemo = ({
//     date = "",
//     format = "YY-mm-dd"
// }) => {
//     return (
//         <Fragment>
//             {dateObjectToString(date, format)}
//         </Fragment>
//     );
// };

// // Set Memo
// const ConvertDateFormat = memo(ConvertDateFormatNoneMemo);

// /**
//  * --------------------------------------------
//  * @Author: Chanaka Wickramasinghe
//  * @Description: ConvertDateFormat component
//  * --------------------------------------------
//  */

// ConvertDateFormatNoneMemo.propTypes = {
//     /** Date */
//     date: PropTypes.string,
//     /** Date format */
//     format: PropTypes.string,
// };

// //----------------ConvertDateFormat---------------------

// export {
//     RoundUpComponentNoneMemo,
//     RoundUpComponent,
//     ConvertPriceFormatNoneMemo,
//     ConvertPriceFormat,
//     ConvertDateFormatNoneMemo,
//     ConvertDateFormat
// };
