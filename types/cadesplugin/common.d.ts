declare namespace CADES_Common {
    type ValuesOf<T> = T[keyof T];
    type VarDate = object;

    // Extracts the type if wrapped by a Promise
    type Unpacked<T> = T extends Promise<infer U> ? U
        : T extends CAPICOM.Certificate ? CAPICOM.CertificateAsync
        : T extends CAPICOM.Certificates ? CAPICOM.CertificatesAsync
        : T extends CAdESCOM.CPSigner ? CAdESCOM.CPSignerAsync
        : T extends CAdESCOM.CPHashedData ? CAdESCOM.CPHashedDataAsync
        : T extends CAdESCOM.Version ? CAdESCOM.VersionAsync
        : T extends CAPICOM.OID ? CAPICOM.OIDAsync
        : T extends CAPICOM.EncodedData ? CAPICOM.EncodedDataAsync
        : T extends CAPICOM.PublicKey ? CAPICOM.PublicKeyAsync
        : T extends CAPICOM.PrivateKey ? CAPICOM.PrivateKeyAsync
        : T extends CAPICOM.ExtendedKeyUsage ? CAPICOM.ExtendedKeyUsageAsync
        : T extends CAPICOM.EKUs ? CAPICOM.EKUsAsync
        : T extends CAPICOM.EKU ? CAPICOM.EKUAsync
        : T extends CAdESCOM.CPAttribute ? CAdESCOM.CPAttributeAsync
        : T extends CAdESCOM.CPAuthenticatedAttributes2 ? CAdESCOM.CPAuthenticatedAttributes2Async
        : T;

    type PromisifiedFunction<T extends Function> = // eslint-disable-line @typescript-eslint/no-unsafe-function-type
        T extends (...args: infer A) => infer U ? (...args: { [K in keyof A]: Unpacked<A[K]> }) => Promise<Unpacked<U>>
            : T;

    type Async<T> = {
        readonly [K in keyof T]: T[K] extends Function ? PromisifiedFunction<T[K]> // eslint-disable-line @typescript-eslint/no-unsafe-function-type
            : Promise<Unpacked<T[K]>>;
    };
}
