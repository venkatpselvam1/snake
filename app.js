$(document).ready(function () {
    var snakeGame =
    {
        score: 0,
        snake: [{ x: 20, y: 20 }, { x: 20, y: 21 }, { x: 20, y: 22 }, { x: 20, y: 23 }, { x: 20, y: 24 }],
        direction: 2,
        initBoard: function () {
            for (var i = 1; i <= 50; i++) {
                $("#board").append("<div id='" + i + "'class='board-row' ></div>");
                for (var j = 1; j <= 50; j++) {
                    $("#board div#" + i + ".board-row").append("<div id='" + j + "'class='board-column' ></div>");
                }
            }
            var point = this.getRandomEmpty();
            $("#board div#" + point.x + ".board-row div#" + point.y + ".board-column").addClass("prey");
        },
        renderSnake: function () {
            $.each(this.snake, function (index, point) {
                $("#board div#" + point.x + ".board-row div#" + point.y + ".board-column").addClass("snake");
            });
        },
        printGameOver: function(){
            $(".score-card-js").html($(".score-card-js").html() + " Game over");
        },
        refresh: function (gameObject) {
            setTimeout(function () {
                var tail = gameObject.snake.pop();
                var head = gameObject.snake[0];
                var newHead = gameObject.getNewHead(head, gameObject.direction);
                gameObject.snake.unshift(newHead);
                if ($("#board div#" + newHead.x + ".board-row div#" + newHead.y + ".board-column").length == 0) {
                    gameObject.printGameOver();
                } else if($("#board div#" + newHead.x + ".board-row div#" + newHead.y + ".board-column").hasClass("snake")){
                    $("#board div#" + newHead.x + ".board-row div#" + newHead.y + ".board-column").addClass("selfbite");
                    gameObject.printGameOver();
                }
                else {
                    $("#board div#" + newHead.x + ".board-row div#" + newHead.y + ".board-column").addClass("snake");
                    if ($("#board div#" + newHead.x + ".board-row div#" + newHead.y + ".board-column").hasClass("prey")) {
                        gameObject.score += 10;
                        $("#board div#" + newHead.x + ".board-row div#" + newHead.y + ".board-column").removeClass("prey");
                        gameObject.snake.push(tail);
                        $(".score-card-js").html("Point is " + gameObject.score + " .");
                        var point = gameObject.getRandomEmpty();
                        $("#board div#" + point.x + ".board-row div#" + point.y + ".board-column").addClass("prey");
                    }
                    else {
                        $("#board div#" + tail.x + ".board-row div#" + tail.y + ".board-column").removeClass("snake");
                    }
                    gameObject.refresh(gameObject);
                }
            }, 100);
        },
        getNewHead: function (head, direction) {
            switch (direction) {
                case 1:
                    return { x: head.x, y: head.y + 1 };
                case 2:
                    return { x: head.x + 1, y: head.y };
                case 3:
                    return { x: head.x, y: head.y - 1 };
                case 4:
                    return { x: head.x - 1, y: head.y };
            }
        },
        getRandomEmpty: function () {
            var x = Math.floor(Math.random() * 50 + 1);
            var y = Math.floor(Math.random() * 50 + 1);
            if (!$("#board div#" + x + ".board-row div#" + y + ".board-column").hasClass("snake")) {
                return { x: x, y: y };
            }
            return this.getRandomEmpty();
        },
    };
    snakeGame.initBoard();
    snakeGame.renderSnake();
    snakeGame.refresh(snakeGame);

    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left
                if (snakeGame.direction == 2 || snakeGame.direction == 4) {
                    snakeGame.direction = 3;
                }
                break;

            case 38: // up
                if (snakeGame.direction == 1 || snakeGame.direction == 3) {
                    snakeGame.direction = 4;
                }
                break;

            case 39: // right
                if (snakeGame.direction == 2 || snakeGame.direction == 4) {
                    snakeGame.direction = 1;
                }
                break;

            case 40: // down
                if (snakeGame.direction == 1 || snakeGame.direction == 3) {
                    snakeGame.direction = 2;
                }
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
});