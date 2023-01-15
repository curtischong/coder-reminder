export const secondsToTime = (seconds: number): string => {
    let days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    let hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    let mnts = Math.floor(seconds / 60);
    //seconds -= mnts * 60;
    if (days > 0) {
        if (days == 1) return days + " Day";
        return days + " Days";
    }
    if (hrs > 0) {
        if (hrs == 1) return hrs + " Hr";
        return hrs + " Hrs";
    }
    if (mnts > 0) {
        if (mnts == 1) return mnts + " Min";
        return mnts + " Mins";
    }
    if (seconds == 1) {
        return seconds + " Sec";
    }
    return seconds + " Secs";
};

