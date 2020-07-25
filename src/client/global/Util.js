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
}

const Util = { excerptify, getEmailAddress };

export default Util;