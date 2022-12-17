const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 1;
isPlaying = true;
const LAND = 350;
const WALK_SPEED = 10;
const MAX_HEALTH = 200;
var test = false;

const bot = (params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
}).bot);

timer = 60;
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "img/background-game.png",
});

const shop = new Sprite({
  position: {
    x: 630,
    y: 128,
  },
  imageSrc: "img/shop.png",
  scale: 2.75,
  framesMax: 6,
});

const player = new Fighter({
  position: {
    x: 256 - 25,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  size: {
    width: 70,
    height: 130,
  },
  imageSrc: "./img/samuraiMack/Idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 172,
  },
  health: MAX_HEALTH,
  sprites: {
    idle: {
      imageSrc: "./img/samuraiMack/Idle.png",
      imageSrc2: "./img/samuraiMack2/Idle.png",
      framesMax: 8,
    },
    walk: {
      imageSrc: "./img/samuraiMack/Run.png",
      imageSrc2: "./img/samuraiMack2/Run.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./img/samuraiMack/Run.png",
      imageSrc2: "./img/samuraiMack2/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/samuraiMack/Jump.png",
      imageSrc2: "./img/samuraiMack2/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/samuraiMack/Fall.png",
      imageSrc2: "./img/samuraiMack2/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/samuraiMack/Attack2.png",
      imageSrc2: "./img/samuraiMack2/Attack2.png",
      framesMax: 6,
    },
    attack2: {
      imageSrc: "./img/samuraiMack/Attack1.png",
      imageSrc2: "./img/samuraiMack2/Attack1.png",
      framesMax: 6,
    },
    block: {
      imageSrc: "./img/samuraiMack/Block.png",
      imageSrc2: "./img/samuraiMack2/Block.png",
      framesMax: 1,
    },
    takeHit: {
      imageSrc: "./img/samuraiMack/Take Hit - white silhouette.png",
      imageSrc2: "./img/samuraiMack2/Take Hit - white silhouette.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./img/samuraiMack/Death.png",
      imageSrc2: "./img/samuraiMack2/Death.png",
      framesMax: 6,
    },
  },
  attackBox: {
    attack1: {
      offset: {
        x: 0,
        y: 0,
      },
      width: 270,
      height: 120,
      damage: 10,
      cooldown: 1000,
      cooldownLeft: 0,
    },
    attack2: {
      offset: {
        x: -5,
        y: -40,
      },
      width: 260,
      height: 160,
      damage: 15,
      cooldown: 2000,
      cooldownLeft: 0,
    },
  },
});

