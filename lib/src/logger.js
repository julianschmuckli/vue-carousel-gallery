import Config from "./config"

export default {
    log(message) {
        if (Config.debugInfo) {
            console.log("[Vue Carousel Gallery]", message);
        }
    }
}