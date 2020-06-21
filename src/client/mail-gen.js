export default function genEmAddr(){
    var x = "contact";
    var y = "brand";
    var y1 = "libel";
    var z = ".me";
    return `${x}@${y+y1+z}`;
    //return `<a href="mailto:${x}@${y+y1+z}">${x}@${y+y1+z}</a>`;
}