const opers_first = ['*', '/']
const opers_second = ['+', '-']
const opers = [...opers_first, ...opers_second]

function operation(a, oper, b) {
    const plus = (a, b) => +a + +b
    const minus = (a, b) => +a - +b
    const multiply = (a, b) => +a * +b
    const divide = (a, b) => +a / +b
    switch (oper) {
        case '+':
            return plus(a, b)
        case '-':
            return minus(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            return divide(a, b)
        default:
            return NaN
    }

}

function cal2(str) {
    console.log(`input: ${str}`)
    let end = true
    for (let oper of opers_first) {
        if (str.includes(oper)) {
            end = false
        }
    }
    if (end) {
        return str
    }

    let left = ''
    let right = ''
    let oper = ''
    for (let sym of str) {
        if (!opers_first.includes(sym)) {
            if (!oper) {
                left += sym
            } else {
                right += sym
            }
        } else {
            if (!oper) {
                oper = sym
            } else {
                str = str.replace(`${left}${oper}${right}`, operation(left, oper, right))
                console.log(left + oper + right + ' = ' + operation(left, oper, right))
                console.log(`output: ${str}`)
                console.log(' ')

                return calc(str);
            }
        }
    }
    if (left && oper && right) {
        str = str.replace(`${left}${oper}${right}`, operation(left, oper, right))
        console.log(left + oper + right + ' = ' + operation(left, oper, right))
        console.log(`output: ${str}`)
        console.log(' ')
    }

    return str;
}

function hooks(str) {
    if (str.indexof('(') > -1) {
        let close = str.indexof(')')
        let _tmp = str.slice(0, close + 1)
        let open = str.lastindexof('(')
        return str.slice(open, close + 1)
    }
}

function getList(str) {
    let list = []
    let elem = ''
    for (let sym of str) {
        if (opers.includes(sym)) {
            list.push(elem)
            list.push(sym)
            elem = ''
        } else {
            elem += sym
        }
    }
    list.push(elem)
    return list
}

function calc(list) {
    let _list = [...list]
    function calcOrder(opers_list) {
        for (let oper of opers_list) {
            while (true) {
                const i = _list.indexOf(oper)
                if (i > -1) {
                    console.log(_list)
                    console.log(_list[i])
                    const answer = operation(_list[i - 1], _list[i], _list[i + 1])
                    _list = [..._list.slice(0, i - 1), answer, ..._list.slice(i + 2)]
                    console.log(_list)
                } else {
                    break
                }
            }
        }
    }
    calcOrder(opers_first)
    calcOrder(opers_second)
    return _list[0]
}

let disp = '1+1+1-1+1'
disp = getList(disp)
disp = calc(disp)
console.log(disp)