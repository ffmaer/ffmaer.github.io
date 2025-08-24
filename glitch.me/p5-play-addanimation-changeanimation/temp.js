
      let bubble;
      let bubble_ss;
      let bubble_normal;
      let bubble_move;
      let mgr;
      function preload() {
        bubble_ss = loadSpriteSheet(
          "https://cdn.glitch.com/dc122c87-3702-4e86-8f63-eea043d864ca%2Fezgif-6-54b25e0a96a3.png?v=1628769250046",
          100,
          100,
          10
        );
      }

      function s3() {
        this.enter = function() {
                  mgr.showScene(s1);

          // bubble_normal = loadAnimation(bubble_ss);
          // bubble_normal.stop();
          // bubble_move = loadAnimation(bubble_ss);
          // bubble = createSprite(100, 100, 45, 66);
          // bubble.addAnimation("normal", bubble_normal);
          // bubble.addAnimation("move", bubble_move);
        };
        this.draw = function() {
          

          //           if (keyDown(68) || keyDown(65) || keyDown(83) || keyDown(87)) {
          //             bubble.changeAnimation("move");
          //           }

          //           if (
          //             keyWentUp(68) ||
          //             keyWentUp(65) ||
          //             keyWentUp(83) ||
          //             keyWentUp(87)
          //           ) {
          //             bubble.changeAnimation("normal");
          //           }

          //           if (keyDown(68)) {
          //             bubble.position.x += 3;
          //           }
          //           if (keyDown(65)) {
          //             bubble.position.x -= 3;
          //           }
          //           if (keyDown(83)) {
          //             bubble.position.y += 3;
          //           }
          //           if (keyDown(87)) {
          //             bubble.position.y -= 3;
          //           }

          // drawSprites();
        };