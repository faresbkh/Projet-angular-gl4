// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {BackEndApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
export {BackEndApplication, PackageInfo, PackageKey} from './application';

export async function main(options?: ApplicationConfig) {
  const app = new BackEndApplication(options);

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
