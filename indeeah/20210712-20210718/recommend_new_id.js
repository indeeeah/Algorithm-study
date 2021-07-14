let checkRegularExpression = (answer)=>{
    let regularExpressiont = /^[a-z0-9-_]{2,16}$/;
    return regularExpressiont.test(answer);
}

let recommendNewId = async (id)=>{
    console.log('id : ', id);
    let answer = id;
    if(!checkRegularExpression(answer)){
        answer = answer.toLowerCase();
        console.log('answer 1 : ', answer);
    }
    console.log('answer : ', answer);
    return answer;
}
recommendNewId('...!@BaT#*..y.abcdefghijklm');