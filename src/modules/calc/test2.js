const disp = '5+(1+2)'

const open = disp.indexOf('(')
const close = disp.indexOf(')')
console.log(disp.slice(open, close+1))