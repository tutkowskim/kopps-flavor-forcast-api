# Kopps Flavor Forecast

An api to query the custard flavor forecast at the Kopps resturants around Milwaukee, which scraps `https://www.kopps.com/flavor-preview` to provide a more api friendly result.

## Endpoints
### Index
The index `/` provies a rest endpoint for getting the flavor of the day.

### Google Actions Fulfillment
The endpoint `/google-actions-fulfillment` provides a google assistant conversion, so that google actions can respond to flavor of the day requests in the google assistant.