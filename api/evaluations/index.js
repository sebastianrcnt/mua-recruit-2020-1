var router = require('express').Router();
var database = reqlib('database.js')
var Application = require('../applications/model')
var shortid = require('shortid')


router.get('/', (req, res) => {
    console.log(req.query)
    var paramId = req.query.id;
    var paramEvaluator = req.query.evaluator;

    // no paramId or paramEvaluator
    if (!(paramId && paramEvaluator)) {
        res.status(400).send('ID, Evaluator 정보가 없습니다')
        return;
    }

    // 존재하지 않는 회원정보
    if (!Application.getById(paramId)) {
        res.status(404).send('평가대상자의 정보가 존재하지 않습니다')
        return;
    }

    var targetEvaluation = database.get('evaluations').find({id: paramId, evaluator: paramEvaluator}).value();

    if (!targetEvaluation) {
        res.status(204).send('평가대상자는 있으나 평가정보가 존재하지 않습니다');
        return;
    }
    
    res.send(targetEvaluation);
    return;
})

router.post('/', (req, res) => {
    console.log(req.body)
    var paramId = req.body.id;
    var paramEvaluator = req.body.evaluator;

    if (!(paramId && paramEvaluator)) {
        res.status(400).send('ID, Evaluator 정보가 없습니다')
        return;
    }

    if (!Application.getById(paramId)) {
        res.status(404).send('평가대상자의 정보가 존재하지 않습니다')
        return;
    }

    database.get('evaluations').remove({id: paramId, evaluator: paramEvaluator}).write(); // 기존의 것 있으면 제거
    database.get('evaluations').push(req.body).write();
    res.status(201).send('성공적으로 생성/저장되었습니다')
    return;
})

module.exports = router;

/*
평가하기(get)(id, evaluator) --> full object 가져오기
저장하기(post)(id, evaluator) --> 데이터 업데이트/작성하기
 */