(function () {
    let isPause = false;
    let animationId = null;

    let speed = 3;
    let score = 0;


    const car = document.querySelector('.car');
    const carInfo = {
        ...createElementInfo(car),
        move: {
            top: null,
            bottom: null,
            left: null,
            right: null,
        },
    };

    const coin = document.querySelector('.coin');
    const coinInfo = createElementInfo(coin);


    const arrow = document.querySelector('.arrow');
    const arrowInfo = createElementInfo(arrow);


    const another_way = document.querySelector('.another_way');
    const another_wayInfo = createElementInfo(another_way);


    const gameScore = document.querySelector('.game-score');
    const backdrop = document.querySelector('.backdrop');
    const gameButton = document.querySelector('.game-button');

    
    //keydown keyup keypress 
    document.addEventListener('keydown', (event) => {
        if(isPause) { 
            return;
        }
        const code = event.code;

        if((code === 'ArrowUp' || code === 'KeyW') && carInfo.move.top === null ) {
            if(carInfo.move.bottom) {
                return;
            }
            carInfo.move.top = requestAnimationFrame(carMoveToTop(car, carInfo));
        }
        else if((code === 'ArrowDown' || code === 'KeyS') && carInfo.move.bottom === null) {
            if(carInfo.move.top) {
                return;
            }
            carInfo.move.bottom = requestAnimationFrame(carMoveToBottom(car, carInfo));
        }
        else if((code === 'ArrowLeft'|| code === 'KeyA') && carInfo.move.left === null) {
            if(carInfo.move.right) {
                return;
            }
            carInfo.move.left = requestAnimationFrame(carMoveToLeft(car, carInfo));
        }
        else if((code === 'ArrowRight' || code === 'KeyD') && carInfo.move.right === null) {
            if(carInfo.move.left) {
                return;
            }
            carInfo.move.right = requestAnimationFrame(carMoveToRight(car, carInfo));
        }        
            
        
    });
    document.addEventListener('keyup', (event) => {
        const code = event.code;

        if(code === 'ArrowUp' || code === 'KeyW') {
            cancelAnimationFrame(carInfo.move.top);
            carInfo.move.top = null;
        }
        else if(code === 'ArrowDown' || code === 'KeyS') {
            cancelAnimationFrame(carInfo.move.bottom);
            carInfo.move.bottom = null;
        }
        else if(code === 'ArrowLeft' || code === 'KeyA') {
            cancelAnimationFrame(carInfo.move.left);
            carInfo.move.left = null;
        }
        else if(code === 'ArrowRight' || code === 'KeyD') {
            cancelAnimationFrame(carInfo.move.right);
            carInfo.move.right = null;
        }

    });

    // const tree1 = trees[0];
    // const coordsTree1 = getCoords(tree1);


    animationId = requestAnimationFrame(startGame);

    function startGame() {
        elementAnimation(another_way, another_wayInfo, speed, -250);

         if(another_wayInfo.visible && hasCollision(carInfo,another_wayInfo)) {
            return finishGame();
        }

        treesLogic.treesAnimation(speed);
        elementAnimation(coin, coinInfo, speed, -100);
        if(coinInfo.visible && hasCollision(carInfo,coinInfo)) {
            score++;
            gameScore.innerText = score;
            coin.style.display = 'none';
            coinInfo.visible = false;

            if(score % 5 === 0) {
                speed += 1;
            }
        }

        elementAnimation(arrow, arrowInfo, speed, -600);
        if(arrowInfo.visible && hasCollision(carInfo,arrowInfo)) {
            arrow.style.display = 'none';
            arrowInfo.visible = false;
            another_way.style.opacity = 0.2; 
            another_wayInfo.visible = false;
            
            arrowInfo.ignoreAppereance = true;
            another_wayInfo.ignoreAppereance = true;

            speed += 10;


            setTimeout(() => {
                another_way.style.opacity = 1;
                speed -= 10;

                setTimeout(() => {
                    another_wayInfo.visible = true; 
                    arrowInfo.ignoreAppereance = false;
                    another_wayInfo.ignoreAppereance = false;
                }, 500);
            }, 1000);
        }

        animationId = requestAnimationFrame(startGame);
    }


    function cancelAnimations() {
        cancelAnimationFrame(animationId);
        cancelAnimationFrame(carInfo.move.top);
        cancelAnimationFrame(carInfo.move.bottom);
        cancelAnimationFrame(carInfo.move.left);
        cancelAnimationFrame(carInfo.move.right);
    }

    function finishGame() {
        cancelAnimations();
        isPause = true;
        gameScore.style.display = 'none';
        gameButton.style.display = 'none';
        backdrop.style.display = 'flex';
        const scoreText = backdrop.querySelector('.finish-text-score');
        scoreText.innerHTML = score;
    }

    gameButton.addEventListener('click', () => {
        isPause = !isPause;
        if(isPause) {
            cancelAnimations();
            gameButton.children[0].style.display = "none";
            gameButton.children[1].style.display = "initial";
        }
        else {
            animationId = requestAnimationFrame(startGame);
            gameButton.children[0].style.display = "initial";
            gameButton.children[1].style.display = "none";
        }
    });
})();