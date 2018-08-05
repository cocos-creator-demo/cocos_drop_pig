module.exports = {
    scoreRecord: [],
    addScore(score){
        this.scoreRecord.push(score);
    },
    getLastScore(){
        return this.scoreRecord[this.scoreRecord.length - 1] || 0
    },
    getBestScore(){
        return this.scoreRecord.length ? Math.max(...this.scoreRecord) : 0
    }
}