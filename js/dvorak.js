try { document.getElementById ("butConvert").addEventListener ("click", convert); }
catch (err) { window.alert ("could not load properly; nothing will work."); }

const numbers = "0123456789";
const signs = "+-";

// TODO: lining up similar equations, figuring out number sub or sup, two+ digit numbers

function convert (e) { // e is event

	var chars = document.getElementById ("textUnformatted").value.split ('');

	var eq = [];

	// A word is a thing without space (e.g. MnO4-aq)
	var insideWord = true;

	for (var i=0; i<chars.length; i++) {

		const c = chars[i];

		if (c == '^') continue; // offer an empty character to get around stuff

		if (c == ' ') { eq.push (c); insideWord = false; continue; }

		if (c == '>') { eq.push (c); continue; } // is part of arrow or a space

		if (signs.includes (c)) {

			if (!insideWord) { eq.push (c); continue; } // is part of arrow or a plus sign

			// is a superscript at the end of something (e.g. Na+)
			addSup (eq, c);

			continue;

		}

		if (numbers.includes (c)) {

			if (!insideWord || i == 0) { eq.push (c); continue; } // is a coefficient, not a subscript

			// at this point, it's either a subscript or part of a superscript

			if (i + 1 == chars.length) addSub (eq, c); // it is the end of the entire thing

			else if (signs.includes (chars[i+1])) addSup (eq, c); // it is a superscript if there is a sign after it

			else addSub (eq, c); // otherwise should be a subscript

			continue;

		}

		// should now be part of element

		eq.push (c);

		insideWord = true;

	}

	const eqString = eq.join ('');

	document.getElementById ("textFormatted").innerHTML = eqString;

	copyToClip (eqString);

}

function addSup (arrayBuilder, sup) { arrayBuilder.push ("<sup>"); arrayBuilder.push (sup); arrayBuilder.push("</sup>"); }
function addSub (arrayBuilder, sub) { arrayBuilder.push ("<sub>"); arrayBuilder.push (sub); arrayBuilder.push("</sub>"); }

// copied from stackoverflow lmao
function copyToClip(str) {

	function listener(e) {
		e.clipboardData.setData("text/html", str);
		e.clipboardData.setData("text/plain", str);
		e.preventDefault();
	}

	document.addEventListener("copy", listener);
	document.execCommand("copy");
	document.removeEventListener("copy", listener);

}
