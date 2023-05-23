private key Certification Authority
openssl genrsa -des3 -out CA-LR26-HGG.key 2048

Certification Authority
openssl req -x509 -new -key CA-LR26-HGG.key -days 700 -sha256 -out CA-LR26-HGG.crt

private key for resource
openssl genrsa -des3 -out RS-LR26-HGG.key 2048

openssl rsa -in RS-LR26-HGG.key -out RS-LR26-HGG-RSA.key

certificate for request
openssl req -new -key RS-LightBooking-RSA.key -out RS-LightBooking.csr -sha256 -config Resource.cfg

certificate for resource
openssl x509 -req -in RS-LightBooking.csr -CA CA-LightBooking.crt -CAkey CA-LightBooking.key -CAcreateserial -out RS-LightBooking.crt -days 365 -sha256 -extensions v3_req -extfile Resource_HGG.cfg