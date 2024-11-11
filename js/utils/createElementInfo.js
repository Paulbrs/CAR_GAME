function createElementInfo(element) {
    return {
        width: element.clientWidth / 2,
        height: element.clientHeight,
        coords:getCoords(element),
        visible: true,
        ignoreAppereance: false,
    };
}