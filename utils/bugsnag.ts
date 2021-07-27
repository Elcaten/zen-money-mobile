import type Bugsnag from '@bugsnag/expo/types/bugsnag';
import type {NotifiableError, OnErrorCallback} from '@bugsnag/expo/types/bugsnag';
import {BUGSNAG_API_KEY} from '../utils/manifest-extra';

// For some reason initializing Bugsnag / Sentry as per docs was causing app to stuck at the splash screeen.
// I had to make this workaround.

class ZenBugsnag {
  private bugsnag: typeof Bugsnag | undefined;

  public notify(err: NotifiableError, onError?: OnErrorCallback) {
    if (this.bugsnag == null) {
      this.bugsnag = require('@bugsnag/expo') as typeof Bugsnag;
      this.bugsnag.start({apiKey: BUGSNAG_API_KEY});
    }
    this.bugsnag.notify(err, onError);
  }
}

export const bugsnag = new ZenBugsnag();
