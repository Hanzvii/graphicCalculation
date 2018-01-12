//求两点之间的直线距离
const getDistance = function (p1, p2) {
    let result = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    return result;
}
//求p2点相对于p1点的旋转角度
const getRoate = function (p1, p2) {
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
    t = Math.trunc(t * 10) / 10;
    return t;
}
//以点p1,p2为中线点，r为半径的矩形四个点
const getPoint = function (p1, p2, r) {
    let offsetX = (p2.x - p1.x);
    let offsetY = (p2.y - p1.y);
    let k = offsetY / offsetX;  //斜率
    // console.log(offsetX, offsetY, k);
    let t = Math.atan(k) * 180 / Math.PI;//斜率对应的角度
  
    //修正象限
    // console.log(t);
    (offsetX >= 0 && offsetY >= 0) && (t = t); //0-90°
    (offsetX < 0 && offsetY >= 0) && (t = 180 + t); //90-180°
    (offsetX < 0 && offsetY < 0) && (t = 180 + t); //180-270°
    (offsetX >= 0 && offsetY < 0) && (t = 360 + t); //270-0°
    // console.log(t);
    t += 90; //求垂直直线的角度
    // console.log(t, 'd');
    //求直线 与(p1为圆心,r为半径的圆)的交点
    let p11 = {
      x: Math.trunc(p1.x + r * Math.cos(t * Math.PI / 180)),
      y: Math.trunc(p1.y + r * Math.sin(t * Math.PI / 180))
    }
    let p12 = {
      x: Math.trunc(p1.x + r * Math.cos((t + 180) * Math.PI / 180)),
      y: Math.trunc(p1.y + r * Math.sin((t + 180) * Math.PI / 180))
    }
  
    let p21 = {
      x: Math.trunc(p2.x + r * Math.cos(t * Math.PI / 180)),
      y: Math.trunc(p2.y + r * Math.sin(t * Math.PI / 180))
    }
    let p22 = {
      x: Math.trunc(p2.x + r * Math.cos((t + 180) * Math.PI / 180)),
      y: Math.trunc(p2.y + r * Math.sin((t + 180) * Math.PI / 180))
    }
    return { p11, p12, p21, p22 };
}
  //判断一个点是否在一条直线上
const iSInside = function (line, p) {
    let lengthLine = getDistance(line.p1, line.p2);
    let lengthP1 = getDistance(line.p1, p);
    let lengthP2 = getDistance(line.p2, p);
  
    let offset = (lengthP1 + lengthP2) - lengthLine;
  
    //距离计算有可能出现误差
    if (Math.abs(offset) < 1) {
      return true;
    }
    return false;
}
//获取点到线段的垂线与线段的交点；
const getIntersectionOfLineAndDot = function (line1, p) {

    let k1 = (line1.p2.y - line1.p1.y) / (line1.p2.x - line1.p1.x);
    if (Math.abs(k1) == Infinity) { k1 = Infinity }
    let b1 = line1.p1.y - k1 * line1.p1.x;
    let k2 = -1 / k1;
    let b2 = p.y - k2 * p.x;
    let x, y;
    // debugger;
    if (k1 == Infinity && k2 == Infinity) {
      if (line1.p1.x == p1.x) {
        //TODO 斜率位置都相等怎么办
      } else {
        x = line1.p1.x;
        y = k2 * x + b2;
      }
    } else if (k1 == Infinity) {
      x = line1.p1.x;
      y = k2 * x + b2;
    } else if (k2 == Infinity) {
      x = p.x;
      y = k1 * x + b1;
    } else {
      x = (b1 - b2) / (k2 - k1);
      y = k1 * x + b1;
    }
    return { x: Math.round(x), y: Math.round(y) };
}
//求两条直线的交点
const getIntersectionOfLineAndLine = function (line1, line2) {
    let k1 = (line1.p2.y - line1.p1.y) / (line1.p2.x - line1.p1.x);
    if (Math.abs(k1) == Infinity) { k1 = Infinity }
    let b1 = line1.p1.y - k1 * line1.p1.x;
  
    let k2 = (line2.p2.y - line2.p1.y) / (line2.p2.x - line2.p1.x);
    if (Math.abs(k2) == Infinity) { k2 = Infinity }
    let b2 = line2.p1.y - k2 * line2.p1.x;
    let x, y;
    
    if (k1 == 0 && k2 == 0) {
      //TODO 斜率位置都相等怎么办
      if (Math.abs(line1.p1.y - line2.p1.y) <500) {
        if (Math.abs(line1.p1.x - line2.p1.x) <= 200 || Math.abs(line1.p2.x - line2.p1.x) <= 200) {
          // debugger;
          return { x: line2.p1.x, y: line2.p1.y };
        } else if (Math.abs(line1.p1.x - line2.p2.x) <= 200 || Math.abs(line1.p2.x - line2.p2.x) <= 200) {
          // debugger;
          return { x: line2.p2.x, y: line2.p2.y };
        }
      }
      // debugger;
      return { x: null, y: null };
  
    } else {
      //其中一个斜率为0并不影响计算交点
    }
    // debugger;
    if (k1 == Infinity && k2 == Infinity) {
      //TODO 斜率位置都相等怎么办
      if (Math.abs(line1.p1.x == line2.p1.x)<500) {
        if (Math.abs(line1.p1.y - line2.p1.y) <= 200 || Math.abs(line1.p2.y - line2.p1.y) <= 200) {
          return { x: line2.p1.x, y: line2.p1.y };
        } else if (Math.abs(line1.p1.y - line2.p2.y) <= 200 || Math.abs(line1.p2.y - line2.p2.y) <= 200) {
          return { x: line2.p2.x, y: line2.p2.y };
        }
      }
      return { x: null, y: null };
  
    } else if (k1 == Infinity) {
      x = line1.p1.x;
      y = k2 * x + b2;
    } else if (k2 == Infinity) {
      x = line2.p1.x;
      y = k1 * x + b1;
    } else {
      x = (b1 - b2) / (k2 - k1);
      y = k1 * x + b1;
    }
    // TODO如何表示他们是重合并平行的？
    if (isNaN(x) || isNaN(y)) {
      // debugger;
    }
    return { x: Math.round(x), y: Math.round(y) };
}
  //求过圆心直线于圆的交点 circle(o,r)
