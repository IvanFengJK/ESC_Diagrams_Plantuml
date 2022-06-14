// ********************QN 1**********************
function gcd(a, b) {
  //   Write a javascript function to compute the greatest common divisor between two integers a
  //   and b.
  if (typeof a != "number" || typeof b != "number") {
    return false;
  } else if (a == 0 && b == 0) {
    return false;
  }
  a = Math.abs(a);
  b = Math.abs(b);
  while (a != b) {
    if (a > b) {
      a -= b;
    } else {
      b -= a;
    }
  }
  return a;
}
gcd(20, 5);
// ********************QN 2**********************
function parseCSV(csvfile) {
  // Write a javascript function that parses a CSV file and returns an array containing every line
  // of the CSV file, itself stored as an array.

  // Example input:
  // Participant,Name,Score
  // P1,Simon,5

  // Expected output:
  // [ [“Participant”, “Name”, “Score”], [“P1”, “Simon”, “5”]]
  const fs = require("fs");
  var lines = [];

  var content = fs.readFileSync(csvfile, "utf8");
  allLines = content.split("\n");
  for (lineIdx in allLines) {
    tokenisedLine = allLines[lineIdx].trim().split(",");
    if (tokenisedLine != "") {
      // console.log(tokenisedLine);
      lines.push(tokenisedLine);
    }
  }
  console.log(lines);
}
parseCSV("sample.csv");

// ********************QN 3**********************

var list = [1, 3, 9, 6, 2, 5, 69, 42, 1337, 9001, 8008135];

function swap(list, l, r) {
  var temp = list[l];
  list[l] = list[r];
  list[r] = temp;
}

function partition(list, l, r) {
  var pivot = list[Math.floor((r + l) / 2)];
  var i = l;
  var j = r;
  while (i <= j) {
    while (list[i] < pivot) {
      i++;
    }
    while (list[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(list, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function quicksort(list, l = 0, r = list.length - 1) {
  var i;
  if (list.length > 1) {
    i = partition(list, l, r);
    if (l < i - 1) {
      quicksort(list, l, i - 1);
    }
    if (i < r) {
      quicksort(list, i, r);
    }
  }
  return list;
}

var sortedArray = quicksort(list);
console.log(sortedArray);
