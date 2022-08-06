import Config from "./config"

export default {
    /**
     * Prints the message to the console log, when the debugInfo is set to true.
     * @param {string} message The message, which should be displayed to the console.
     */
    log(message) {
        if (Config.debugInfo) {
            console.log("[Vue Carousel Gallery]", message);
        }
    }
}