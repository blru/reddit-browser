export function relativeTime(timeDifference: number /* seconds */) {
    const formattedDate = { value: "" };

    const formatter = new Intl.RelativeTimeFormat("en-US", {
        numeric: "auto",
        style: "long",
    });

    switch (true) {
        case timeDifference < 60:
            formattedDate.value = formatter.format(-timeDifference, "seconds");
            break;
        case timeDifference < 60 * 60:
            formattedDate.value = formatter.format(
                -Math.round(timeDifference) / 60,
                "minutes"
            );
            break;
        case timeDifference < 60 * 60 * 24:
            formattedDate.value = formatter.format(
                -Math.round(timeDifference / 60 / 60),
                "hours"
            );
            break;
        case timeDifference < 60 * 60 * 24 * 7:
            formattedDate.value = formatter.format(
                -Math.round(timeDifference / 60 / 60 / 24),
                "days"
            );
            break;
        case timeDifference < 60 * 60 * 24 * 7 * 4:
            formattedDate.value = formatter.format(
                -Math.round(timeDifference / 60 / 60 / 24 / 7),
                "weeks"
            );
            break;
        case timeDifference < 60 * 60 * 24 * 7 * 4 * 12:
            formattedDate.value = formatter.format(
                -Math.round(timeDifference / 60 / 60 / 24 / 7 / 4),
                "months"
            );
            break;
        case timeDifference >= 60 * 60 * 24 * 7 * 4 * 12:
            formattedDate.value = formatter.format(
                -Math.round(timeDifference / 60 / 60 / 24 / 7 / 4 / 12),
                "years"
            );
            break;
    }

    return formattedDate.value;
}
