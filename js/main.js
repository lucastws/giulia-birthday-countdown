const birthday = "2001-11-14 00:00:00"; // Exact time: 18:20:00
var is_birthday = null;

// Credits: https://stackoverflow.com/a/39466341
function getOrdinal(n)
{
	return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"
}

function checkDigit(digit)
{
	var result = digit;
	if(digit < 10 && digit >= 0) result = "0" + digit;

	return result;
}

function getNextBirthdayMoment()
{
	let result = moment().format('YYYY') + moment(birthday).format("-MM-DD HH:mm:ss");

	let next_birthday = moment().format('YYYY') + moment(birthday).format("-MM-DD");
	let now = moment().format("YYYY-MM-DD");
	if(now > next_birthday) result = moment().add(1, "years").format('YYYY') + moment(birthday).format("-MM-DD HH:mm:ss");

	return moment(result);
}

function getAge() 
{
	var bday = birthday.split(' ')[0];

	return Math.abs(moment(bday).diff(moment(), 'years'));
}

function getTimeNowMoment()
{
	return moment().format("YYYY-MM-DD HH:mm:ss");
}

function updateCountdown()
{
	const moment_birthday = getNextBirthdayMoment();
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
	const date_birthday = getNextBirthdayMoment().format("YYYY-MM-DD");
	const date_now = moment().format("YYYY-MM-DD");

	if(date_birthday == date_now)
	{
		if(is_birthday == false || is_birthday == null)
		{
			balloonsStart();
			$("#Image_Waiting").hide();
			$("#Image_Birthday").show();
			$("#Div_Audio_Birthday").show();
			$("#Message_Top").html("Happy " + getAge() + getOrdinal(getAge()) + " birthday, Giulia!");
			$("#Message_Top").css("color", "fuchsia");
			$("#Countdown_Months").html("November 14th, 2001");
			$("#Countdown_Days").html("at 6:20 pm");
			$("#Countdown_Time").html("(we don't know the seconds exactly.)");
			$("#Countdown_Time").css("font-size", "0.8em");
			$("#Countdown_Time").css("color", "#222222");
			$("#Message_Bottom").html("♥");

			is_birthday = true;
		}
	}
	else
	{
		if(is_birthday == true || is_birthday == null)
		{
			balloonsStop();
			$("#Image_Waiting").show();
			$("#Image_Birthday").hide();
			$("#Div_Audio_Birthday").hide();
			$("#Message_Top").html("Giulia's birthday is in ");
			$("#Message_Top").css("color", "#ffffff");
			$("#Countdown_Time").css("font-size", "1.5em");
			$("#Countdown_Time").css("color", "#ffffff");
			$("#Message_Bottom").html("Still a little ways down the road...");

			is_birthday = false;
		}

		updateCountdown();
	}
}

$(document).ready(function() 
{
	moment.locale();

    setInterval(function() {
  		_checkBirthday();
	}, 100);
});