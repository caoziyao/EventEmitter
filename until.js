
const log = console.log.bind(console)


const indexOf = (array, item) => {
    if (array.indexOf) {
        return array.indexOf(item);
    } else {
        var result = -1;
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === item) {
                result = i;
                break;
            }
        }
        return result;
    }
}
