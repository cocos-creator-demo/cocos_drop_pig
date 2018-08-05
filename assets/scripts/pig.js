// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        vx: 0,
        vy: 10,
        jumpDuration: 3, // 跳跃的时间
        jumpHeight: 600, // 跳跃的高度

        game: null,
        score: 1,
        isJump: false,
        canTouch: false // 是否可以点击
    },

    // LIFE-CYCLE CALLBACKS:

    init(game) {
        this.game = game;
        this.setGameControll();
        this.setRotateAction();
    },

    setRotateAction() {
        let action = cc.repeatForever(cc.rotateBy(4, 360));
        this.node.runAction(action);
    },

    setGameControll() {
        this.node.on(
            cc.Node.EventType.TOUCH_START,
            function(event) {
                if (!this.canTouch) {
                    return;
                }

                this.kickBack();
            },
            this
        );
    },
    setTouchEnable() {
        let y = this.node.y;
        let tipLine = this.game.tipLine.y;

        this.canTouch = y < tipLine;
    },
    // 点击按钮回弹
    kickBack() {
        this.isJump = true;

        let action = this.getUpAction();
        this.node.runAction(action);

        let score = this.score;
        this.game.addScore(score);
    },

    getUpAction() {
        let { width, height } = cc.view.getFrameSize();
        let x = this.node.x;

        let distanceX = cc.random0To1() * 200 + 0

        if (distanceX > width / 2) {
            distanceX = width / 2 - 100;
        }

        if (x > 0) {
            distanceX = -distanceX;
        }

        this.vx = distanceX;


        let upAction = cc
            .moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight))
            .easing(cc.easeCubicActionOut());

        let finished = cc.callFunc(
            function(target, score) {
                this.isJump = false;
            },
            this,
            100
        );

        return cc.sequence(upAction, finished);
    },

    update(dt) {
        this.setTouchEnable();

        this.node.x += this.vx * dt

        if (this.isJump) {
            return;
        }
        this.node.y -= this.vy * dt;



        if (this.node.y <= -480) {
            this.game.gameOver();
        }
    }
});
