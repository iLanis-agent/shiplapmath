// Shiplap Math engine: courses and boards for a wall, the area one board covers at its exposure, nails and boxes, and the cost per square foot of wall. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the wall and the bundle label.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _LEN = "the wall length must be from 1 to 1000 ft with no decimal places";
var _HT = "the wall height must be from 1 to 100 ft with no decimal places";
var _EXP = "the exposure must be from 1 to 24 inches with no decimal places";
var _BL = "the board length must be from 1 to 24 ft with no decimal places";
var _BOARDS = "the board count must be from 1 to 1000000 with no decimal places";
var _NPB = "the nails per board must be from 1 to 100 with no decimal places";
var _BOX = "the box count must be from 1 to 1000000 with no decimal places";
var _NBOX = "the nails per box must be from 1 to 100000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function boardsTruth(lenft, htft, expin, boardft) {
  var l = _i(lenft, _LEN, 4, 1, 1000), h = _i(htft, _HT, 3, 1, 100), e = _i(expin, _EXP, 2, 1, 24), b = _i(boardft, _BL, 2, 1, 24);
  var rows = Math.floor((h * 12 + e - 1) / e), per = Math.floor((l + b - 1) / b), total = rows * per;
  return "The wall of " + l + " ft at " + h + " ft tall takes " + _pl(rows, " course", " courses") + " of " + _pl(per, " board", " boards") + " each, " + _pl(total, " board", " boards") + " in all.";
}
function coverTruth(expin, boardft) {
  var e = _i(expin, _EXP, 2, 1, 24), b = _i(boardft, _BL, 2, 1, 24);
  var sq100 = _hu(e * b * 100, 12);
  return "The board of " + b + " ft at " + e + " inches exposed covers " + _dec(sq100, 2) + " sq ft.";
}
function nailsTruth(boards, npb, nbox) {
  var b = _i(boards, _BOARDS, 7, 1, 1000000), n = _i(npb, _NPB, 3, 1, 100), x = _i(nbox, _NBOX, 6, 1, 100000);
  var nails = b * n, boxes = Math.floor((nails + x - 1) / x);
  return "The " + _pl(b, " board", " boards") + " at " + n + " nails each take " + nails + " nails, or " + _pl(boxes, " box", " boxes") + " of " + x + ".";
}
function costTruth(boards, bprice, boxes, xprice, lenft, htft) {
  var b = _i(boards, _BOARDS, 7, 1, 1000000), bp = _p(bprice, _PRICE, 5, 2, 1, 1000000);
  var x = _i(boxes, _BOX, 7, 1, 1000000), xp = _p(xprice, _PRICE, 5, 2, 1, 1000000);
  var l = _i(lenft, _LEN, 4, 1, 1000), h = _i(htft, _HT, 3, 1, 100);
  var cents = b * bp + x * xp, area = l * h, per = _hu(cents, area);
  return "The " + _pl(b, " board", " boards") + " at $" + _dec(bp, 2) + " and the " + _pl(x, " box", " boxes") + " at $" + _dec(xp, 2) + " cost $" + _money(cents) + ", or $" + _money(per) + " a square foot over the " + area + ".";
}
