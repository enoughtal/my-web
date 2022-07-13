class LineOfWin {
    constructor(line) {
        this.line = line
        this.type = '0'//空白是0，先手是1，后手是2
        this.value = LineOfWin.initialValue
    }

    static initialValue = 0
    static invalidValue = -1

    input(point, type) {
        const index = this.line.indexOf(point)
        if (index < 0) return

        if (this.value === LineOfWin.initialValue) {
            this.type = type
            this.value ++
            this.line.splice(index, 1)//把已走的位置去除
        }
        else if (this.value > LineOfWin.initialValue) {
            if (this.type !== type) {
                this.value = LineOfWin.invalidValue//这条线上有两种类型的子，这条线已不可能获胜
            }
            else {
                this.value ++
                this.line.splice(index, 1)
            }
        }
    }

    output() {
        if (this.value === LineOfWin.invalidValue) return

        const result = {
            [this.type]: {}
        }
        this.line.forEach(point => {
            result[this.type][point] = 10 ** this.value//一条线上没子是1，一个子是10，两个子是100
        })
        return result
    }
}

class Ai {
    constructor(level) {
        //attention shallow copy trap
        this.lines = Ai.winLines.map(line => new LineOfWin(line.slice()))
        this.noneType = '0'
        this.types = ['1', '2']
        this.prevType = '2'
        this.nextType = '1'
        this.restPoints = new Set(Ai.winLines.flat())
        this.level = level
    }

    static winLines = [
        ['00', '01', '02'],
        ['10', '11', '12'],
        ['20', '21', '22'],
        ['00', '10', '20'],
        ['01', '11', '21'],
        ['02', '12', '22'],
        ['00', '11', '22'],
        ['02', '11', '20'],
    ]

    input(point, type) {
        for (const line of this.lines) {
            line.input(point, type)
        }
        this.prevType = type
        this.nextType = type === '1' ? '2' : '1'
        this.restPoints.delete(point)
    }

    output() {
        const result = this.lines
            .map(line => line.output())
            .filter(result => result)
            //.log()
            .reduce((prev, cur) => {
                new MyObj(cur).entries()
                    .forEach(([type, points]) => {
                        new MyObj(points).entries()
                            .forEach(([point, value]) => {
                                if (prev[type]) {
                                    prev[type][point] = prev[type][point]
                                        ? prev[type][point] + value
                                        : value
                                }
                                else {
                                    prev[type] = { [point]: value }
                                }
                            })
                    })
                return prev
            }, new MyObj({}))//这里必须要加new MyObj({})作为初始值
            //.log()
            .entries()
            .reduce((prev, cur) => {
                const [type, points] = cur
                prev[type] = points
                if (prev[this.noneType]) {
                    this.types.forEach((type) => {
                        if (prev[type]) {
                            new MyObj(prev[this.noneType])
                                .entries()
                                .forEach(([point, value]) => {
                                    if (prev[type][point]) {
                                        prev[type][point] += value
                                    }
                                })
                        }
                    })
                }
                return prev
            }, new MyObj({}))
            //.log()
            .entries()
            .map(([type, points]) =>
                new MyObj(points).entries()
                    .map(([point, value]) => ({ [value]: { [type]: point } })))
            .flat()
            //.log()
            .reduce((prev, cur) => {
                new MyObj(cur).entries()
                    .forEach(([value, entry]) => {
                        new MyObj(entry).entries()
                            .forEach(([type, point]) => {
                                if (prev[value]) {
                                    prev[value][type] = prev[value][type]
                                        ? Array.isArray(prev[value][type])
                                            ? prev[value][type].concat(point)
                                            : [prev[value][type]]
                                        : [point]
                                }
                                else {
                                    prev[value] = { [type]: [point] }
                                }
                            })
                    })
                return prev
            }, new MyObj({}))
            //.log()
            .entries()
            .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
            //.log()

        const best = result[0]?.[1]//result[0]是分值最高的解，result可能为空数组
        const better = result[1]?.[1]//次高分值的解，用来给ai区分难易

        if (!best) {//如果没有可以获胜的解了，边界情况，已经是平局，但还有格子可走
            return this._randomChoseInArray(Array.from(this.restPoints))
        }

        //最优解的点的集合
        const bestPoints = Object.values(best)[0]//使用[0]是因为*确定*只有一个元素

        if (this.level === 'easy') {//简单的ai会把better混进去
            if (this._random(10) === 0) {//10中1
                const bad = this._randomChoseInArray(Object.values(better || {}).flat())
                if (bad) {
                    bestPoints.push(bad)//混入非最优解
                }
            }
        }

        return this._randomChoseInArray(bestPoints)
    }

    _randomChoseInArray(arr) {//如果有多个解，在其中随机选择一个
        return arr[this._random(arr.length)]
    }

    _random(range) {
        return Math.floor(Math.random() * 10 * range) % range
    }
}

//这个类为了避免Object.entries(obj)破坏链式调用
class MyObj extends Object {
    constructor(obj) {
        super(obj)
        Object.entries(obj).forEach(([key, val]) => {
            this[key] = val
        })
    }

    entries() {//链式调用entries
        return Object.entries(this)
    }
}

//调试用
//Object.prototype.log = function () {
//    console.log(this)
//    return this
//}
//Array.prototype.log = function () {
//    console.log(this)
//    return this
//}

export default Ai

//测试用
//const ai = new Ai()
//ai.input('11', '1')
//ai.input('00', '2')
//ai.input('21', '1')
//ai.input('01', '2')
//ai.input('02', '1')
//ai.input('20', '2')
//ai.input('10', '1')
//ai.input('12', '2')
//ai.input('22', '1')
//console.log(ai.output())