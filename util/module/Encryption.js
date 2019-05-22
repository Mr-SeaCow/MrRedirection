'use strict';
const Table = {
    "A": "00",
    "B": "01",
    "C": "02",
    "D": "03",
    "E": "04",
    "F": "05",
    "G": "06",
    "H": "07",
    "I": "08",
    "J": "09",
    "K": "10",
    "L": "11",
    "M": "12",
    "N": "13",
    "O": "14",
    "P": "15",
    "Q": "16",
    "R": "17",
    "S": "18",
    "T": "19",
    "U": "20",
    "V": "21",
    "W": "22",
    "X": "23",
    "Y": "24",
    "Z": "25",
    "a": "26",
    "b": "27",
    "c": "28",
    "d": "29",
    "e": "30",
    "f": "31",
    "g": "32",
    "h": "33",
    "i": "34",
    "j": "35",
    "k": "36",
    "l": "37",
    "m": "38",
    "n": "39",
    "o": "40",
    "p": "41",
    "q": "42",
    "r": "43",
    "s": "44",
    "t": "45",
    "u": "46",
    "v": "47",
    "w": "48",
    "x": "49",
    "y": "50",
    "z": "51",
    "0": "52",
    "1": "53",
    "2": "54",
    "3": "55",
    "4": "56",
    "5": "57",
    "6": "58",
    "7": "59",
    "8": "60",
    "9": "61",
    "+": "62",
    "/": "63",
    " ": "64",
    "?": "65",
    ".": "66",
    "'": "67"
};
const iTable = {
    "00": "A",
    "01": "B",
    "02": "C",
    "03": "D",
    "04": "E",
    "05": "F",
    "06": "G",
    "07": "H",
    "08": "I",
    "09": "J",
    "10": "K",
    "11": "L",
    "12": "M",
    "13": "N",
    "14": "O",
    "15": "P",
    "16": "Q",
    "17": "R",
    "18": "S",
    "19": "T",
    "20": "U",
    "21": "V",
    "22": "W",
    "23": "X",
    "24": "Y",
    "25": "Z",
    "26": "a",
    "27": "b",
    "28": "c",
    "29": "d",
    "30": "e",
    "31": "f",
    "32": "g",
    "33": "h",
    "34": "i",
    "35": "j",
    "36": "k",
    "37": "l",
    "38": "m",
    "39": "n",
    "40": "o",
    "41": "p",
    "42": "q",
    "43": "r",
    "44": "s",
    "45": "t",
    "46": "u",
    "47": "v",
    "48": "w",
    "49": "x",
    "50": "y",
    "51": "z",
    "52": "0",
    "53": "1",
    "54": "2",
    "55": "3",
    "56": "4",
    "57": "5",
    "58": "6",
    "59": "7",
    "60": "8",
    "61": "9",
    "62": "+",
    "63": "/",
    "64": " ",
    "65": "?",
    "66": ".",
    "67": "'"
};
const Table2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const enc = module.exports = {};

enc.Encrypt = function(_String, Callback) {
    let Salt = _Salter(Date.now());
    let Str = _StringToNumber(_String);
    let nSalt = [];
    let nStr = [];

    for (let i = 0; i < Salt.length; i++) {
        let a = Salt[i];
        let A0 = Table2[Number(a[0])];
        let A1 = Table2[Number(a[1])];
        nSalt.push(A0 + A1);
    }
    for (let i = 0; i < Str.length; i++) {
        let a = Str[i];
        let A0 = Table2[Number(a[0])];
        let A1 = Table2[Number(a[1])];
        nStr.push(A0 + A1);
    }
    return nSalt.join(' ') + ' ' + nStr.join(' ');
};

enc.Decrypt = function(_String) {
    let Str = _String.substring(18).split(' ');
    let nStr = [];
    let final = [];
    for (let i = 0; i < Str.length; i++) {
        let a = Str[i];
        let A0 = String(Table2.indexOf(a[0]));
        let A1 = String(Table2.indexOf(a[1]));
        nStr.push(A0 + A1);
    }
    for (let i = 0; i < nStr.length; i++) {
        let a = iTable[`${nStr[i]}`];
        final.push(a);
    }
    return final.join('');
};

function _Salter(Milliseconds, Length, Random) {
    let Salt = [];
    Milliseconds = String(Milliseconds);
    for (let i = 1; i < Milliseconds.length; i++) {
        Salt.push(Milliseconds.substring(i, i + 2));
        i++;
    }
    return Salt;
}

function _StringToNumber(_String) {
    let newString = [];
    for (let i = 0; i < _String.length; i++) {
        newString.push(Table[`${_String[i]}`]);
    }
    return newString;
}

//console.log(Decrypt(`fe dh bd ie ii bc bb ea ea dg ee ge dh de dg da ge bh ea ci dg da ef ge bf cg ee ee ge fe ge ei de dh dh ge ch da ge ea eg ef ge da cg ed dh fa ge ad da ci da di ch da ed gg ge ai gh di ge dc eg da ee ee de dj dc ge dj da ej ef ge bj eg da ee cj cg fa gg ge cc dd cg ef ge cj ea ge fa ea eg ge dc eg fa ee ge ef dd de dj dg gf`))
