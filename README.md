`ts-quick-smtp` is designed to quickly set up a local SMTP server for development / testing basic email services. It is not designed with any kind of robustness or scalability in mind. If you need either / both of those then consider something like `mailtrap.io` _maybe?_

This _partially_ implements the <a href="https://tools.ietf.org/html/rfc821">RFC 821</a> standard for mail transfer; which is now obsolete and has since been succeeded by <a href="https://tools.ietf.org/html/rfc2821">RFC 2821</a>

### Test

```sh
npm test
```

### Build

```sh
npm run build
```

When this package is complete, an accompanying desktop / web application will be made available for easy access to emails.

`System.out.println("Cheers!")`
