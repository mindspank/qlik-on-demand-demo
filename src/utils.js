function utils() {};


utils.generateGuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

utils.config = {
        host: 'branch.qlik.com',
        isSecure: true,
        prefix: 'anon',
        identity: utils.generateGuid()
};

utils.loadscript = function() {
    return [
        "Characters:",
        "Load Chr(RecNo()+Ord('A')-1) as Alpha, RecNo() as Num autogenerate 26;",
        "ASCII:",
        "Load" ,
        " if(RecNo()>=65 and RecNo()<=90,RecNo()-64) as Num,",
        " Chr(RecNo()) as AsciiAlpha,",
        " RecNo() as AsciiNum",
        "autogenerate 255",
        " Where (RecNo()>=32 and RecNo()<=126) or RecNo()>=160 ;",
        "Transactions:",
        "Load",
        " TransLineID,", 
        " TransID,",
        " mod(TransID,26)+1 as Num,",
        " Pick(Ceil(3*Rand1),'A','B','C') as Dim1,",
        " Pick(Ceil(6*Rand1),'a','b','c','d','e','f') as Dim2,",
        " Pick(Ceil(3*Rand()),'X','Y','Z') as Dim3,",
        " Round(1000*Rand()*Rand()*Rand1) as Expression1,",
        " Round(  10*Rand()*Rand()*Rand1) as Expression2,",
        " Round(Rand()*Rand1,0.00001) as Expression3;",
        "Load ",
        " Rand() as Rand1,",
        " IterNo() as TransLineID,",
        " RecNo() as TransID",
        "Autogenerate 1000",
        " While Rand()<=0.5 or IterNo()=1;"
    ].join('\n');
};

module.exports = utils;