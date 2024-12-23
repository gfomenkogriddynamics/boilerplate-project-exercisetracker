import { body, param, query } from 'express-validator';
import { UserService } from '../services/user';
import { isDateValid } from './custom/is-date-valid';

export const createUserValidation = (userService: UserService) => [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .bail()
        .isAlphanumeric()
        .withMessage('Username must contain only alphanumeric characters (letters and numbers)')
        .bail()
        .custom(async (username) => {
            const user = await userService.findUserByField('username', username);
            if (user) {
                throw new Error('Username is already taken');
            }
            return true;
        }),
];

export const createExerciseValidation = [
    param('_id').isInt().withMessage('User ID must be an integer'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('duration')
        .trim()
        .notEmpty()
        .withMessage('Duration is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Duration must be a positive integer'),
    body('date')
        .optional({ values: 'falsy' })
        .custom(isDateValid)
        .withMessage('Date must be a valid date in YYYY-MM-DD format'),
];

export const getLogsValidation = [
    param('_id').isInt().withMessage('User ID must be an integer'),
    query('from')
        .optional({ values: 'falsy' })
        .custom(isDateValid)
        .withMessage('From must be a valid date in YYYY-MM-DD format'),
    query('to')
        .optional({ values: 'falsy' })
        .custom(isDateValid)
        .withMessage('To must be a valid date in YYYY-MM-DD format'),
    query('limit')
        .optional({ values: 'falsy' })
        .isInt({ min: 1 })
        .withMessage('Limit must be a positive integer'),
];
