function combine(rule) {
    return `${rule.b1}[${rule.b2}]${rule.b3}[${rule.b4}]`
}

function randomRule() {
    new_rule = ["◕", "◕"]
    for (let i = 0; i < 15; i++) {
        new_rule.push(randomGene())
    }
    a = 2
    new_rule.splice(a, 0, "[")
    a += floor(random(3, 6))
    new_rule.splice(a, 0, "]")
    a += floor(random(3, 6))
    new_rule.splice(a, 0, "[")
    new_rule.splice(new_rule.length, 0, "]")
    return new_rule.join("")

}

function randomGene() {
    return random(["Z", "W","◕","◕"])
}

function randGeneSeq(){
    seq=""
    for(let i=0;i<9;i++){
        seq+=randomGene()
    }
    return seq
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}


function mutate(gene) {
    if (gene.length >= 1) {
        index = floor(random(gene.length))
        gene = setCharAt(gene, index, randomGene()) // switch
    }
    return gene
}



function either(p1, p2, loc) {
    return random([p1[loc], p2[loc]])
}

function breed(p1, p2) {
    p3 = {}
    p3.a = "◕"
    p3.b1 = p1.b1
    p3.b2 = mutate(either(p1, p2, "b2"))
    p3.b3 = p1.b3
    p3.b4 = mutate(either(p1, p2, "b4"))
    p3.b = combine(p3)
    return p3
}

function prevalenceScore(child) {
    score = 0
    for (let i = 0; i < generations.length; i++) {
        score += lcs(combine(generations[i]), combine(child))
    }
    return score
}

function uniqueChild(p1, p2) {
    min_child = [null, Number.MAX_SAFE_INTEGER]
    for (let i = 0; i < 10; i++) {
        child = breed(p1, p2)
        s = prevalenceScore(child)
        if (s < min_child[1]) {
            min_child = [child, s]
        }
    }
    generations.push(min_child[0])
    if(generations.length>1024) generations.shift()
    console.log(combine(min_child[0]),min_child[1])
    return min_child[0]
}

function nextGeneration() {

    if (generations.length == 0) {
        generation_count = 0
        wenzi = {
            a: "◕",
            b: "",
            b1: "◕◕W",
            b2: randGeneSeq(),
            b3: "Z",
            b4: randGeneSeq()
        }

        zhongxian = {
            a: "◕",
            b: "",
            b1: "◕◕W",
            b2: randGeneSeq(),
            b3: "Z",
            b4: randGeneSeq()
        }

        generations.push(wenzi)
        generations.push(zhongxian)
    }
    generation_count ++
    console.log(`Generation #${generation_count}`)

    l = generations.length
    p1 = generations[l - 2]
    p2 = generations[l - 1]


    child1 = uniqueChild(p1, p2)
    child2 = uniqueChild(p1, p2)

    current_rule = child1
    turtle_tree.clear()
    drawLSys(root_x * grid_size, root_y * grid_size)
}