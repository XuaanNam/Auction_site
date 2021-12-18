module.export = function LimitTime () {
    const y = new Date(Date.now()).getFullYear();
    const m = new Date(Date.now()).getMonth();
    const d = new Date(Date.now()).getDate();
    const h = new Date(Date.now()).getHours();
    const mi = (new Date(Date.now()).getMinutes() + 1);
    const s = new Date(Date.now()).getSeconds();
    const date = new Date(y, m, d, h, mi, s);
    return date
}