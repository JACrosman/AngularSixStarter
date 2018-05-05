/**
 * All application (global) level data
 */
export class CoreConfig {
  /**
   * Title to display in the navbar
   */
  title?: String;

  /**
   * Flag for back button visibility
   */
  showBack?: boolean;

  /**
   * Flag for home button visibility
   */
  showHome?: boolean;

  /**
   * Whether the user has made changes to the app
   * without saving
   */
  isDirty?: boolean;
}
