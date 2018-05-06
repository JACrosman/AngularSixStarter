export class SetTitle {
  static readonly type = '[Core] Set Title';
  constructor(public title: string) {}
}

/**
 * Action - DisplayError
 *
 * Displays an error notification message to the user
 */
export class DisplayError {
  static readonly type = '[Core] Notification Error';

  public constructor(public message: string) {}
}

/**
 * Action - DisplaySuccess
 *
 * Displays a success notification message to the user
 */
export class DisplaySuccess {
  static readonly type = '[Core] Notification Success';

  public constructor(public message: string) {}
}