const enemy = new Fighter({
  position: {
    x: 768 - 25,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  size: {
    width: 60,
    height: 130,
  },
  directionToLeft: true,
  imageSrc: "./img/kenji/Idle.png",
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 187,
  },
  health: MAX_HEALTH,
  sprites: {
    idle: {
      imageSrc: "./img/kenji/Idle.png",
      imageSrc2: "./img/kenji2/Idle.png",
      framesMax: 4,
    },
    walk: {
      imageSrc: "./img/kenji/Run.png",
      imageSrc2: "./img/kenji2/Run.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./img/kenji/Run.png",
      imageSrc2: "./img/kenji2/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/kenji/Jump.png",
      imageSrc2: "./img/kenji2/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/kenji/Fall.png",
      imageSrc2: "./img/kenji2/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/kenji/Attack1.png",
      imageSrc2: "./img/kenji2/Attack1.png",
      framesMax: 4,
    },
    attack2: {
      imageSrc: "./img/kenji/Attack2.png",
      imageSrc2: "./img/kenji2/Attack2.png",
      framesMax: 4,
    },
    block: {
      imageSrc: "./img/kenji/Block.png",
      imageSrc2: "./img/kenji2/Block.png",
      framesMax: 1,
    },
    takeHit: {
      imageSrc: "./img/kenji/Take hit.png",
      imageSrc2: "./img/kenji2/Take hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./img/kenji/Death.png",
      imageSrc2: "./img/kenji2/Death.png",
      framesMax: 7,
    },
  },
  attackBox: {
    attack1: {
      offset: {
        x: 25,
        y: -15,
      },
      width: 220,
      height: 150,
      damage: 10,
      cooldown: 800,
      cooldownLeft: 0,
    },
    attack2: {
      offset: {
        x: 50,
        y: -80,
      },
      width: 200,
      height: 210,
      damage: 12,
      cooldown: 1500,
      cooldownLeft: 0,
    },
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  background.update();
  shop.update();
  c.fillStyle = "rgba(255, 255, 255, 0.15)";
  let oldP1 = player.position.x + player.size.width / 2;
  let oldP2 = enemy.position.x + enemy.size.width / 2;

  player.update();
  enemy.update();

  if (
    (oldP1 - oldP2) *
      (player.position.x +
        player.size.width / 2 -
        enemy.position.x -
        enemy.size.width / 2) <
    0
  ) {
    player.changeDirection();
    enemy.changeDirection();
  }

  // player movement

  if (!player.isAttacking) {
    if (keys.a.pressed && player.lastKey === "a") {
      player.velocity.x = -WALK_SPEED;
      player.switchSprite("walk");
    } else if (keys.d.pressed && player.lastKey === "d") {
      player.velocity.x = WALK_SPEED;
      player.switchSprite("walk");
    } else {
      player.velocity.x = 0;
      player.switchSprite("idle");
    }
  }

  if (player.isBlocking) {
    player.switchSprite("block");
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  // Enemy movement
  if (!enemy.isAttacking) {
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
      enemy.velocity.x = -WALK_SPEED;
      enemy.switchSprite("walk");
    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
      enemy.velocity.x = WALK_SPEED;
      enemy.switchSprite("walk");
    } else {
      enemy.velocity.x = 0;
      enemy.switchSprite("idle");
    }
  }

  if (enemy.isBlocking) {
    enemy.switchSprite("block");
  }

  // jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  // detect for collision & enemy gets hit
  if (player.isAttacking && player.framesCurrent === 4) {
    switch (player.state) {
      case "attack1":
        if (
          rectangularCollision({
            player: player,
            attack: player.attackBox.attack1,
            enemy: enemy,
          })
        ) {
          enemy.takeHit(player.attackBox.attack1.damage);
          gsap.to("#enemyHealth", {
            width: (enemy.health / MAX_HEALTH) * 100 + "%",
          });
        }
        break;
      case "attack2":
        if (
          rectangularCollision({
            player: player,
            attack: player.attackBox.attack2,
            enemy: enemy,
          })
        ) {
          enemy.takeHit(player.attackBox.attack2.damage);
          gsap.to("#enemyHealth", {
            width: (enemy.health / MAX_HEALTH) * 100 + "%",
          });
        }
        break;
    }
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  // this is where our player gets hit
  if (enemy.isAttacking && enemy.framesCurrent === 1) {
    switch (enemy.state) {
      case "attack1":
        if (
          rectangularCollision({
            player: enemy,
            attack: enemy.attackBox.attack1,
            enemy: player,
          })
        ) {
          player.takeHit(enemy.attackBox.attack1.damage);
          gsap.to("#playerHealth", {
            width: (player.health / MAX_HEALTH) * 100 + "%",
          });
        }
        break;
      case "attack2":
        if (
          rectangularCollision({
            player: enemy,
            attack: enemy.attackBox.attack2,
            enemy: player,
          })
        ) {
          player.takeHit(enemy.attackBox.attack2.damage);
          gsap.to("#playerHealth", {
            width: (player.health / MAX_HEALTH) * 100 + "%",
          });
        }
        break;
    }
  }

  // if enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === 1) {
    enemy.isAttacking = false;
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    isPlaying = false;
    determineWinner({ player, enemy, timerId });
  }
}

animate();

window.addEventListener("keydown", (event) => {
  if (!isPlaying) return;
  if (!player.dead && !player.isBlocking) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        test = true;
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        if (player.position.y == LAND && !player.isAttacking)
          player.velocity.y = -20;
        break;
      case "j":
        if (player.attackBox.attack1.cooldownLeft <= 0 && !player.isAttacking) {
          player.attack1();
          setTimeout(function () {
            player.attackBox.attack1.cooldownLeft = 0;
            player.isAttacking = false;
          }, player.attackBox.attack1.cooldown);
          player.velocity.x = 0;
        }
        break;
      case "k":
        if (player.attackBox.attack2.cooldownLeft <= 0 && !player.isAttacking) {
          player.attack2();
          setTimeout(function () {
            player.attackBox.attack2.cooldownLeft = 0;
            player.isAttacking = false;
          }, player.attackBox.attack2.cooldown);
          player.velocity.x = 0;
        }
        break;
      case "s":
        if (player.position.y == LAND && !player.isAttacking) {
          player.isBlocking = true;
          keys.a.pressed = keys.d.pressed = false;
        }
        break;
    }
  }

  if (bot == null) {
    if (!enemy.dead && !enemy.isBlocking) {
      switch (event.code) {
        case "ArrowRight":
          keys.ArrowRight.pressed = true;
          enemy.lastKey = "ArrowRight";
          break;
        case "ArrowLeft":
          keys.ArrowLeft.pressed = true;
          enemy.lastKey = "ArrowLeft";
          break;
        case "ArrowUp":
          if (enemy.position.y == LAND && !enemy.isAttacking)
            enemy.velocity.y = -20;
          break;
        case "Numpad1":
          if (enemy.attackBox.attack1.cooldownLeft <= 0 && !enemy.isAttacking) {
            enemy.attack1();
            setTimeout(function () {
              enemy.attackBox.attack1.cooldownLeft = 0;
              enemy.isAttacking = false;
            }, enemy.attackBox.attack1.cooldown);
            enemy.velocity.x = 0;
          }
          break;
        case "Numpad2":
          if (enemy.attackBox.attack2.cooldownLeft <= 0 && !enemy.isAttacking) {
            enemy.attack2();
            setTimeout(function () {
              enemy.attackBox.attack2.cooldownLeft = 0;
              enemy.isAttacking = false;
            }, enemy.attackBox.attack2.cooldown);
            enemy.velocity.x = 0;
          }
          break;
        case "ArrowDown":
          if (enemy.position.y == LAND && !enemy.isAttacking) {
            enemy.isBlocking = true;
            keys.ArrowLeft.pressed = keys.ArrowRight.pressed = false;
          }
          break;
      }
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      player.lastMove = "d";
      break;
    case "a":
      keys.a.pressed = false;
      player.lastMove = "a";
      break;
    case "s":
      player.isBlocking = false;
      break;
  }

  // enemy keys
  if (bot == null) {
    switch (event.code) {
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        enemy.lastMove = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        enemy.lastMove = "ArrowLeft";
        break;
      case "ArrowDown":
        enemy.isBlocking = false;
        break;
    }
  }
});

const delayTime = 2000;

setInterval(function () {
  if (delayTime > 100) delayTime -= 100;
}, 1000);

function autoPlaying() {
  if (!enemy.dead && !enemy.isBlocking && isPlaying) {
    //xa player
    let distance = Math.abs(enemy.position.x - player.position.x);
    if (distance > 200) {
      //tiep can
      if (enemy.directionToLeft) {
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        setTimeout(function () {
          keys.ArrowLeft.pressed = false;
          enemy.lastMove = "ArrowLeft";
        }, distance * 2);
      } else {
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        setTimeout(function () {
          (keys.ArrowRight.pressed = false), (enemy.lastMove = "ArrowRight");
        }, distance * 2);
      }
      let choice = Math.floor(Math.random() * 2);
      if (choice == 1) {
        if (enemy.position.y == LAND && !enemy.isAttacking)
          enemy.velocity.y = -20;
      }
      return;
    }
    //player attack
    else if (player.isAttacking) {
      let choice = Math.floor(Math.random() * 3);
      switch (choice) {
        //jump
        case 0:
          if (enemy.position.y == LAND && !enemy.isAttacking)
            enemy.velocity.y = -20;
          break;
        //block
        case 1:
          if (enemy.position.y == LAND && !enemy.isAttacking) {
            enemy.isBlocking = true;
            keys.ArrowLeft.pressed = keys.ArrowRight.pressed = false;
          }
          setTimeout(function () {
            enemy.isBlocking = false;
          }, delayTime * 2);
          break;
        //attack
        case 2:
          let choice = Math.floor(Math.random() * 2);
          switch (choice) {
            case 0:
              if (
                enemy.attackBox.attack1.cooldownLeft <= 0 &&
                !enemy.isAttacking
              ) {
                enemy.attack1();
                setTimeout(function () {
                  enemy.attackBox.attack1.cooldownLeft = 0;
                  enemy.isAttacking = false;
                }, enemy.attackBox.attack1.cooldown);
                enemy.velocity.x = 0;
              }
              break;
            case 1:
              if (
                enemy.attackBox.attack2.cooldownLeft <= 0 &&
                !enemy.isAttacking
              ) {
                enemy.attack2();
                setTimeout(function () {
                  enemy.attackBox.attack2.cooldownLeft = 0;
                  enemy.isAttacking = false;
                }, enemy.attackBox.attack2.cooldown);
                enemy.velocity.x = 0;
              }
              break;
          }
      }
      return;
    } else {
      //others
      let choice = Math.floor(Math.random() * 2);
      switch (choice) {
        case 0:
          if (enemy.attackBox.attack1.cooldownLeft <= 0 && !enemy.isAttacking) {
            enemy.attack1();
            setTimeout(function () {
              enemy.attackBox.attack1.cooldownLeft = 0;
              enemy.isAttacking = false;
            }, enemy.attackBox.attack1.cooldown);
            enemy.velocity.x = 0;
          }
          break;
        case 1:
          if (enemy.attackBox.attack2.cooldownLeft <= 0 && !enemy.isAttacking) {
            enemy.attack2();
            setTimeout(function () {
              enemy.attackBox.attack2.cooldownLeft = 0;
              enemy.isAttacking = false;
            }, enemy.attackBox.attack2.cooldown);
            enemy.velocity.x = 0;
          }
          break;
      }
    }
  }
}

if (bot == 1) {
  setInterval(function () {
    autoPlaying();
  }, delayTime);
}