const getIntersectionOfCirleAndLine = function (circle, line) {
    //y = kx +b
    let k = line.k;
    let b = line.b;
  
    //(x+c)^2 + (y+d)^2 = r^2
    let c = -circle.x;
    let d = -circle.y;
    let r = circle.r;
  
    //解二元一次方程
    let A = 1 + k * k;
    let B = 2 * c + 2 * k * (b + d);
    let C = c * c + (b + d) * (b + d) - r * r;
  
    let p1 = {};
    p1.x = (-B + Math.sqrt(B * B - 4 * A * C)) / 2 * A;
    p1.y = k * p1.x + b;
  
    let p2 = {};
    p2.x = (-B - Math.sqrt(B * B - 4 * A * C)) / 2 * A;
    p2.y = k * p2.y + b;
  
    return { p1, p2 }
}
//获点到直线的距离
const getDistanceOfDotToLine = function (dot, line) {
    let k1 = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
    let b1 = line.p1.y - k1 * line.p1.x;
    let k2 = - 1 / k1; // 垂直直线，斜率乘积为-1
    let b2 = dot.y - k2 * dot.x;
    let p = {}; //两条垂直直线的交点
    p.x = (b2 - b1) / (k1 - k2);
    p.y = k2 * p.x + b2;
  
    let distance = 0;
    let distanceP1 = getDistance(dot, line.p1);
    let distanceP2 = getDistance(dot, line.p2);
    if (iSInside(line, p) != 0) {
      //如果交点不在线内,则点到直线的距离为点到两个端点的最小值
      distance = Math.min(distanceP1, distanceP2)
    } else {
      //点到垂点的距离
      distance = getDistance(p, dot);
    }
    return distance;
}
  //获取一条直线上，距离起点一段距离的点
const getLineDistanceDot = function (start, end, distance) {
    let percent = distance/(getDistance(start,end));
    return {
      x: start.x + (end.x - start.x) * percent,
      y: start.y + (end.y - start.y) * percent,
    }
};
//根据一点，角度，距离，求另一点的坐标；
const getLineEndDot = function (start, angle, distance) {
    return {
      x: Math.round(start.x + Math.cos(angle * Math.PI / 180) * distance),
      y: Math.round(start.y + Math.sin(angle * Math.PI / 180) * distance)
    }
};
//获取一条线段的中点
const getMidOffline = function (line) {
    return {
      x: line.p1.x + (line.p2.x - line.p1.x) / 2,
      y: line.p1.y + (line.p2.y - line.p1.y) / 2
    }
}
//判断两点是否在一条直线的同一侧
const judgeTwoPointInLineIpsilateral  = function(p1,p2,line){
    let k = (line.p2.y - line.p1.y)/(line.p2.x - line.p1.x);
    if(Math.abs(k) == Infinity){
      if((p1.x - line.p1.x)*(p2.x - line.p1.x)>0){
        return true;
      }else{
        return false
      }
    }
    if(Math.abs(Math.trunc(k)) ==0){
      if((p1.y - line.p1.y)*(p2.y - line.p1.y)>0){
        return true;
      }else{
        return false;
      }
    }
    if((p1.y - line.p1.y - k*(p1.x - line.p1.x))*(p2.y - line.p1.y - k*(p2.x - line.p1.x))>0){
      return true;
    }else{
      return false;
    }
}
module.exports = {
    getDistance,
    getRoate,
    getPoint,
    iSInside,
    getIntersectionOfLineAndDot,
    getIntersectionOfLineAndLine,
    getIntersectionOfCirleAndLine,
    getDistanceOfDotToLine,
    getLineDistanceDot,
    getLineEndDot,
    getMidOffline,
    judgeTwoPointInLineIpsilateral
}