import type { Options } from '@wdio/types'
import * as basicConfig from './wdio.conf'

export const config: Options.Testrunner = {
	...basicConfig.config,
	capabilities: [
		{
			maxInstances: 5,
			browserName: 'chrome',
			acceptInsecureCerts: true,
			'goog:chromeOptions': {
				args: ['--headless', '--disable-gpu', '--disable-dev-shm-usage']
			}
		}
	]
}
