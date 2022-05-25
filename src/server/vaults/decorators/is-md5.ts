import { registerDecorator, ValidationOptions } from 'class-validator';

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
          // Source: https://melvingeorge.me/blog/check-if-string-is-valid-md5-hash-javascript
          const regexExp = /^[a-f0-9]{32}$/gi;
          return regexExp.test(value);
        },
      },
    });
  };
}
