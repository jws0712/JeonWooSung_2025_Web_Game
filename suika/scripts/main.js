//이미지 및 반지름 추가
import { FRUITS } from "./fruits.js";


//모듈 불러오기
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Boides = Matter.Bodies,
    World = Matter.World,

    //body 추가
    Body = Matter.Body;

// 엔진 선언
const engine = Engine.create();

// 랜더 선언
const render = Render.create({
    engine,
    //어디에 그릴것인지
    element:document.body,
    options : {
        wireframes: false,
        background: '#4B2E5D',
        width:620,
        height:1850,
    }
});

// 벽 배치를 위한 world 선언
const world = engine.world;

// 벽 생성
const leftWall = Boides.rectangle(15, 925, 30, 1850, {
                                    // x좌표, y좌표, width, height
    isStatic: true,
    render : {fillStyle: '#7D1A1F'}
})

const rightWall = Boides.rectangle(605, 925, 30, 1850, {
    // x좌표, y좌표, width, height
isStatic: true,
render : {fillStyle: '#7D1A1F'}
})

const ground = Boides.rectangle(310, 1820, 620, 60, {
    // x좌표, y좌표, width, height
isStatic: true,
render : {fillStyle: '#7D1A1F'}
})

const topLine = Boides.rectangle(310, 150, 620, 2, {
    // x좌표, y좌표, width, height
isStatic: true,
//충돌 감지 기능
isSensor : true,
render : {fillStyle: '#7D1A1F'}
})

// 생성한 벽을 월드에 배치
World.add(world, [leftWall, rightWall, ground, topLine]);

// 실행
Render.run(render);
Runner.run(engine);

//현재 과일 값을 저장하는 변수
let currentBody = null;
let currentFruit = null;

//키 조작을 제어하는 변수
let disableAction = false;

//과일을 추가하는 함수
function addFruit()
{
    //난수 생성
    const index = Math.floor(Math.random() * 10)
    const fruits = FRUITS[index];


    const body = Boides.circle(300, 50, fruits.radius,
        {
            //해당 과일의 번호값을 저장
            index : index, 
            //처음 시작할때 엄춰있음
            isSleeping : true,
            render: {
                sprite: {texture: `${fruits.name}.png` }
            },
            restitution : 0.4,
        });

        //현재 과일값 저장
        currentBody = body;
        currentFruit = fruits;

        //월드에 배치
        World.add(world, body);
}

// 키보드 입력 받기
window.onkeydown = (event) => {
    
    if(disableAction)
        return;

    switch(event.code) {
        case "KeyA":
            Body.setPosition(currentBody, {
                x: currentBody.position.x - 10,
                y: currentBody.position.y
            })
            break;
        case "KeyD":
            Body.setPosition(currentBody, {
                x: currentBody.position.x + 10,
                y: currentBody.position.y
            })
            break;
        case "KeyS":
            currentBody.isSleeping = false
            //addFruit();
            disableAction = true;
            //지연시키는 함수
            setTimeout(() => {
                addFruit();
                disableAction = false;
            }, 1000);
            break;
    }
}

//함수 호출
addFruit();