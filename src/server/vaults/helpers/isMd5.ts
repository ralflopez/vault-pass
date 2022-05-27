export function isMd5(value: string) {
  // Source: https://melvingeorge.me/blog/check-if-string-is-valid-md5-hash-javascript
  const regexExp = /^[a-f0-9]{64}$/gi;
  return regexExp.test(value);
}
