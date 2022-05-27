import { registerDecorator, ValidationOptions } from 'class-validator';
import { isMd5 } from '../helpers/isMd5';

export function IsMd5(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isMd5',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `${propertyName} is not a valid hash`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return isMd5(value);
        },
      },
    });
  };
}
