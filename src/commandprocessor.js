module.exports = function Processor() {
    this.repo = null;

    this.Process = function (msg) {
        console.log(msg);
    }
}
