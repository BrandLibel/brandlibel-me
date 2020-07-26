const writeGibberish = length => {
    if (isNaN(length) || !Number.isInteger(length) || length < 0){
        throw new RangeError("writeGibberish requires an integer greater than 0");
    }
    if (length === 0) return "";

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabetLength = alphabet.length;

    let str = "";

    str += length.toString();

    let char;
    while (str.length < length) {
        char = alphabet.charAt( Math.floor( Math.random() * alphabetLength ) );
        if (Math.random() > 0.5) char = char.toLocaleLowerCase();
        else if (Math.random() > 0.14) char = " ";

        str += char;
    }

    return str;
};

const excerptify = (markdown, charLength) => {
    if (charLength === undefined) charLength = 220;

    let excerpt = markdown.split("\n")[0];

    if (excerpt.length > charLength) {
        excerpt = excerpt.substr(0, charLength);
        excerpt += "...";
    }

    return excerpt;
};

const getEmailAddress = () => {
    var x = "contact";
    var y = "brand";
    var y1 = "libel";
    var z = ".me";
    return `${x}@${y+y1+z}`;
};

module.exports = { writeGibberish, excerptify, getEmailAddress };