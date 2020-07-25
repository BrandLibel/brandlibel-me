const excerptify = (markdown, charLength) => {
    if (charLength === undefined) charLength = 220;

    let excerpt = markdown.split("\n")[0];

    if (excerpt.length > charLength) {
        excerpt = excerpt.substr(0, charLength);
        excerpt += "...";
    }

    return excerpt;
};

const Util = { excerptify };

export default Util;