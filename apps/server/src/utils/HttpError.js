const { getReasonPhrase } = require('http-status-codes');

/**
 * Represents an HTTP error that conforms to the RFC 7807 standard for problem details in HTTP APIs.
 * This class extends the native JavaScript Error class, adding a combined message property to handle HTTP specific
 * error data in a structured way. It provides a consistent API to output problem detail objects that can
 * be easily consumed by clients.
 *
 * @class
 * @extends Error
 */
class HttpError extends Error {
    /**
     * Constructs an instance of the HttpError class.
     *
     * @param {number} status - The HTTP status code associated with the problem.
     * @param {string} message - A human-readable explanation specific to this occurrence of the problem.
     *                           Incorporates what is typically separate 'title' and 'detail' information into a single string.
     * @param {string} instance - A URI reference that identifies the specific occurrence of the problem.
     * @param {object} [context] - Additional details or context about the problem. Not part of RFC 7807 but
     *                             useful for diagnostics or detailed error reporting.
     */
    
        constructor(status, message, instance, context) {
          super(message);
          this.name = 'HttpError';
          this.message = message ?? getReasonPhrase(status);
          this.status = status;
          this.instance = instance;
          this.context = context;
        }

    /**
     * Returns a structured object containing details about the problem, conforming to RFC 7807.
     * This includes the combined message and any instance or context information provided.
     *
     * @returns {object} An object structured according to RFC 7807, containing details of the problem.
     */
    toProblemDetails() {
        return {
          message: this.message,
          instance: this.instance,
          context: this.context,
        };
      }
}

module.exports = { HttpError };
