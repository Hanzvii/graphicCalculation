//保留两位小数
function fixTwo(num){
    return Number(num.toFixed(2));
}
var line = {
    //获取顶点p2相对于顶点p1旋转的角度;（水平向右为起始0点）
    lineRoate : function (p1, p2) {
        let offsetX = (p2.x - p1.x);
        let offsetY = (p2.y - p1.y);
        let k = offsetY / offsetX;  //斜率
        // console.log(offsetX, offsetY, k);
        let t = Math.atan(k) * 180 / Math.PI;//斜率对应的角度
        //修正象限
        (offsetX >= 0 && offsetY >= 0) && (t = t); //0-90°
        (offsetX < 0 && offsetY >= 0) && (t = 180 + t); //90-180°
        (offsetX < 0 && offsetY < 0) && (t = 180 + t); //180-270°
        (offsetX >= 0 && offsetY < 0) && (t = 360 + t); //270-0°
        t = fixTwo((t * 10) / 10);
        return t;
    },
    //求两点之间的直线距离
    lineDistance : function (p1, p2) {
        let result = fixTwo((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        return result;
    },
    //求点是否在线段上
    isInLine : function (line, p) {
        let lengthLine = this.lineDistance(line.p1, line.p2);
        let lengthP1 = this.lineDistance(line.p1, p);
        let lengthP2 = this.lineDistance(line.p2, p);
      
        let offset = (lengthP1 + lengthP2) - lengthLine;
      
        //距离计算有可能出现误差
        if (Math.abs(offset) < 1) {
          return true;
        }
        return false;
    },
    //点到线段的最短距离的交点
    verPotSeg : function(line,p){
        let boolean = this.isInLine(line,p);
        if(boolean){
            return p;
        }
        let verP = this.verPotLine(line,p);
        if(this.isInLine(line,verP)){
            return verP;
        }
        let distance1 = this.lineDistance(verP,line.p1);
        let distance2 = this.lineDistance(verP,line.p2);
        let obj = distance1>distance2?line.p2:line.p1;
        return obj;
    },
    //点到直线的最短距离的交点
    verPotLine : function(line,p){
        let k1 = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
        let x,y;
        if(Math.abs(k1) == Infinity){
            x = line.p1.x;
            y = p.y
        }else if(Math.abs(Math.round(k1)) == 0){
            x = p.x;
            y = line.p1.y;
        }else{
            let k2 = -1/k1;
            let c = p.y - k2*p.x;
            let b = line.p1.y - k1*line.p1.x;
            x = (c-b)*k1/(k1+1);
            y = k2*x + c;
        }
        return {
            x:fixTwo(x),
            y:fixTwo(y)
        }
    },
    //求两条直线的交点，平行返回null
    potLineToLine : function(line1,line2){
        let k1 = (line1.p2.y-line1.p1.y)/(line1.p2.x-line1.p1.x);
        let k2 = (line2.p2.y-line2.p1.y)/(line2.p2.x-line2.p1.x);
        if(k1 == k2){
            return null;
        }
        let x,y;
        if(Math.abs(k1) == Infinity){
            x = line1.p1.x;
            y = k2*x + line2.p1.y-k2*line2.p1.x;
        }else if(Math.abs(k2) == Infinity){
            x = line2.p1.x;
            y = k1*x + line1.p1.y-k1*line1.p1.x;
        }else{
            let b = line1.p1.y-k1*line1.p1.x;
            let c = line2.p1.y-k2*line2.p1.x;
            x = (c-b)/(k1-k2);
            y = k1*x+b;
        }
        
        return {x:fixTwo(x),y:fixTwo(y)};
    },
    //根据一点，角度，距离，求另一点的坐标；
    LineRotatePoint : function(start, angle, distance){
        return {
            x: fixTwo(start.x + Math.cos(angle * Math.PI / 180) * distance),
            y: fixTwo(start.y + Math.sin(angle * Math.PI / 180) * distance)

          }
    },
    midOfline : function(line){
        return {
            x: fixTwo(line.p1.x + (line.p2.x - line.p1.x) / 2),
            y: fixTwo(line.p1.y + (line.p2.y - line.p1.y) / 2)
          }
    }

};
module.exports = line;



