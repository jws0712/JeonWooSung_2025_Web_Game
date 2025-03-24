//모듈 불러오기

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Boides = Matter.Bodies,
    World = Matter.World;

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
render : {fillStyle: '#7D1A1F'}
})

// 생성한 벽을 월드에 배치
World.add(world, [leftWall, rightWall, ground, topLine]);

// 실행
Render.run(render);
Runner.run(engine);