/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2021-03-14 11:04:35
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-14 16:00:28
 */

import schedule from 'node-schedule';
import nodemailer from 'nodemailer';
import { emailConfig } from '../config/core.config';
import postService from '../services/post/post.service';
import { logger } from '../helpers/common-helpers/logs';

schedule.scheduleJob('0 */60 * * * *', () => {
  try {
    const mailTransporter = nodemailer.createTransport(emailConfig);

    postService.getDataForEmail((error, info) => {
      // eslint-disable-next-line no-empty
      if (error) {
        logger.error('Data not received for generate email');
      } else if (info.posts.length !== 0 && info.emails.length !== 0) {
        const emailBody = info.posts.map(
          (post) => `<h5>${post.heading}</h5>
            <p>${post.content}..... <b> Visit To Read More --> </b></p>
            <br/>`
        );

        const mailDetails = {
          from: emailConfig.auth.user,
          to: info.emails.toString(),
          subject: 'MERN New Posts',
          html: `
          <h5>NEW Posts</h5>
          ${emailBody}
          `,
        };

        mailTransporter.sendMail(mailDetails, (stmpError) => {
          if (stmpError) {
            logger.error(`SMTP Faild Error :: ${JSON.stringify(stmpError)}`);
          } else {
            logger.info(`Email Send`);
          }
        });
      }
    });
  } catch (ex) {
    logger.error(`Exception occurred Error :: ${JSON.stringify(ex)}`);
  }
});
