// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
let Util = require('util')
let Score = require('score')

cc.Class({
    extends: cc.Component,

    properties: {
        tipLine: {
            type: cc.Node,
            default: null
        },
        tipText: {
            type: cc.Label,
            default: null
        },
        // todo， 因该有更合适的处理方式
        brownPigPrefab: {
            type: cc.Prefab,
            default: null
        },
        pinkPigPrefab: {
            type: cc.Prefab,
            default: null
        },
        yellowPigPrefab: {
            type: cc.Prefab,
            default: null
        },

        pigLayer: {
            type: cc.Node,
            default: null
        },
        pigGroup: [],
        score: 0,
        level: 1,
        scoreLabel: {
            type: cc.Label,
            default: null
        }
    },

    getPigPrefab() {
        let prefabs = ["brownPigPrefab", "pinkPigPrefab", "yellowPigPrefab"];
        let prefabIndex = Math.floor(cc.random0To1() * prefabs.length);
        let prefab = prefabs[prefabIndex];

        return this[prefab];
    },
    createPig() {
        let prefab = this.getPigPrefab();
        let pig = cc.instantiate(prefab);
        this.pigLayer.addChild(pig);

        let randomPosition = this.getNewPigPosition(prefab);

        pig.setPosition(randomPosition);
        pig.getComponent("pig").init(this);

        this.pigGroup.push(pig);
    },

    getNewPigPosition(prefab) {
        let worldWidth = this.node.width / 2,
            leafWidth = prefab.data.width;

        let randX = Util.randomMinus1to1() * (worldWidth - leafWidth / 2);
        let randY = 320;

        return cc.p(randX, randY);
    },

    startGame() {
        this.tipText.destroy();
        this.createPig();
    },
    gameOver() {
        Score.addScore(this.score);

        cc.director.loadScene("Over");
    },

    getLevelScore(level) {
        let scoreLevel = [3, 10, 25, 40, 60, 80, 100];
        let index = Math.min(level, scoreLevel.length);
        return scoreLevel[index - 1];
    },
    // 增加分数
    addScore(num) {
        this.score += num;
        this.scoreLabel.string = `${this.score}`;

        // 达到指定分数增加难度
        let isShouldAddLevel = this.score > this.getLevelScore(this.level);
        if (isShouldAddLevel) {
            this.addLevel();
        }
    },
    setTipLineY(){
        let tipLineY = this.tipLine.y
        if (tipLineY > -240) {
            tipLineY -= 40
            this.tipLine.setPosition(cc.p(0, tipLineY));
        }
    },
    // 增加难度
    addLevel(score) {
        this.level++;
        this.setTipLineY()
        this.createPig();
    },

    start() {
        cc.director.setClearColor(new cc.Color(142, 199, 223));

        this.scheduleOnce(function() {
            this.startGame();
        }, 2);
    }

    // update (dt) {},
});
