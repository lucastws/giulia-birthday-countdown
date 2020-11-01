function checkDigit(digit)
{
	var result = digit;
	if(digit < 10 && digit >= 0) result = "0" + digit;

	return result;
}

function getBirthdayMoment()
{
	return moment("2020-11-14 00:00:00");
}

function getTimeNowMoment()
{
	return moment().format("YYYY-MM-DD HH:mm:ss");
}

function updateCountdown()
{
	const moment_birthday = getBirthdayMoment();
	const moment_now = getTimeNowMoment();

  	const end = moment_birthday.endOf('seconds');
	const diff = moment.duration(end.diff(moment()));

	let months_formatted = checkDigit(diff.months()) + " months";
	let days_formatted = checkDigit(diff.days()) + " days"
	let hours_formatted = checkDigit(diff.hours()) + " hours";
	let minutes_formatted = ", " + checkDigit(diff.minutes()) + " minutes";
	let seconds_formatted = " and " + checkDigit(diff.seconds()) + " seconds";

	if(diff.months() == 0) months_formatted = months_formatted.strike();
	if(diff.days() == 0) days_formatted = days_formatted.strike();
	if(diff.hours() == 0) hours_formatted = hours_formatted.strike();
	if(diff.minutes() == 0) minutes_formatted = minutes_formatted.strike();

	$("#Countdown_Months").html(months_formatted);
	$("#Countdown_Days").html(days_formatted);
	$("#Countdown_Time").html(hours_formatted + minutes_formatted + seconds_formatted);
}

function _checkBirthday()
{
	const date_birthday = getBirthdayMoment().format("YYYY-MM-DD");
	const date_now = moment().format("YYYY-MM-DD");

	if(date_birthday == date_now)
	{
		//wip
	}
	else
	{
		$("#Message_Top").html("Giulia's birthday is in ");
		$("#Message_Bottom").html("Still a little ways down the road...");

		updateCountdown();
	}
	
}

$(document).ready(function () 
{
	moment.locale();

    setInterval(function() {
  		_checkBirthday();
	}, 100);
});