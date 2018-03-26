package chl.hajo.library.util;

/**
 * This one is dependant on Eclipse persistence
 *
 * @author hajo
 */
public class ExceptionHandler {

    public static String getMessage(Throwable re) {
        while (re.getCause() != null) {
            re = re.getCause();
            return re.getMessage();
        }
        return "Unknown";
    }
}
