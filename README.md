# Free counter api (if not abused, lol)

- cloudflare workers
- turso db


1. install cloudflare wrangler.
2. install cloudflare turso-cli.

both can be installed through npm


# api docs

Literally one endpoint

Request
```
https://counter-api.vaisakhkm2625-cloudflare.workers.dev/?id=<give your unique id>
```

Response

```
{"id":"<give your unique id>","count":"8"}
```

# hosting this setup
```bash

# turso
turso auth login
turso db create counters-db
turso db list
turso db show counters-db # set url as var in project
turso db tokens create counters-db # add to cf worker as secret
turso db shell counters-db

npx wrangler login # first login to cloudflare
npx wrangler dev --local

# add token to cloudfalre
pnpx wrangler secret put <TOKEN_NAME>
npx wrangler deploy


```

# Notes

## project setup

```bash
npx wrangler login # first login to cloudflare
npx wrangler init counter-api #init the cloudflare worker project
npx wrangler dev --local

# turso
turso auth login
turso db create counters-db
turso db list
turso db show counters-db # set url as var in project
turso db tokens create counters-db # add to cf worker as secret
turso db shell counters-db

# add token to cloudfalre
pnpx wrangler secret put <TOKEN_NAME>
npx wrangler deploy


```
