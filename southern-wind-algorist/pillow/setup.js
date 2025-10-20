let turtle_tree

function setup() {

    frameRate(15)
    textFont(CommonPillowTree)
    canvas_scale = 4
    w = 180 * canvas_scale //width
    h = 180 * canvas_scale //height
    grid_size = 20
    rows = h / grid_size
    cols = w / grid_size

    hidden_texts = []

    letters_seq = []
    drawTree = false
    turtle_tree = createGraphics(w, h)

    seeds = []

    fall = createGraphics(w, h);
    resetTears()



    grid = []
    for (let i = 0; i < rows; i++) {
        grid.push([])
        for (let j = 0; j < cols; j++) {
            grid[i].push(0)
        }
    }

    tomb_grid = new Array(rows).fill(0).map(()=> new Array(cols).fill(0))
    initTomb()

    name_color = ""
    name_color_index = 0
    setInterval(function () {
        name_color = nextNameColor()
    }, 500)

    found1 = false
    found2 = false

    root_x = 18
    root_y = 28
    name_x = 15
    name_y = 30

    p1_x = -1
    p1_y = -1

    p2_x = -1
    p2_y = -1

    cnv = createCanvas(w, h);
    cnv.mousePressed(playOscillator);
    canvas = document.getElementById('canvas');
    cnv.parent(canvas)

    lines = ["Wenzi was youthful and good-looking.",
        "His contemporaries competed to admire him.",
        "Zhongxian heard about Wenzi's beauty and begged Wenzi to be his friend.",
        "Wenzi agreed because they were classmates.",
        "They fell in love with each other at the first sight.",
        "The emotional bond between them was so strong.",
        "They lived like a couple.",
        "Every night, they shared a quilt and a pillow.",
        "Their passions for each other were unbounded.",
        "However, later, they died young together on the same day.",
        "Their families were sad and buried them in Luofu Mountain.",
        "Suddenly, a tree grew on top of their shared tomb.",
        "The leaves, branches, and twigs of the tree hug each other.",
        "Their contemporaries were amazed by the tree.",
        "They named it common pillow tree.",
    ]

    nextLine()


    let names = [
        ["Mizi", "彌子瑕", "Ling", "卫灵公"],
        ["Dong Xian", "董贤", "Emperor Ai of Han", "汉哀帝"],
        ["Lord Longyang", "龙阳君", "king of Wei", "魏王"],
        ["Lord Anling", "安陵君", "King Xuan of Chu", "楚王"],
        ["a lowly official", "低官", "Duke Jing of Qi", "齊景公"],
        ["Chen Weisong", "陈维崧", "Xu Ziyun", "徐紫云"],
        ["PanZhang", "WangZhongxian"]
    ]

    let phrases = [
        ["YuTao", "余桃"],
        ["DuanXiu", "断袖"],
        ["MaleColor", "男色"],
        ["NanFeng", "男风"],
        ["LongYang", "龙阳"],
        ["HouTingHua", "后庭花"],
        ["百世修來同船渡，千世修來共枕眠"]
    ]

    let books = [
        ["Dream of the Red Chamber", "红楼梦"],
        ["The Golden Lotus", "金瓶梅"],
        ["Pleasant Spring and Fragrant Character", "宜春香质"],
        ["Hairpins Beneath His Cap", "弁而钗"],
        ["Long Yang Yi Shi", "龙阳逸史"],
        ["Ranking Flowers", "品花宝鉴"],
        ["The Shadow Book of Ji Yun", "阅微草堂笔记"],
        ["Strange Tales from a Chinese Studio", "聊斋志异"],
        ["Classic of Odes (Shi jing)", "诗经"],
        ["ShiDianTou", "石点头"]
    ]

    textAlign(CENTER, CENTER)
    rectMode(CENTER)

    wave = new p5.Oscillator();
    wave.setType('sine');
    wave.amp(0.02);

    // L-System
    current_rule = null

    // evolution
    generations = []
    nextGeneration()

    // tc sound lib
    tcSoundLib()
}