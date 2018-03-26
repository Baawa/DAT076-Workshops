package chl.hajo.library.util;

/**
 * Utility, not used ...
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
