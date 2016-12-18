enchant();

window.onload = function () {
  var game = new Game(window.parent.innerWidth, window.parent.innerHeight);
  game.preload(['img/chara1.png', 'img/chara5.png']);
  game.fps = 20;
  game.restart = 3000;
  var enamyCount = 100;

  game.onload = function () {
    var label = new Label();
    label.moveTo(game.width / 2, game.height / 2);
    label.color = 'rgba(255, 0, 0, 1)';
    label.scale(2);
    game.rootScene.addChild(label);

    var Enemy = Class.create(Sprite, {
      initialize: function (x, y) {
        Sprite.call(this, 32, 32);
        this.speed = 3;
        this.x = x;
        this.y = y;
        this.image = game.assets['img/chara1.png'];
        this.frame = 5;
        this.scale(1, 1);
        this.rotation = Math.random() * 360;
        game.rootScene.addChild(this);
        this.addEventListener('enterframe', function () {
          if (this.within(hero, 16)) {
            if (label.text == "") {
              label.text = createResultMessage(game.frame, game.fps, game.restart);
            }
            setTimeout("location.reload()", game.restart);
          }
        });
      },
      onenterframe: function () {
        if (this.frame > 6) {
          this.frame--;
        } else {
          this.frame++;
        }

        this.x += Math.cos(this.rotation * Math.PI / 180) * this.speed;
        this.y += Math.sin(this.rotation * Math.PI / 180) * this.speed;
        if (this.x >= game.width || this.x <= 0 || this.y >= game.height || this.y <= 0) {
          this.rotation = Math.random() * 360;
        }
      },
      ontouchend: function () {
      },
    });

    var Hero = Class.create(Sprite, {
      initialize: function (x, y) {
        Sprite.call(this, 32, 32);
        this.speed = 5;
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.moveToX = x;
        this.moveToY = y;
        this.image = game.assets['img/chara5.png'];
        this.frame = 3;
        this.scale(1, 1);
        game.rootScene.addChild(this);
      },
      onenterframe: function () {
        if (this.frame > 4) {
          this.frame -= 2;
        } else {
          this.frame += 2;
        }

        if (Math.round(Math.abs(this.x - this.moveToX)) <= 1 || Math.round(Math.abs(this.y - this.moveToY)) <= 1) {
          return;
        }
        this.x += Math.cos(this.rotation * Math.PI / 180) * this.speed;
        this.y += Math.sin(this.rotation * Math.PI / 180) * this.speed;
      },
      ontouchend: function () {
      },
    });

    var hero = new Hero(game.width / 2, game.height / 2);

    for (var i = 0; i < enamyCount; i++) {
      new Enemy(Math.random() * game.width, Math.random() * game.height / 3);
    }

    this.rootScene.addEventListener("touchstart", function (e) {
      hero.moveToX = e.localX;
      hero.moveToY = e.localY;
      var radian = Math.atan2(hero.moveToY - hero.y, hero.moveToX - hero.x);
      hero.rotation = radian * 180 / Math.PI;
    });
  };
  game.start();
};

function createResultMessage(frame, fps, restart) {
  var seconds = Math.floor(frame / fps);
  var restartTime = restart / 1000;
  return seconds + "秒間耐えました！<br>やったね！<br>" + restartTime + "秒後にまた始まるよ！";
}
