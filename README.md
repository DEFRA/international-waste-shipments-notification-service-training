# International Waste Shipments Notification Service Training

| Branch  | Travis CI |
| ------------- | ------------- |
| master  |  [![Build Status](https://travis-ci.com/DEFRA/international-waste-shipments-notification-service-training.svg?token=4v7Wyzs3WDdv3Vw8EGqk&branch=master)](https://travis-ci.com/DEFRA/international-waste-shipments-notification-service-training)  |
| develop | [![Build Status](https://travis-ci.com/DEFRA/international-waste-shipments-notification-service-training.svg?token=4v7Wyzs3WDdv3Vw8EGqk&branch=develop)](https://travis-ci.com/DEFRA/international-waste-shipments-notification-service-training)  |

[![Maintainability](https://api.codeclimate.com/v1/badges/13987df5c1b75e8350c0/maintainability)](https://codeclimate.com/github/DEFRA/international-waste-shipments-notification-service-training/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/13987df5c1b75e8350c0/test_coverage)](https://codeclimate.com/github/DEFRA/international-waste-shipments-notification-service-training/test_coverage)

This repository provides a Node.js API solution for notification based functionality of the [International Waste Shipments service](https://github.com/DEFRA/prsd-iws).
This solution exists for training purposes. The structure of this repository is based on that of [Defra Hapi API boilerplate](https://github.com/DEFRA/hapi-web-boilerplate).

## Environment variables

| name                      | description       | required | default   |            valid            | notes |
|---------------------------|-------------------|:--------:|-----------|:---------------------------:|-------|
| NODE_ENV                  | Node environment  |    no    |           | development,test,production |       |
| PORT                      | Port number       |    no    | 3001      |                             |       |
| IWS_POSTGRES_IWS_HOST     | Database host IP  |    no    | localhost |                             |       |
| IWS_POSTGRES_IWS_DATABASE | Database name     |    yes   |           |                             |       |     
| IWS_POSTGRES_IWS_USER     | Database user     |    yes   |           |                             |       |             
| IWS_POSTGRES_IWS_PASSWORD | Database password |          |           |                             |       |

## Prerequires

Node v8+

## Running the application

`$ node index.js`

## Contributing to this project

If you have an idea you'd like to contribute please log an issue.

All contributions should be submitted via a pull request.  

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

[http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3)

The following attribution statement MUST be cited in your products and applications when using this information.
