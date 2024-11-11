function hasCollision (elem1Info, elem2Info) {
    const carYTop = elem1Info.coords.y;
    const carYBottom = elem1Info.coords.y + elem1Info.height;
    
    const carXLeft = elem1Info.coords.x - elem1Info.width;
    const carXRight = elem1Info.coords.x + elem1Info.width;

    const coinYTop = elem2Info.coords.y;
    const coinYBottom = elem2Info.coords.y + elem2Info.height;

    const coinXLeft = elem2Info.coords.x - elem2Info.width;
    const coinXRight = elem2Info.coords.x + elem2Info.width; 
    // ось Y
    if(carYTop > coinYBottom || carYBottom < coinYTop) {
        return false;
    }
    // ось X
    if(carXLeft > coinXRight || carXRight < coinXLeft) {
        return false;
    }

    return true; 
}