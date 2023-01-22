import { useEffect } from 'react';
import { useState } from 'react'
import './Calc.scss'

const Calc = (props) => {
    const [disp, setDisplay] = useState('0');
    const [fz, setFontSize] = useState(40);

    function changeDisplay(key) {
        setDisplay(disp => {
            const opers = ['*', '/', '%', '+', '-']
            const last = disp.at(-1)

            if ((disp === 'NaN' || disp.indexOf('nfinity') > -1) && key !== 'AC') {
                return disp
            }

            if (opers.includes(key)) {
                if (opers.includes(last)) {
                    return disp
                } else {
                    if (disp === '0') {
                        if (key === '-') {
                            return key
                        }
                        return disp
                    }
                    return disp + key
                }
            }

            if (key === '.') {
                try {
                    const _ = `${eval(disp + key)}` !== 'NaN'
                    return disp + key
                } catch {
                    return disp
                }
            }

            switch (key) {
                case 'AC':
                    return '0'
                case '<':
                    if (disp.length === 1) {
                        return '0'
                    }
                    return `${disp.slice(0, disp.length - 1)}`
                case '=':
                    try {
                        return `${eval(disp)}`
                    } catch (error) {
                        return `NaN`
                    }
                default:
                    if (disp === '0') {
                        return key
                    }

                    return disp + key
            }
        })
    }

    useEffect(() => {
        setFontSize(fz => {
            if (disp.length < 12) {
                return 40
            } else if (disp.length < 21) {
                return 30
            } else if (disp.length < 24) {
                return 26
            } else if (disp.length < 26) {
                return 20
            } else if (disp.length < 32) {
                return 17
            } else if (disp.length < 39) {
                return 14
            } else {
                return 10
            }
        })
    }, [disp])

    const allowed_btns = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', '=', '*', '/', '(', ')', '.']
    useEffect(() => {
        window.addEventListener('keyup', (e) => {
            // console.dir(e)
            if (allowed_btns.includes(e.key)) {
                changeDisplay(e.key)
            } else if (e.code === 'Enter' || e.code === 'Space') {
                changeDisplay('=')
            } else if (e.code === 'Backspace') {
                changeDisplay('<')
            }else if (e.code === 'Escape' || e.code === 'KeyC') {
                changeDisplay('AC')
            }
        })
    }, [])

    const keyboard = [
        'AC', '(', ')', '/',
        '7', '8', '9', '*',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '.', '<', '='
    ]

    const orange = ['/', '*', '-', '+', '=']

    return (
        <div className="calc-wrapper">
            <div className="screen">
                <div className="screen_wrapper" style={{ fontSize: fz }} >{disp}</div>
            </div>
            <div className="grid-container">
                {
                    keyboard.map((key, i) => {
                        let classes = `grid-container-item item${i}`
                        if (i < 3) {
                            classes += ' ft'
                        } else if (orange.includes(key)) {
                            classes += ' lc'
                        }
                        return (
                            <div key={i} className={classes}
                                onClick={(e) => changeDisplay(e.target.innerText)}>
                                {key}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Calc;