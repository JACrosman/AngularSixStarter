/**
 * Model - User
 *
 * Waypoints user model
 */
export class User {
    /**
     * User identifier
     */
    id?: string;

    /**
     * Unique username
     */
    username: string;

    /**
     * Unique username
     */
    token: string;

    /**
     * User password
     */
    password: string;

    /**
     * Is the user an admin
     */
    isAdmin: boolean;
}