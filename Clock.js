"use strict";

function selectPrintFunction()
{
	if (typeof document === "undefined") {
		if (typeof print === "function") { return (aString) => { print(aString); }; }
		else { return (aString) => { console.log(aString); }; }
	} else {
		return (aString) => { 
			document.getElementById("clock").innerText = aString;
			let ticktack = 1000 - ((new Date()).getTime() % 1000);
			window.setTimeout("clock()", ticktack);
		};
	}
}

function clock()
{
	let aDate = new Date();
	const targetDate = document.getElementById("target").value
	const diff = new Date(targetDate).getTime() - aDate.getTime();

	if (diff < 0) {
		selectPrintFunction()("期限が過ぎました。");
		return null;
	}

	const diffDay = diff / (1000 * 60 * 60 * 24);
	const diffHour = (diffDay - Math.floor(diffDay)) * 24;
	const diffMinute = (diffHour - Math.floor(diffHour)) * 60;
	const diffSecond = (diffMinute - Math.floor(diffMinute)) * 60;

	const aString = timeToString(diffDay, diffHour, diffMinute, diffSecond)

	selectPrintFunction()(aString);

	return null;
}

function timeToString(day, hour, minute, second) {
	let aString = "dd日hh時間mm分ss秒";

	const dayString = ("0" + Math.floor(day)).toString().slice(-2);
	const hourString = ("0" + Math.floor(hour)).toString().slice(-2);

	if (Math.round(second) == 60) {
		second = 0;
		minute += 1;
	}

	const minuteString = ("0" +  Math.floor(minute)).toString().slice(-2);
	const secondString = ("0" + (Math.round(second)).toString()).slice(-2);

	aString = aString.replace(/dd/, dayString);
	aString = aString.replace(/hh/, hourString);
	aString = aString.replace(/mm/, minuteString);
	aString = aString.replace(/ss/, secondString);

	return aString
}

function clockFromSetting() {
	const target = document.getElementById("target").value;
	const purpose = document.getElementById("purpose").value;
	if (!target || !purpose) {
		alert("フォーム埋めてね！！");
		return;
	}
	document.getElementById("setting").style.display = "none";
	document.getElementById("countdown").style.display = "block";
	document.getElementById("TopOfBody").className = "clock";
	document.getElementById("sub-title").innerHTML = purpose + "まで"
	clock();
}

if (typeof document === "undefined")
{
	clock();
}
