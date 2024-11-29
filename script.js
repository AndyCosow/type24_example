const field = document.querySelector(".field")

const enemies = [
    {
        id: "asdad3423",
        posX: 100,
        miveSide: true,
        posY: -50,
        hp: 100,
        dead: false
    },
]

let gameOver = false

function makeEnemiesMove() {

    enemies.map(item => {
        let el = document.querySelector("#"+item.id)
        let hp = document.querySelector(`#${item.id} > .hp`)
        let icn = document.querySelector(`#${item.id} > .icon`)

        if(item.dead){
            hp.style.width = 0 + "%"
            icn.innerHTML = "💀"
            icn.style.opacity = "0.3"
            return
        }


        if(item.posY >= 580) {
            console.log('GAME OVER')
            gameOver = true
        }

        el.style.left = item.posX+"px"
        el.style.top = item.posY+"px"
        hp.style.width = item.hp + "%"
    })
}

function appendEnemy(item) {


    field.innerHTML += `
                <div class="enemy" id="${item.id}" style="left: ${item.posX}px; top: ${item.posY}px">
                  <div class="icon">🧍</div>
                  <div class="hp">
                    <div style="width: ${item.hp}%"></div>
                  </div>
                </div>
    `


    const enemiesDivs = document.querySelectorAll(".enemy")
    enemiesDivs.forEach(item => {
        item.onclick = (event) => {
            const enemy_id = event.target.id
            const itemIndex = enemies.findIndex(x => x.id === enemy_id)

            const rnd = (num) => Math.round(Math.random() * num)
            enemies[itemIndex].hp -= rnd(50)

            if(enemies[itemIndex].hp <= 0) {
                enemies[itemIndex].dead = true
            }

        }
    })


}

appendEnemy(enemies[0])

function generateEnemy() {
    const rnd = (num) => Math.round(Math.random() * num)

    if (rnd(100) < 1) {

        const newEnemy = {
            posX: rnd(900),
            id:  "A"+ String(Date.now()),
            posY: -50,
            hp: 100
        }

        enemies.push(newEnemy)
        appendEnemy(newEnemy)
    }

}

function enemyMove() {
    enemies.map((x, i) => {
        enemies[i].posY += 5
    })
    makeEnemiesMove()
}


function showGameOver() {
    field.innerHTML = ""
    field.innerHTML = "<h1>Game Over</h1>"
}

setInterval(() => {
    if(gameOver) {
        showGameOver()
        return
    }

    enemyMove()
    generateEnemy()

}, 50)


/// add different enemies (random icons)
/// Make so skulls disappear after some tome
/// for each killed enemy, add some money to account
/// Make slots on the bottom, in those slots you can buy helping units which will shoot ant enemy randomly
