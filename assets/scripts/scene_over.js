// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let Score = require("score");

cc.Class({
    extends: cc.Component,

    properties: {
       curScoreLabel: {
           type: cc.Label,
           default: null,
       },
       bestScoreLabel: {
           type: cc.Label,
           default: null
       },
        btnReplay: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    setScore(){
        let score = Score.getLastScore();
        let bestSCore = Score.getBestScore();

        this.curScoreLabel.string = `${score}`;
        this.bestScoreLabel.string = `${bestSCore}`;
    },

    start () {
        cc.director.setClearColor(new cc.Color(142, 199, 223));
        this.setScore()

        this.btnReplay.on(cc.Node.EventType.TOUCH_START, function (e) {
            cc.director.loadScene('Game')
        })
    },

    // update (dt) {},
});
