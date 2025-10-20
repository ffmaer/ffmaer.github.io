function meet() {
    // meet in the middle
    if (name_x != -1 && name_y != -1) {
        letters = "w1,e1,n1,z1,i1,z2,h2,o2,n2,g2,x2,i2,a2,n2".split(",")
        seq = [
            [name_x + 0, name_y],
            [name_x + 1, name_y],
            [name_x + 2, name_y],
            [name_x + 3, name_y],
            [name_x + 4, name_y],
            [name_x + 0, name_y+2],
            [name_x + 1, name_y+2],
            [name_x + 2, name_y+2],
            [name_x + 3, name_y+2],
            [name_x + 4, name_y+2],
            [name_x + 0, name_y+3],
            [name_x + 1, name_y+3],
            [name_x + 2, name_y+3],
            [name_x + 3, name_y+3]
        ]
        let move = setInterval(function () {
                // console.log('move heartbeat')
                moved = false
                move: for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        c = grid[i][j]
                        index = letters.indexOf(c)
                        if (c != 0 && index != -1) {

                            final_x = seq[index][0]
                            final_y = seq[index][1]

                            current_x = j
                            current_y = i

                    
                            if (final_x == current_x && final_y == current_y) {
                                letters[index]+="-" // use - lock up the letter
                                grid[i][j]+="-" // there are two n2
                                continue
                            }


                            let new_i = i
                            let new_j = j

                            if (final_y < i) {
                                new_i = i - 1
                            } else if (final_y > i) {
                                new_i = i + 1
                            } else if (final_x < j) {
                                new_j = j - 1
                            } else if (final_x > j) {
                                new_j = j + 1
                            }
                            if (new_i != i || new_j != j) {
                                while (grid[new_i][new_j] != 0) {
                                    dice = floor(random(4))
                                    switch (dice) {
                                        case 0:
                                            new_i++
                                            new_i %= rows
                                            break
                                        case 1:
                                            new_i--
                                            new_i %= rows
                                            break
                                        case 2:
                                            new_j++
                                            new_j %= cols
                                            break
                                        case 3:
                                            new_j--
                                            new_j %= cols
                                            break
                                    }

                                }
                                if (grid[new_i][new_j] == 0) {
                                    grid[new_i][new_j] = grid[i][j]
                                    grid[i][j] = 0
                                    moved = true
                                    break move
                                }

                            }



                        }
                    }
                }

                if (!moved) {
                    clearInterval(move)
                }
            },
            20)
    }
}