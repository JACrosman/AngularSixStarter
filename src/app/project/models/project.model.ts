export class Project {
  _id?: string;
  name?: string;
  description?: string;
  createDate?: Date;
  lastModified?: Date;
  creator?: string;
  lessonSettings?: {
      ignoreId?: boolean;
      ignoreClass?: boolean;
      ignoreText?: boolean;
      ignorePosition?: boolean;
  };
  xapi?: {
      /** Whether or not xapi tracking is enabled */
      enabled?: boolean;

      /** Organization name */
      organization?: string;

      /** LRS specific settings */
      lrs?: {
          /** LRS base url endpoint */
          endpoint?: string;

          /** LRS auth key for authenticating this waypoints session */
          authKey?: string;
      };
  };
  theme?: {
      /** Main color for headers/buttons */
      primaryColor: string;

      /** Secondary color for elements */
      accentColor: string;

      /** Text color to compliment the primary color */
      primaryTextColor: string;

      /** Text color to compliment the accent color */
      accentTextColor: string;
  };
}
