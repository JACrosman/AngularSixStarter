/**
 * Model - Course
 *
 * A waypoints course
 * Can contain multiple lessons
 */
export interface Course {
  /**
   * Unique id of course
   */
  _id: string;

  /**
   * Course Name
   */
  name?: string;

  /**
   * Course Description
   */
  description?: string;

  /**
   * All lessons available in this course
   */
  lessons?: CourseLesson[];

  /** Useful for authoring, don't allow any launch events to occur */
  suppressEvents?: boolean;
}

/**
 * Modal - CourseLesson
 *
 * Metadata of a full waypoints lesson
 */
export interface CourseLesson {
  /**
   * Unique id of lesson
   */
  _id: string;

  /**
   * title to be used for the course lesson entry
   */
  title?: string;

  /**
   * Description used for this course lesson entry
   */
  description?: string;

  /**
   * Url to navigate to before running the lesson
   */
  launchUrl?: string;
}

/**
 * Additional data about a course
 */
export interface CourseMetadata {
  _id?: string;

  completedLessons?: string[];
}

export interface CourseMetadataMap {
  [key: string]: CourseMetadata;
}

export interface CourseMap {
  [key: string]: Course;
}
