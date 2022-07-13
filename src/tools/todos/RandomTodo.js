export default class RandomTodo {
    constructor() {
        this.todoNumArr = []
        this.todoLoopObj = {}
    }
    static withWho = [
        '小明',
        '小红',
        '情人',
        '超人',
        '对手',
        '二狗子',
        '陌生人',
        '外星人',
    ]
    static atWhere = [
        '小区',
        '房顶',
        '沙滩',
        '白宫',
        '火星',
        '撒哈拉',
        '高尔夫球场',
        '亚马逊丛林',
    ]
    static doWhat = [
        '吃饭',
        '打架',
        '拥抱',
        '飞翔',
        '看日落',
        '写代码',
        '打乒乓球',
        '做爱做的事',
    ]
    genRandomNum(max) {
        return Math.floor(Math.random() * max * max) % max
    }
    genThreeRandom() {
        const num1 = this.genRandomNum(RandomTodo.withWho.length)
        const num2 = this.genRandomNum(RandomTodo.atWhere.length)
        const num3 = this.genRandomNum(RandomTodo.doWhat.length)
        return {
            num1,
            num2,
            num3,
            todoNum: '' + num1 + num2 + num3
        }
    }
    genTodoContent() {
        const { num1, num2, num3, todoNum } = this.genThreeRandom()
        if (this.todoNumArr.length < 5000) {//最大5000条，超过就返回空字符串
            if (!this.todoNumArr.includes(todoNum)) {
                this.todoNumArr.push(todoNum)
                this.todoLoopObj[todoNum] = 1
            }
            else {
                this.todoLoopObj[todoNum] += 1
            }
            const times = this.todoLoopObj[todoNum] - 1
                ? `第${this.todoLoopObj[todoNum]}次`
                : ''
            return `和${RandomTodo.withWho[num1]}在${RandomTodo.atWhere[num2]}${times}${RandomTodo.doWhat[num3]}*`
        }
        return ''
    }
    generate() {
        let content = this.genTodoContent()
        const rank = this.genRandomNum(3) + 1
        return {
            content,
            rank,
            fake: true//随机生成的有fake属性
        }
    }
}